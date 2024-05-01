"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;
let flashTime;
let strokeW;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
  flashTime = floor(random(2, 5));
  strokeW = floor(random(2, 5));
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  strokeWeight(strokeW);
  stroke(0,0,0);

  let colors = [
    'lightgreen',
    'black',
    'tan',
    'brown',
    'green',
  ];
  
  
  let hash = XXH.h32("tile:" + [i, j], worldSeed);
  for (let k = 0; k < colors.length; k++) {
    if (hash % colors.length == k) {
      fill(colors[k]);
    }
  }
  
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1 && second() % flashTime == 0 ) {
    fill('white')
  }
  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);


  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  //text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}

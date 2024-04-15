// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let seed = 256;

const grassColor = "#73750d";
const gravelColor = "#909090";
const railColor = "#999999";
const tieColor = "#604020";

class Track {
  constructor(x, gauge, tieFrequency, time) {
    this.x = x;
    this.gauge = gauge;
    this.tieFrequency = tieFrequency;
    this.time = time;
    this.build();
    
  }
  
  build() {
    rectMode(CENTER);
    let rail1X = this.x - this.gauge/2;
    let rail2X = this.x + this.gauge/2;
    let railWidth = this.gauge/5;
    
    let tieWidth = this.gauge + (railWidth * 3);
    let tieHeight = this.gauge/5;
    
    fill(railColor);
    rect(rail1X, height/2, railWidth, height);
    rect(rail2X, height/2, railWidth, height);
  
    fill(tieColor);
    for (let i = 0; i < this.tieFrequency; i++) {
      let y = this.time + (i * (height / this.tieFrequency));
      if (y > height + tieHeight) {
        y -= height + tieHeight;
      }
      
      rect(this.x, y, tieWidth, tieHeight);
 
    }

  }
    
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

$("#reimagine").click(function() {
  seed++;
});

// setup() function is called once when the program starts
function setup() {  
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}


// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);

  background(gravelColor);
  let time = ((millis()/100) % height);

  const trackNum = 2;
  let ties = random(10, 15);
  let tracks = [];
  for (let i = 1; i <= trackNum; i++) {
    let x = (i * width)/(trackNum + 1) + random(-5, 5);
    tracks.push(new Track(x, 50, ties, time));
  }
  
  fill(grassColor);
  beginShape();
  const xMin = 15*width/16;
  const xMax = 31*width/32;
  vertex(width, 0);
  
  
  const vertices = random(8, 12);
  
  for (let i = 0; i <= vertices; i++) {
    let y = (i * (height/vertices));
    let x = random(xMin, xMax);
    vertex(x, y);
  }
  vertex(width, height);
  endShape();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

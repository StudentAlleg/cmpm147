// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  $("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  $("#asciiBox").val(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid($("#asciiBox").val());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  numCols = $("#asciiBox").attr("rows") | 0;
  numRows = $("#asciiBox").attr("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  //$("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  $("#reimagine").on("click", reseed);
  $("#asciiBox").val(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed);
  reparseGrid();
  drawGrid(currentGrid);
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  for (let i = 0; i < floor(random(3, 5)); i++) {
    generateRectangle(grid, ".", floor(random(1, numCols - 1)), floor(random(1, numRows)), floor(random(1, 3)), floor(random(1, 3)));
  }

  for (let i = 0; i < floor(random(3, 5)); i++) {
    let size = random(2, 2);
    generateRectangle(grid, "+", floor(random(1, numCols - (size + 1))), floor(random(1, numRows - (size + 1))), size, size);
  }

  
  
  return grid;
}

function drawGrid(grid) {
  background(128);
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {

      if (gridCheck(grid, i, j, "+")) {
        x = floor(random(0, 4) + second()) % 4;
        placeTile(i, j, x, 3);
        /*for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            drawContext(grid, i + k, j + l, "+", 5, 4);
          }
        }*/
      }

      if (gridCheck(grid, i, j, "_")) {
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            drawContext(grid, i + k, j + l, "_", 5, 1);
          }
        }
        x = floor(random(0, 4) + second()) % 4;
        placeTile(i, j, x, 0);
      }
      
      
      if (gridCheck(grid, i, j, ".")) {
        placeTile(i, j, (floor(random(4))), 0);
        placeTile(i, j, 16 + floor(random(-1, 1)), 1 + floor(random(-1, 1)));
      }
        
    }
  }
}


function generateRectangle(grid, symbol, x, y, width, height) {
  for (let i = y; i < height + y; i++) {
    for (let j = x; j < width + x; j++) {
      grid[i][j] = symbol;
    }
  }
  return grid;
}

function gridCheck(grid, i, j, target) {
  if (i < 0 || i > numCols || j < 0 || j > numRows) {
    return false;
  }
  try {
    return grid[i][j] == target;
  } catch (Exception) {
    return false;
  }
}

function gridCode(grid, i, j, target) {
  let northBit = gridCheck(grid, i + 1, j, target);
  let eastBit = gridCheck(grid, i, j + 1, target);
  let southBit = gridCheck(grid, i - 1, j, target);
  let westBit = gridCheck(grid, i, j - 1, target);
  
  return (northBit << 3) + (eastBit << 2) + (southBit << 1) + (westBit << 0);
}

//NESW
const lookup = [
  [0, 0], //0000
  [-1, 0], //0001
  [0, 1], //0010
  [-1, -1], //0011
  [1, 0], //0100
  [0, 0], //0101
  [1, -1], //0110
  [0, 0], //0111
  [0, 1], //1000
  [-1, 1], //1001
  [0, 0], //1010
  [0, 0], //1011
  [1, 1], //1100
  [0, 0], //1101
  [0, 0], //1110
  [0, 0]  //1111
];
console.log(lookup);

function drawContext(grid, i, j, target, ti, tj) {
  //todo
  let code = gridCode(grid, i, j, target);
  const offset = lookup[code];
  placeTile(i, j, ti + offset[0], tj + offset[1]);
}


// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}
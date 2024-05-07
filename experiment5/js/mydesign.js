/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
  return [
    {
      name: "balloons black and white", 
      assetUrl: "../img/balloonsbw.jpg",
      credit: "https://blog.ymtvacations.com/hubfs/Blog_Images/Hot_Air_balloon.jpg#keepProtocol",
      backgroundGradient: false,
      numShapes: 40,
    },
    {
      name: "balloons", 
      assetUrl: "../img/Hot_Air_balloon.jpg",
      credit: "https://blog.ymtvacations.com/hubfs/Blog_Images/Hot_Air_balloon.jpg#keepProtocol",
      backgroundGradient: false,
      numShapes: 60,
    },
    {
      name: "vase black and white", 
      assetUrl: "../img/vasebw.png",
      credit: "https://ii1.pepperfry.com/media/catalog/product/w/h/1100x1210/white-ceramic-round-glazed-decorative-vase---set-of-2-by-aapno-rajasthan-white-ceramic-round-glazed--qvtpag.jpg",
      backgroundGradient: false,
      numShapes: 60,
    },
    {
      name: "vase", 
      assetUrl: "../img/vase.png",
      credit: "https://ii1.pepperfry.com/media/catalog/product/w/h/1100x1210/white-ceramic-round-glazed-decorative-vase---set-of-2-by-aapno-rajasthan-white-ceramic-round-glazed--qvtpag.jpg",
      backgroundGradient: false,
      numShapes: 60,
    },
    {
      name: "waves black and white", 
      assetUrl: "../img/wavesbw.png",
      credit: "https://goodstock.photos/wp-content/uploads/deep-blue-ocean-waves.jpg",
      backgroundGradient: false,
      numShapes: 40,
    },
    {
      name: "waves", 
      assetUrl: "../img/deep-blue-ocean-waves.jpg",
      credit: "https://goodstock.photos/wp-content/uploads/deep-blue-ocean-waves.jpg",
      backgroundGradient: false,
      numShapes: 60,
    },
  ];
}

function initDesign(inspiration) {
  let design = {
    background: 0,
    backgroundGradient: inspiration.backgroundGradient,
    foreground: [],
    ellipseNum: inspiration.numShapes,
  }
  
  for (let i = 0; i < design.ellipseNum; i++) {
    
    design.foreground.push({x: random(width),
                            y: random(height),
                            w: random(width/2),
                            h: random(height/2),
                            fill: random(255)});
  }
  
  
  
  return design;
}

function renderDesign(design, inspiration) {
  background(design.background);
  noStroke();
  for (let circle of design.foreground) {
    fill(circle.fill, 128);
    ellipse(circle.x, circle.y, circle.w, circle.h);
  }
}

function mutateDesign(design, inspiration, rate) {
  design.background = mut(design.background, 0, 255, rate);
  for (let circle of design.foreground) {
    circle.fill = mut(circle.fill, 0, 255, rate);
    circle.x = mut(circle.x, 0, width, rate);
    circle.y = mut(circle.y, 0, height, rate);
    circle.w = mut(circle.w, 0, width/2, rate);
    circle.h = mut(circle.h, 0, height/2, rate);
  }
}

function mut(num, min, max, rate) {
  return constrain(randomGaussian(num, (rate * (max - min)) / 15), min, max);
}

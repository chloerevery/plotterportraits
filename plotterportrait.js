let img;
let lowestValue = 300;
let highestValue = 0;
let xs = [];
let ys = [];
let vectors = [];

function preload() {
  img = loadImage("evan.png");
}

function setup() {
  pixelDensity(1);
  img.filter(GRAY);
  img.loadPixels();
  createCanvas(img.width, img.width);
  image(img, 0, 0, img.width, img.height);
  // try to get a sense of the image's average brightness by
  // iterating through all pixels, sav the ones with the lowest and highest brightness
  for (let x = 0; x < img.width; x += 1) {
    for (let y = 0; y < img.height; y += 1) {
      let i = (x + y * img.width) * 4;
      let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]);
      let value = brightness(c);
      if (value > highestValue) {
        highestValue = value;
      }
      if (value < lowestValue) {
        lowestValue = value;
      }
    }
  }
  
  for (let x = 0; x < img.width; x += 1) {
    for (let y = 0; y < img.height; y += 1) {
      i = (x + y * img.width) * 4;
      c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]);
      value = brightness(c);
       //darker the pixel is, the more chance it has of being removed
      if (random(lowestValue, highestValue) * .55 < value) {
        // remove pixel
        img.pixels[i + 3] = 0;
        img.updatePixels();
      } else {
        // keep pixel
        append(vectors, createVector(x, y));
      }
    }
  }
  
}

//function draw() {
//  stroke(0);
//  let closest = 0;
//  let currPtIndex = 0;
//  let closestPtIndex = 0;
//  let curDist = img.width;
//  let increment = 0;

//  while(increment < vectors.length){
//    // find the x,y pt closest to the given x,y pt
//    closest = img.width;
//    for (let p = 1; p < vectors.length; p += 1) {
//      curDist=dist(vectors[currPtIndex].x, vectors[currPtIndex].y, vectors[p].x, vectors[p].y);
//      // delete the data at currPtIndex
//      if(curDist < closest && curDist != 0){
//          closest = curDist;
//          closestPtIndex = p;
//      }
//    }
//    // draw a line between x,y pt and closest pt to it
//    line(vectors[currPtIndex].x, vectors[currPtIndex].y, vectors[closestPtIndex].x, vectors[closestPtIndex].y); // draws a line between 
//    vectors.splice(currPtIndex, 1);
//    currPtIndex = closestPtIndex;
    
//    increment = increment + 1;
//  }
//}

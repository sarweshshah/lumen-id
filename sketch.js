/*
// Project Title: Lumen ID
// Author: Sarwesh Shah, ValueLabs
// Made with Love in Hyderabad

// TODO:
// - Support Long Names
// - Add p5.js control board
// - Resize ID card and skeleton image
*/

let table, vllogo, dilogo;
let poppins_bold, poppins_reg, poppins_med, poppins_semb;
let iArray = [];
let counter = 0;

// Size of the Lumen ID Card and Skeleton Image
// let outWidth = 900, outHeight = outWidth * 6.5 / 5;

// Size of the Lumen Tile
// let outWidth = 900, outHeight = outWidth * 6 / 5;

// Size of the Zoom Banner
// let outWidth = 1080, outHeight = outWidth * 9/16;

// Size of the Clear Lumens
let outWidth = 900, outHeight = outWidth;

function preload() {
  // Load the csv file before beginning
  table = loadTable('data/form.csv', 'csv', 'header', () => {
    print("CSV file Loaded!")
  });

  // Preloading ValueLabs and DI Conference logos
  vllogo = loadImage('img/vllogo.png');
  dilogo = loadImage('img/dilogo.png');

  // Preloading Poppins font
  poppins_bold = loadFont('fonts/Poppins-Bold.ttf');
  poppins_reg = loadFont('fonts/Poppins-Regular.ttf');
  poppins_med = loadFont('fonts/Poppins-Medium.ttf');
  poppins_semb = loadFont('fonts/Poppins-SemiBold.ttf');
}

function setup() {
  createCanvas(outWidth, outHeight);
  frameRate(3);

  // 1. Get a row from CSV file
  // 2. Parse it into an Indentity object
  // 3. Add to indentity array
  for (let r = 0; r < table.getRowCount(); r++) {
    let aRow = table.getRow(r);
    iArray.push(new Lumen(aRow.obj));
  }
  updateDiag();
}

function draw() {
  updateDiag();

  // Save all id cards as images
  // save(
  //   // 'shape_' +
  //   iArray[counter % table.getRowCount()].person.id + '.png'
  // );
  // counter++;
  // if (counter == table.getRowCount()) noLoop();
}

function keyPressed() {
  if (key == 'p') {
    save(iArray[counter % table.getRowCount()].person.id + '.png');
  }

  // Cycle through image on keypress
  if (keyCode === UP_ARROW || keyCode === RIGHT_ARROW) {
    counter++;
    updateDiag();
  } else if (keyCode === DOWN_ARROW || keyCode === LEFT_ARROW) {
    if (counter != 0) {
      counter--;
      updateDiag();
    } else {
      counter = table.getRowCount();
    }
  }

  // Print person info in dev console. Uncomment for debugging
  console.log(iArray[counter % table.getRowCount()].person);
}

function updateDiag() {
  let obj = iArray[counter % table.getRowCount()];

  // obj.renderZoomBg();
  // obj.renderLumenIDCard();
  // obj.renderSkeletonImage();
  obj.renderClearLumens();
  // obj.renderLumenTiles();
}
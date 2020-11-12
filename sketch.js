/*
// Project Title: Lumen ID
// Author: Sarwesh Shah, ValueLabs
// Made with Love in Hyderabad

// TODO:
// - Support Long Names
// - Render Zoom background
// - Render skeleton diagram
// - Scale shape based on characters in name
// - Add p5.js control board
*/

let table, vllogo, dilogo;
let poppins_bold, poppins_reg, poppins_med, poppins_semb;
let iArray = [];
let counter = 30;

// Size of the Lumen ID Card
let outWidth = 900, outHeight = outWidth * 6.5/5;
// let outWidth = 900, outHeight = outWidth * 5.5/5;

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
  iArray[counter % table.getRowCount()].renderSkeletonImage();
  // iArray[counter % table.getRowCount()].renderDebugUserDetails();
}

function keyPressed() {
  if (key == 's') {
    save(iArray[counter % table.getRowCount()].person.name + '.png');
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
  
  // obj.renderLumenIDCard();
  // obj.renderSkeletonImage();
  // obj.renderClearLumens();
  // obj.renderDebugUserDetails();
  // obj.renderLumenZoomBanner();
}
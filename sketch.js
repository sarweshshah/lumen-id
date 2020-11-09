// Project Title: Lumen ID
// Author: Sarwesh Shah, ValueLabs
// Made with Love in Hyderabad

// TODO: 
// 1. Support Long Names
// 2. Shift Shape based on Centroid
// 3. Add Documentation comment
// 4. Scale shape based on characters in name


let table, vllogo, dilogo, poppins_bold;
let iArray = [];
let counter = 30;

// Size of the Lumen ID Card
let outWidth = 900, outHeight = outWidth * 6.5/5;

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

function keyPressed() {
  if (key == 's') {
    save();
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
  clear();
  background(10);

  let obj = iArray[counter % table.getRowCount()];
  obj.renderLumenIDCard();
  // obj.renderDebugUserDetails();
  // obj.renderLumenZoomBanner();
}
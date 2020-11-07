let table, vllogo, dilogo, poppins;
let iArray = [];
let counter = 0;
let outWidth = 900, outHeight = outWidth * 6.5/5;

function preload() {
  // Load the csv file before beginning
  table = loadTable('data/form.csv', 'csv', 'header', () => {
    print("CSV file Loaded!")
  });

  vllogo = loadImage('img/vllogo.png');
  dilogo = loadImage('img/dilogo.png');

  poppins = loadFont('fonts/Poppins-Bold.ttf');
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
  if (keyCode === UP_ARROW) {
    counter++;
    updateDiag();
  } else if (keyCode === DOWN_ARROW) {
    if (counter != 0) {
      counter--;
      updateDiag();
    } else {
      counter = table.getRowCount();
    }
  }
  console.log(iArray[counter % table.getRowCount()].person);
}

function updateDiag() {
  clear();
  background(10);

  let obj = iArray[counter % table.getRowCount()];
  obj.renderAll();
}
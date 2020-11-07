class Lumen {
  constructor(_person, _x = width / 2, _y = height / 2 - height / 8) {
    this.person = _person;
    this.config = {
      minR: 250,
      maxR: 400
    }

    this.util = new Utility();
    this.pos = createVector(_x, _y);
    this.centroid = createVector(0, 0);
    this.lumenArray = [];

    let nm = this.person.name;
    let letters = nm.trim().replaceAll(" ", "").replaceAll(".", "").toUpperCase().split("");
    let nums = this.util.letterToNum(letters);

    for (let i = 0; i < nums.length; i++) {
      let off = constrain(
        map(nums[i], 26, 1, this.config.maxR, this.config.minR),
        0, max(width, height));

      this.lumenArray.push(createVector(
        off * cos(-HALF_PI + TAU / nums.length * i),
        off * sin(-HALF_PI + TAU / nums.length * i))
      );
    }

    this.calculateCentroid();
  }

  calculateCentroid() {
    for (let lumen of this.lumenArray) {
      this.centroid.add(lumen);
    }
    this.centroid.div(this.lumenArray.length);
    // this.centroid.add(width / 2, height / 2);
  }

  renderLumen(_x, _y) {
    let divs = this.lumenArray.length;
    strokeCap(ROUND);
    noFill();
    curveTightness(map(this.lumenArray.length, 5, 20, -2, -1));
    // curveTightness(1);

    for (let j = 0; j < 20; j++) {
      strokeWeight(3.5);
      stroke(240, 200, 45, 255 - 15 * j);

      // 218, 186, 96

      push();
      beginShape();
      for (let lumenPt of this.lumenArray) {
        let r = dist(0, 0, lumenPt.x, lumenPt.y) - 10 * j;
        let ang = lumenPt.heading();
        let pt = createVector(r * cos(ang), r * sin(ang))
        curveVertex(_x + pt.x, _y + pt.y);
      }
      endShape(CLOSE);
      pop();
    }
  }

  renderPointers() {
    strokeWeight(6);

    stroke(237, 191, 34);
    point(width / 2, height / 2);

    stroke(5);
    point(this.centroid.x, this.centroid.y);
  }

  renderBrandImages() {
    imageMode(CENTER);
    image(dilogo, this.pos.x, this.pos.y, min(width, height) / 10, min(width, height) / 10);

    imageMode(CORNER);
    let aspr = vllogo.width / vllogo.height;
    image(vllogo, width - 3 * width / 25, height / 30 * width / height, 15 * aspr, 15)
  }

  renderPersonInfo() {
    textFont(poppins);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(218, 186, 96);

    let voff = 40;

    // ATTENDEE NAME
    textSize(width / 18);
    text(this.person.name.toUpperCase(),
      width / 2, height - 7 * height / 25 + voff);

    // ATTENDEE / SPEAKER / VOLUNTEER BANNER
    rectMode(CENTER);
    rect(width / 2, height - 2.5 * height / 25 + voff, width, height / 13);

    fill(2);
    textSize(width / 35)
    text('ATTENDEE - DESIGN INSPIRE CONFERENCE 2020',
      width / 2, height - 2.55 * height / 25 + voff);

    // ATTENDEE PROFESSION
    fill(218, 186, 96);
    text(this.person.profession.toUpperCase(),
      width / 2, height - 4.75 * height / 25 + voff);

    // SEPARATOR
    stroke(218, 186, 96);
    strokeWeight(3);
    line(
      width / 2 - 30, height - 5.65 * height / 25 + voff,
      width / 2 + 30, height - 5.65 * height / 25 + voff
    );
  }

  renderAll() {
    push();
    translate(-this.centroid.x, -this.centroid.y);
    this.renderLumen(this.pos.x, this.pos.y);
    pop();

    this.renderBrandImages();
    this.renderPersonInfo();
    // this.renderPointers();
  }
}

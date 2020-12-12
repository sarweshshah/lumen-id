class Lumen {
  constructor(_person) {
    this.person = _person;

    // Configuration for rendering Lumen shape.
    this.config = {
      // Min and max radius for Lumen shape
      minR: 250,
      maxR: 400
    }

    this.util = new Utility();

    // Anchor point for shape from where lumen pts will be calculated
    this.anchorPt = createVector(width / 2, height / 2 - height / 8);
    // this.anchorPt = createVector(width / 2, height / 2);

    // Position vector for the centroid of the shape created
    this.centroid = createVector(0, 0);

    // Array of lumen pts for this person
    this.lumenArray = [];
    this.letterArray = [];

    // Whitespaces and special character from name is removed and make CAPs
    this.letterArray = this.person.name.trim().split(" ").join("").split(".").join("").toUpperCase().split("");

    // Array of ASCII values for respective characters
    let nums = this.util.letterToNum(this.letterArray);

    for (let i = 0; i < nums.length; i++) {
      // Alphabet position is mapped with distance of lumen pt from its anchor point
      // Angles are marked equally around the circle with numbers of letter in the name
      let reach = constrain(
        map(nums[i], 26, 1, this.config.maxR, this.config.minR),
        0, max(width, height));

      this.lumenArray.push(createVector(
        reach * cos(-HALF_PI + TAU / nums.length * i),
        reach * sin(-HALF_PI + TAU / nums.length * i))
      );
    }

    this.calculateCentroid();
  }

  calculateCentroid() {
    for (let lumen of this.lumenArray) {
      this.centroid.add(lumen);
    }
    this.centroid.div(this.lumenArray.length);
  }

  renderLumen(_x, _y, _zoom = 1, _steps_size = 10) {
    let divs = this.lumenArray.length;
    strokeCap(ROUND);
    noFill();

    // Curve tightness is mapped with length of the name
    curveTightness(map(this.lumenArray.length, 5, 20, -2, -1));
    // curveTightness(1);

    for (let j = 0; j < 40; j++) {
      strokeWeight(3.5);
      stroke(240, 200, 45, 255 - 15 * j);
      // 218, 186, 96

      push();
      beginShape();

      for (let i = 0; i < this.lumenArray.length; i++) {
        const lumenPt = this.lumenArray[i];
        let r = dist(0, 0, lumenPt.x, lumenPt.y) - _steps_size * j;
        r *= _zoom;

        let ang = lumenPt.heading();
        let pt = createVector(r * cos(ang), r * sin(ang))
        curveVertex(_x + pt.x, _y + pt.y);
      }
      for (let i = 0; i < 3; i++) {
        const lumenPt = this.lumenArray[i];
        let r = dist(0, 0, lumenPt.x, lumenPt.y) - _steps_size * j;
        r *= _zoom;

        let ang = lumenPt.heading();
        let pt = createVector(r * cos(ang), r * sin(ang))
        curveVertex(_x + pt.x, _y + pt.y);
      }

      endShape();
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
    push();
    imageMode(CENTER);
    image(
      dilogo,
      width / 2, height / 2 - height / 8,
      min(width, height) / 10, min(width, height) / 10
    );
    pop();

    push();
    imageMode(CORNER);
    let aspr = vllogo.width / vllogo.height;
    tint(255, 100); // Display at half opacity
    image(
      vllogo,
      width - 4 * width / 25, height / 30 * width / height,
      21 * aspr, 21);
    pop();
  }

  renderPersonInfo() {
    textFont(poppins_bold);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(218, 186, 96);

    let voff = 75;

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

  renderLumenIDCard() {
    background(10);

    push();
    translate(-2 * this.centroid.x, -2 * this.centroid.y);
    this.renderLumen(this.anchorPt.x, this.anchorPt.y);
    pop();

    this.renderBrandImages();
    this.renderPersonInfo();
    // this.renderPointers();
  }

  renderClearLumens(_x = this.anchorPt.x, _y = this.anchorPt.y) {
    // background(15);
    clear();

    push();
    translate(-2 * this.centroid.x, -2 * this.centroid.y);
    this.renderLumen(_x, height / 2);
    pop();
  }

  renderDebugUserDetails() {
    noStroke();
    fill(237, 191, 34);

    textFont('monospace');
    textSize(13);
    textAlign(LEFT, TOP);
    text(
      this.person.name.toUpperCase() + '\n' + this.person.profession + '\n',
      40, 40);
  }

  renderSkeletonImage(_x = this.anchorPt.x, _y = height / 2 - height / 10) {
    background(15);

    let divs = this.lumenArray.length;
    strokeCap(ROUND);

    // Curve tightness is mapped with length of the name
    curveTightness(map(this.lumenArray.length, 5, 20, -2, -1));

    for (let j = 0; j < 1; j++) {
      strokeWeight(2);
      stroke(240, 200, 45, 55 - 15 * j);

      if (j == 0) {
        strokeWeight(1.5);
        stroke(240, 200, 45);
        fill(240, 200, 45, 10);
      }

      beginShape();
      let count = 0;
      for (let lumenPt of this.lumenArray) {
        let r = dist(0, 0, lumenPt.x, lumenPt.y) - 10 * j;
        let ang = lumenPt.heading();
        let pt = createVector(r * cos(ang), r * sin(ang))
        curveVertex(_x + pt.x, _y + pt.y);

        // Add point at the location of a lumen pt
        push();
        strokeWeight(7.5);
        point(_x + pt.x, _y + pt.y);
        pop();

        if (j == 0) {
          // Add interactivity over mouse hover
          // if (dist(_x + pt.x, _y + pt.y, mouseX, mouseY) < 20) {
          if (1) {
            // Write the corresponding alphabet for the point
            push();
            textAlign(CENTER, CENTER);
            textFont(poppins_reg);
            textSize(22);
            fill(240, 200, 45);
            text(
              this.letterArray[count],
              _x + (r + 30) * cos(ang), _y + (r + 30) * sin(ang)
            );
            pop();

            // Draw a circle around the selected point
            strokeWeight(1);
            ellipseMode(CENTER);
            // ellipse(_x + pt.x, _y + pt.y, 15);
          }
        }

        count += 1;
      }
      endShape(CLOSE);

      this.renderGrids(_x, _y);
    }

    fill(240, 200, 45, 180);
    textSize(22);
    textFont(poppins_reg);
    textAlign(CENTER, BOTTOM);
    text(
      "This image is a skeleton view for the Lumen\n generated based on your name.\n\n" +
      "Text near the points (starting from top) shows \na vertex's corresponding alphabet.",
      _x, height * 9.25 / 10
    );

    // this.renderDebugUserDetails();
  }

  renderGrids(_x = this.anchorPt.x, _y = this.anchorPt.y) {
    noFill();
    strokeWeight(2);
    stroke(240, 200, 45, 25);
    ellipseMode(CENTER);

    ellipse(_x, _y, this.config.maxR * 2);
    ellipse(_x, _y, this.config.minR * 2);
  }

  renderZoomBg(_x = 1 * width, _y = - height / 3.5, _scale = 2.3) {
    background(20);
    this.renderLumen(_x, _y, _scale, 7.5);

    push();
    imageMode(CORNER);
    image(
      dilogo,
      40, height - 120, min(width, height) / 9, min(width, height) / 9
    );
    pop();

    // this.renderDebugUserDetails();
  }

  renderLumenTiles(_x = this.anchorPt.x, _y = height/2 - height/10) {
    background(15);

    push();
    translate(-2 * this.centroid.x, -2 * this.centroid.y);
    this.renderLumen(_x, _y);
    pop();

    push();
    imageMode(CENTER);
    image(
      dilogo,
      _x, _y,
      min(width, height) / 10, min(width, height) / 10
    );
    pop();

    push();
    textFont(poppins_bold);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(218, 186, 96);

    let voff = 125;

    // ATTENDEE NAME
    textSize(width / 18);
    text(this.person.name.toUpperCase(),
      width / 2, height - 7 * height / 25 + voff);

    // ATTENDEE PROFESSION
    fill(218, 186, 96);
    textSize(width / 35)
    text(this.person.profession.toUpperCase(),
      width / 2, height - 4.75 * height / 25 + voff);

    // SEPARATOR
    stroke(218, 186, 96);
    strokeWeight(3);
    line(
      width / 2 - 30, height - 5.65 * height / 25 + voff,
      width / 2 + 30, height - 5.65 * height / 25 + voff
    );
    pop();
  }
}

class Arm {
  constructor() {
    this.upperRotation = createVector(0, 0, 0); // p5.Vector for upper arm rotations
    this.foreRotation = createVector(0, 0, 0); // p5.Vector for forearm rotations

    this.upperOffset = createVector(0, 0, 0);
    this.foreOffset = createVector(0, 0, 0);

    this.fillColor = MODEL_YELLOW;
  }

  /**
   *
   * @param {Array} coord [x, y, z]
   */
  setUpperRotation(coord) {
    this.upperRotation.x = coord[0];
    this.upperRotation.y = coord[1];
    this.upperRotation.z = coord[2];
  }

  /**
   *
   * @param {Array} coord [x, y, z]
   */
  setForeRotation(coord) {
    this.foreRotation.x = coord[0];
    this.foreRotation.y = coord[1];
    this.foreRotation.z = coord[2];
  }

  setFillColor(fillColor) {
    this.fillColor = fillColor;
  }

  zeroUpper() {
    this.upperOffset.set(this.upperRotation);
  }

  zeroFore() {
    this.foreOffset.set(this.foreRotation);
  }

  /**
   * Gets double array of current upper and fore arm coordinates
   * @returns {Array} [upper - [x, y, z], fore - [x, y, z]];
   */
  getRotationVector() {
    let myUpper = p5.Vector.sub(this.upperRotation, this.upperOffset);
    let myFore = p5.Vector.sub(this.foreRotation, this.foreOffset);

    return [
      [myUpper.x, myUpper.y, myUpper.z],
      [myFore.x, myFore.y, myFore.z],
    ];
  }

  /**
   * Draws arm according to stored upper + fore rotation.
   * Will used stored offset if noOffset set to false
   *
   * @param {boolean} noOffset whether should use the saved offset values
   */
  draw(noOffset) {
    let myUpper, myFore;
    if (!noOffset) {
      myUpper = p5.Vector.sub(this.upperRotation, this.upperOffset);
      myFore = p5.Vector.sub(this.foreRotation, this.foreOffset);
    } else {
      myUpper = this.upperRotation;
      myFore = this.foreRotation;
    }

    push();
    fill(this.fillColor);
    rotateZ(myUpper.z);
    rotateX(myUpper.x);
    rotateY(-myUpper.y);

    // translate(0, (-1 * BOX_HEIGHT) / 2, 0);
    sphere(JOINT_RADIUS, 32, 32);
    translate(0, BOX_HEIGHT / 2, 0);

    box(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH, 32, 32);

    translate(0, BOX_HEIGHT / 2, 0);
    sphere(JOINT_RADIUS, 32, 32);

    rotateZ(myFore.z);
    rotateX(myFore.y);
    rotateY(myFore.x);

    box(BOX_WIDTH, BOX_HEIGHT * 2, BOX_DEPTH, 32, 32);

    translate(0, BOX_HEIGHT, 0);
    sphere(JOINT_RADIUS, 32, 32);

    pop();
  }
}

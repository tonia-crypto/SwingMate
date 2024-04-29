class Slider {
  constructor(maxVal) {
    this.maxVal = maxVal;
    this.sliderColor = GREY;
    this.rangeColor = DARK_PURPLE;

    this.fromSlider = document.querySelector("#fromSlider");
    this.toSlider = document.querySelector("#toSlider");
    this.playSlider = document.querySelector("#playSlider");

    this.sliderContainer = document.querySelector("#slider_container");

    this.updateMax(maxVal);

    this.fillSlider();

    this.fromSlider.oninput = () => this.fromSliderControl();
    this.toSlider.oninput = () => this.toSliderControl();
    this.playSlider.oninput = () => this.playSliderControl();

    this.playSliderUpdateEvent = new Event("playSliderUpdate");
    this.fromSliderUpdateEvent = new Event("fromSliderUpdate");

    this.unhide();
  }

  /**
   * Hides slider
   */
  hide() {
    this.sliderContainer.style.display = "none";
  }

  /**
   * Shows slider
   */
  unhide() {
    this.sliderContainer.style.display = "flex";
  }

  /**
   * Sets a new max number for the slider
   *
   * @param {number} max - new max of slider
   */
  updateMax(max) {
    this.fromSlider.max = max;
    this.toSlider.max = max;
    this.playSlider.max = max;

    this.fromSlider.value = 0;
    this.toSlider.value = max;
    this.playSlider.value = 0;

    this.fillSlider();
  }

  /**
   * Fills the color between the sliders with the right color
   *
   * @returns null
   */
  fillSlider() {
    const rangeDistance = this.toSlider.max - this.toSlider.min; // how big the slider is
    const fromPosition = this.fromSlider.value - this.toSlider.min;
    const toPosition = this.toSlider.value - this.toSlider.min;

    if (fromPosition >= toPosition) {
      return;
    }

    // percentages
    const startRangeColor = (fromPosition / rangeDistance) * 100;
    const endRangeColor = (toPosition / rangeDistance) * 100; // - circleActivePercentage

    // color the slider on top
    this.playSlider.style.background = `linear-gradient(
            to right,
            ${this.sliderColor} 0%,
            ${this.sliderColor} ${startRangeColor}%,
            ${this.rangeColor} ${startRangeColor}%,
            ${this.rangeColor} ${endRangeColor}%,
            ${this.sliderColor} ${endRangeColor}%,
            ${this.sliderColor} 100% 
        )`;
  }

  /**
   * Ensures that the from slider (to the left) does not go over the to slider (to the right
   */
  fromSliderControl() {
    this.fillSlider();

    let fromVal = this.getFromValueInt();
    let toVal = this.getToValueInt();

    if (fromVal >= toVal) {
      this.fromSlider.value = toVal - 1;
    }
    this.playSlider.value = fromSlider.value;
    this.broadcastPlaySliderUpdate();
    this.fromSlider.dispatchEvent(this.fromSliderUpdateEvent);
  }

  /**
   * Ensures that the 'to' slider (to the right) does not go too far left, over the 'from' slider (to the left)
   */
  toSliderControl() {
    this.fillSlider();

    let fromVal = this.getFromValueInt();
    let toVal = this.getToValueInt();

    if (toVal <= fromVal) {
      this.toSlider.value = fromVal + 1;
    }

    this.playSlider.value = toSlider.value;
    this.broadcastPlaySliderUpdate();
  }

  /**
   * Makes sure that the 'play' slider (to the center), stays within the bounds of the 'from' and 'to' slider
   */
  playSliderControl() {
    let fromVal = this.getFromValueInt();
    let playVal = this.getPlayValueInt();
    let toVal = this.getToValueInt();

    if (playVal < fromVal) {
      this.playSlider.value = fromVal;
    } else if (playVal > toVal) {
      this.playSlider.value = toVal;
    }

    this.broadcastPlaySliderUpdate();
  }

  /**
   * Dispatches event that play slider has moved
   */
  broadcastPlaySliderUpdate() {
    this.playSlider.dispatchEvent(this.playSliderUpdateEvent);
  }

  /**
   * Sets the play slider where val is
   *
   * @param {number} val desired position of the play slider
   */
  setPlaySlider(val) {
    this.playSlider.value = val;
  }

  /**
   *
   * @returns {number} number value of where 'from' slider is
   */
  getFromValueInt() {
    return parseInt(this.fromSlider.value, 10);
  }

  /**
   *
   * @returns {number} number value of where 'to' slider is
   */
  getToValueInt() {
    return parseInt(this.toSlider.value, 10);
  }

  /**
   *
   * @returns {number} number value of where 'play' slider is
   */
  getPlayValueInt() {
    return parseInt(this.playSlider.value, 10);
  }
}

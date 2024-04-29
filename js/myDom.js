class Dom {
  /**
   * Constructor for DOM class
   *
   * @param {BluetoothManager} upperBluetoothManager - bluetooth manager of upperarm
   * @param {BluetoothManager} foreBluetoothManager - bluetooth manager of forearm
   * @param {Arm} myArm - primary arm model
   * @param {Arm} myArm2 - secondary arm model
   */
  constructor(upperBluetoothManager, foreBluetoothManager, myArm, myArm2) {
    this.upperBluetoothManager = upperBluetoothManager;
    this.foreBluetoothManager = foreBluetoothManager;
    this.myArm = myArm;
    this.myArm2 = myArm2;

    //screens
    this.setupScreen = select(ID_TAGS.SETUP_SCREEN);
    this.modelScreen = select(ID_TAGS.MODEL_SCREEN);

    this.canvasContainer = select(ID_TAGS.CANVAS_CONTAINER);
    this.canvas = select("canvas");
    this.header = select(ID_TAGS.HEADER);

    // buttons
    this.connectUpperBtn = select(ID_TAGS.CONNECT_UPPER_BTN);
    this.connectForeBtn = select(ID_TAGS.CONNECT_FORE_BTN);
    this.zeroBtn = select(ID_TAGS.ZERO_BTN);
    this.recordBtn = select(ID_TAGS.RECORD_BTN);
    this.recordBtn2 = select(ID_TAGS.RECORD_BTN2);
    this.playBtn = select(ID_TAGS.PLAY_BTN);
    this.cropBtn = select(ID_TAGS.CROP_BTN);

    // icons
    this.playIcon = select(ID_TAGS.PLAY_ICON);
    this.stopIcon = select(ID_TAGS.STOP_ICON);
    this.liveIcon = select(ID_TAGS.LIVE_ICON);

    this.sliderContainer = select(ID_TAGS.SLIDER_CONTAINER);

    this.connectUpperBtn.mousePressed(this.connectUpper.bind(this));
    this.connectForeBtn.mousePressed(this.connectFore.bind(this));
    this.zeroBtn.mousePressed(this.zero.bind(this));

    this.setSetupScreen();
  }

  /**
   * Handles UI and connects the upperarm to web application
   */
  async connectUpper() {
    this.setBtnToLoading(this.connectUpperBtn);

    // disconnect if connected
    if (this.upperBluetoothManager.isConnected()) {
      await this.upperBluetoothManager.disconnect();
    }

    await this.upperBluetoothManager.scanDevices();

    this.removeBtnFromLoading(this.connectUpperBtn);

    if (this.upperBluetoothManager.isConnected()) {
      this.replaceBtnWithCheckmark(this.connectUpperBtn);
    }

    // FIXME
    if (
      this.foreBluetoothManager.isConnected() &&
      this.upperBluetoothManager.isConnected()
    ) {
      this.setModelScreen();
    }
  }

  /**
   * Handles UI and connects the forearm to web application
   */
  async connectFore() {
    this.setBtnToLoading(this.connectForeBtn);

    // disconnect if connected
    if (this.foreBluetoothManager.isConnected()) {
      await this.foreBluetoothManager.disconnect();
    }

    await this.foreBluetoothManager.scanDevices();

    this.removeBtnFromLoading(this.connectForeBtn);

    if (this.foreBluetoothManager.isConnected()) {
      this.replaceBtnWithCheckmark(this.connectForeBtn);
    }

    if (
      this.foreBluetoothManager.isConnected() &&
      this.upperBluetoothManager.isConnected()
    ) {
      this.setModelScreen();
    }
  }

  /**
   * Shows or hides 3d arm model canvas (p5.js canvas)
   *
   * @param {boolean} show true to show canvas, false to hide
   */
  showCanvas(show) {
    if (show) {
      this.canvasContainer.show();
    } else {
      this.canvasContainer.hide();
    }
  }

  /**
   * zeros our the fore and upper arm to set the root postion
   */
  zero() {
    this.myArm.zeroFore();
    this.myArm.zeroUpper();
  }

  /**
   * Displays the play icon, and hides the stop icon
   */
  togglePlayIcon() {
    this.playIcon.show();
    this.stopIcon.hide();
  }

  /**
   * Displays the stop icon and hides the play icon on the slider
   */
  toggleStopIcon() {
    this.playIcon.hide();
    this.stopIcon.show();
  }

  /**
   *
   * @returns {p5.Element}
   */
  getPlayBtn() {
    return this.playBtn;
  }

  /**
   *
   * @returns {p5.Element}
   */
  getCropBtn() {
    return this.cropBtn;
  }

  /**
   *
   * @returns {p5.Element}
   */
  getRecordBtn() {
    return this.recordBtn;
  }

  /**
   *
   * @returns {p5.Element}
   */
  getRecordBtn2() {
    return this.recordBtn2;
  }

  /**
   * Sets whether the application should display in Debug Mode
   *
   * @param {boolean} debugMode
   */
  setDebugMode(debugMode) {
    if (debugMode) {
      this.header.html("Debug Mode");
      this.connectUpperBtn.hide();
      this.zeroBtn.hide();
      this.connectForeBtn.hide();
      this.recordBtn.hide();
    }
  }

  /**
   * Sets screen so that the canvas is hidden, and just the buttons to connect the upper and fore arm buttons
   */
  setSetupScreen() {
    this.modelScreen.hide();
    this.setupScreen.style("display: flex");
  }

  /**
   * Displays the P5.js model and canvas
   */
  setModelScreen() {
    this.setupScreen.style("display: none");
    this.modelScreen.show();
  }

  /**
   * Displays the UI for when recording arm swings
   */
  setRecordMode() {
    this.recordBtn.html("STOP");
    this.recordBtn2.hide();
    this.recordBtn.class(CLASS_TAGS.PRIMARY_BTN);
    this.liveIcon.show();
    this.myArm.setFillColor(MODEL_RED);
    this.sliderContainer.style("display: none");
  }

  /**
   *
   * Sets the slider and UI so that you can replay your swing
   *
   * @param {number} recordNum 1 or 2: whether you are in the 1st iteration of recording, or 2nd
   */
  setPlayMode(recordNum) {
    this.recordBtn.html("Rerecord");
    this.recordBtn.class(CLASS_TAGS.SECONDARY_BTN);
    this.liveIcon.hide();
    this.zeroBtn.hide();

    if (recordNum == 1) {
      this.myArm.setFillColor(MODEL_PURPLE);
    } else {
      this.myArm2.setFillColor(MODEL_PURPLE);
      this.myArm.setFillColor(MODEL_GREEN);
    }
    this.sliderContainer.style("display: flex");

    if (recordNum == 1) {
      this.recordBtn2.show();
    }
  }

  /**
   *
   * Puts btn into loading state
   * @param {p5.Element} btn
   */
  setBtnToLoading(btn) {
    let loadingElement = document.createElement("img");
    loadingElement.classList.add("loading_icon");
    loadingElement.src = "icons/circle-notch.svg";
    btn.elt.appendChild(loadingElement);

    btn.addClass("loading_btn");
  }

  /**
   *
   * Removes btn into loading state
   * @param {p5.Element} btn
   */
  removeBtnFromLoading(btn) {
    let loadingElement = btn.elt.querySelector(".loading_icon");

    if (loadingElement) {
      loadingElement.remove();
    }

    btn.removeClass("loading_btn");
  }

  /**
   * Replaces button with a checkmark
   *
   * @param {p5.Element} btn - btn you want to replace with checkmark
   */
  replaceBtnWithCheckmark(btn) {
    const divElement = document.createElement("div");
    divElement.classList.add("checkmark");

    // Create an image element inside the div
    const imgElement = document.createElement("img");
    imgElement.classList.add("checkmark-icon");
    imgElement.src = "icons/check.svg";

    // Append the image element to the div
    divElement.appendChild(imgElement);

    btn.elt.parentNode.replaceChild(divElement, btn.elt);
  }
}

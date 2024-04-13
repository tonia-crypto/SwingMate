class Dom {
  constructor(upperBluetoothManager, foreBluetoothManager, myArm) {
    this.upperBluetoothManager = upperBluetoothManager;
    this.foreBluetoothManager = foreBluetoothManager;
    this.myArm = myArm;

    //screens
    this.setupScreen = select(ID_TAGS.SETUP_SCREEN);
    this.modelScreen = select(ID_TAGS.MODEL_SCREEN);

    this.canvasContainer = select(ID_TAGS.CANVAS_CONTAINER);
    this.header = select(ID_TAGS.HEADER);

    // buttons
    this.connectUpperBtn = select(ID_TAGS.CONNECT_UPPER_BTN);
    this.connectForeBtn = select(ID_TAGS.CONNECT_FORE_BTN);
    this.zeroBtn = select(ID_TAGS.ZERO_BTN);
    this.recordBtn = select(ID_TAGS.RECORD_BTN);
    this.playBtn = select(ID_TAGS.PLAY_BTN);
    this.cropBtn = select(ID_TAGS.CROP_BTN);

    // icons
    this.playIcon = select(ID_TAGS.PLAY_ICON);
    this.stopIcon = select(ID_TAGS.STOP_ICON);

    this.connectUpperBtn.mousePressed(this.connectUpper.bind(this));
    this.connectForeBtn.mousePressed(this.connectFore.bind(this));
    this.zeroBtn.mousePressed(this.zero.bind(this));

    this.setSetupScreen();
  }

  async connectUpper() {
    this.setBtnToLoading(this.connectUpperBtn);

    // disconnect if connected
    if (this.upperBluetoothManager.isConnected()) {
      await this.upperBluetoothManager.disconnect();
    }

    await this.upperBluetoothManager.scanDevices();

    this.removeBtnFromLoading(this.connectUpperBtn);
  }

  async connectFore() {
    this.setBtnToLoading(this.connectForeBtn);

    // disconnect if connected
    if (this.foreBluetoothManager.isConnected()) {
      await this.foreBluetoothManager.disconnect();
    }

    await this.foreBluetoothManager.scanDevices();

    this.removeBtnFromLoading(this.connectForeBtn);
  }

  showCanvas(show) {
    if (show) {
      this.canvasContainer.show();
    } else {
      this.canvasContainer.hide();
    }
  }

  zero() {
    this.myArm.zeroFore();
    this.myArm.zeroUpper();
  }

  togglePlayIcon() {
    this.playIcon.show();
    this.stopIcon.hide();
  }

  toggleStopIcon() {
    this.playIcon.hide();
    this.stopIcon.show();
  }

  getPlayBtn() {
    return this.playBtn;
  }

  getCropBtn() {
    return this.cropBtn;
  }

  getRecordBtn() {
    return this.recordBtn;
  }

  setDebugMode(debugMode) {
    if (debugMode) {
      this.header.html("Debug Mode");
      this.connectUpperBtn.hide();
      this.zeroBtn.hide();
      this.connectForeBtn.hide();
      this.recordBtn.hide();
    }
  }

  setSetupScreen() {
    this.modelScreen.hide();
    this.setupScreen.style("display: flex");
  }

  setModelScreen() {
    this.setupScreen.style("display: flex");
    this.modelScreen.show();
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
}

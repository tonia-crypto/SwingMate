class Dom {
  constructor(upperBluetoothManager, foreBluetoothManager, myArm) {
    this.upperBluetoothManager = upperBluetoothManager;
    this.foreBluetoothManager = foreBluetoothManager;
    this.myArm = myArm;

    this.header = select(ID_TAGS.HEADER);

    this.connectUpperBtn = select(ID_TAGS.CONNECT_UPPER_BTN);
    this.connectForeBtn = select(ID_TAGS.CONNECT_FORE_BTN);
    this.zeroBtn = select(ID_TAGS.ZERO_BTN);
    this.recordBtn = select(ID_TAGS.RECORD_BTN);
    this.playBtn = select(ID_TAGS.PLAY_BTN);

    this.playIcon = select(ID_TAGS.PLAY_ICON);
    this.stopIcon = select(ID_TAGS.STOP_ICON);

    this.isPlayIcon = true;

    this.connectUpperBtn.mousePressed(this.connectUpper.bind(this));
    this.connectForeBtn.mousePressed(this.connectFore.bind(this));
    this.zeroBtn.mousePressed(this.zero.bind(this));
  }

  async connectUpper() {
    if (!this.upperBluetoothManager.isConnected()) {
      await this.upperBluetoothManager.scanDevices();
    } else {
      await this.upperBluetoothManager.disconnect();
    }

    if (this.upperBluetoothManager.isConnected()) {
      this.connectUpperBtn.html("Disconnect Upperarm");
    } else {
      this.connectUpperBtn.html("Connect Upperarm");
    }
  }

  async connectFore() {
    this.foreBluetoothManager.test();
    if (!this.foreBluetoothManager.isConnected()) {
      await this.foreBluetoothManager.scanDevices();
    } else {
      await this.foreBluetoothManager.disconnect();
    }

    if (this.foreBluetoothManager.isConnected()) {
      this.connectForeBtn.html("Disconnect Forearm");
    } else {
      this.connectForeBtn.html("Connect Forearm");
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
}

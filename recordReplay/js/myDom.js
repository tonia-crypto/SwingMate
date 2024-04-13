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
    this.replayBtn = select(ID_TAGS.REPLAY_BTN);

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

  getRecordBtn() {
    return this.recordBtn;
  }

  getReplayBtn() {
    return this.replayBtn;
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

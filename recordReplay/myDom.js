class Dom {
  constructor(upperBluetoothManager, foreBluetoothManager, myArm) {
    this.upperBluetoothManager = upperBluetoothManager;
    this.foreBluetoothManager = foreBluetoothManager;
    this.myArm = myArm;

    this.connectUpperBtn = select(ID_TAGS.CONNECT_UPPER_BTN);
    this.zeroUpperBtn = select(ID_TAGS.ZERO_UPPER_BTN);
    this.connectForeBtn = select(ID_TAGS.CONNECT_FORE_BTN);
    this.zeroForeBtn = select(ID_TAGS.ZERO_FORE_BTN);
    this.recordBtn = select(ID_TAGS.RECORD_BTN);
    this.replayBtn = select(ID_TAGS.REPLAY_BTN);

    this.connectUpperBtn.mousePressed(this.connectUpper.bind(this));
    this.zeroUpperBtn.mousePressed(this.zeroUpper.bind(this));
    this.connectForeBtn.mousePressed(this.connectFore.bind(this));
    this.zeroForeBtn.mousePressed(this.zeroFore.bind(this));
    this.recordBtn.mousePressed(this.record.bind(this));
    this.replayBtn.mousePressed(this.replay.bind(this));
  }

  async connectUpper() {
    // TEST ME!!!
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

  zeroUpper() {
    console.log("zero upper");
  }

  async connectFore() {
    // TEST ME!!
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

  zeroFore() {
    console.log("zero fore");
  }

  record() {
    console.log("record");
  }

  replay() {
    console.log("replay");
  }
}

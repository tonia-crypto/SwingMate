class Dom {
  constructor(upperBluetoothManager, foreBluetoothManager, arm) {
    this.upperBluetoothManager = upperBluetoothManager;
    this.foreBluetoothManager = foreBluetoothManager;

    this.upperBluetoothManager.test();

    this.connectUpperBtn = select(ID_TAGS.CONNECT_UPPER_BTN);
    this.zeroUpperBtn = select(ID_TAGS.ZERO_UPPER_BTN);
    this.connectForeBtn = select(ID_TAGS.CONNECT_FORE_BTN);
    this.zeroForeBtn = select(ID_TAGS.ZERO_FORE_BTN);
    this.recordBtn = select(ID_TAGS.RECORD_BTN);
    this.replayBtn = select(ID_TAGS.REPLAY_BTN);

    this.connectUpperBtn.mousePressed(this.connectUpper.bind(this));
    this.zeroUpperBtn.mousePressed(this.zeroUpper);
    this.connectForeBtn.mousePressed(this.connectFore.bind(this));
    this.zeroForeBtn.mousePressed(this.zeroFore);
    this.recordBtn.mousePressed(this.record);
    this.replayBtn.mousePressed(this.replay);
  }

  connectUpper() {
    console.log("connect upper");
    this.upperBluetoothManager.scanDevices();
  }

  zeroUpper() {
    console.log("zero upper");
  }

  connectFore() {
    console.log("connect fore");
    this.foreBluetoothManager.scanDevices();
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

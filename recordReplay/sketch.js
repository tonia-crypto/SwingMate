const DEBUG_MODE = false;

let setupScreen = false;
let replayState = false;

let lastUpdate = 0;

let record = false;
let play = false;
let playIndex = 0;
let recordedData = [];
let recordedData2 = [];

let recordNum = 1;

let recordCounter = MAX_RECORD_FRAMES;

let upperarmBluetoothManager;
let forearmBluetoothManager;
let myArm;
let myArm2;
let myDom;

let slider;

function startReplay() {
  if (record) record = false;
  playIndex = 0;
  play = true;
}

function setup() {
  upperarmBluetoothManager = new BluetoothManager(UPPERARM_CHIP_NAME);
  forearmBluetoothManager = new BluetoothManager(FOREARM_CHIP_NAME);

  myArm = new Arm();
  myArm2 = new Arm();

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
  angleMode(DEGREES);

  // frameRate(10);

  myDom = new Dom(upperarmBluetoothManager, forearmBluetoothManager, myArm);

  myDom.setDebugMode(DEBUG_MODE);

  myDom.getRecordBtn().mousePressed(() => onRecordStopBtn(1));
  myDom.getRecordBtn2().mousePressed(() => onRecordStopBtn(2));

  if (DEBUG_MODE) {
    recordedData = dummyData;
  }
}

function draw() {
  ambientLight(150);
  pointLight(200, 200, 200, 100, 100, 100);

  if (replayState) {
    // -------------- REPLAY -------------------------
    let index1 = playIndex;
    if (index1 >= recordedData.length) {
      index1 = recordedData.length - 1;
    }

    let upperCoord = recordedData[index1][0];
    let foreCoord = recordedData[index1][1];

    myArm.setUpperRotation(upperCoord);
    myArm.setForeRotation(foreCoord);

    if (recordNum == 2) {
      let upperCoord2 = recordedData2[playIndex][0];
      let foreCoord2 = recordedData2[playIndex][1];

      myArm2.setUpperRotation(upperCoord2);
      myArm2.setForeRotation(foreCoord2);
    }

    if (play) {
      // update play index
      playIndex++;
      slider.setPlaySlider(playIndex);

      // if at the end
      if (playIndex >= slider.getToValueInt()) {
        play = false;

        myDom.togglePlayIcon();
      }
    }
  } else if (!DEBUG_MODE) {
    // -------------- LIVE FEED ----------------------
    if (upperarmBluetoothManager.connected) {
      upperarmBluetoothManager.setRotation((coord) =>
        myArm.setUpperRotation([coord])
      );
    }

    if (forearmBluetoothManager.connected) {
      forearmBluetoothManager.setRotation((coord) =>
        myArm.setForeRotation(coord)
      );
    }
  }

  background(LIGHT_PINK);

  // draw
  myArm.draw(play);
  if (replayState && recordNum == 2) {
    myArm2.draw();
  }

  // recording data
  if (record) {
    // -------------- RECORD ----------------------
    if (recordNum == 1) {
      recordedData.push(myArm.getRotationVector());
    } else if (recordNum == 2) {
      recordedData2.push(myArm.getRotationVector());
    }
    recordCounter--;

    if (recordCounter <= 0) {
      onFinishRecording(recordNum);
    }
  }
}

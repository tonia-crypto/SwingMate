const DEBUG_MODE = false;

let setupScreen = false;
let replayState = false;

let lastUpdate = 0;

let record = false;
let play = false;
let playIndex = 0;
let recordedData = [];

let recordCounter = NUM_FRAMES_RECORD;

let upperarmBluetoothManager;
let forearmBluetoothManager;
let myArm;
let myDom;

let slider;

function startRecord() {
  replayState = false;
  recordCounter = NUM_FRAMES_RECORD;
  recordedData = [];
  record = true;
}

function startReplay() {
  if (record) record = false;
  myArm.resetMovingAverage();
  playIndex = 0;
  play = true;
}

function setup() {
  upperarmBluetoothManager = new BluetoothManager(UPPERARM_CHIP_NAME);
  forearmBluetoothManager = new BluetoothManager(FOREARM_CHIP_NAME);

  myArm = new Arm();

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);
  angleMode(DEGREES);

  frameRate(10);

  myDom = new Dom(upperarmBluetoothManager, forearmBluetoothManager, myArm);
  myDom.setSetupScreen();

  myDom.setDebugMode(DEBUG_MODE);

  myDom.getRecordBtn().mousePressed(startRecord);

  if (DEBUG_MODE) {
    recordedData = dummyData;
  }
}

async function draw() {
  orbitControl();
  ambientLight(150);
  pointLight(200, 200, 200, 100, 100, 100);

  if (replayState) {
    // -------------- REPLAY -------------------------
    let upperCoord = recordedData[playIndex][0];
    let foreCoord = recordedData[playIndex][1];

    myArm.updateUpperRotation(upperCoord);
    myArm.updateForeRotation(foreCoord);

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
    const now = millis();
    const deltaTime = now - lastUpdate;

    // reading sensors
    if (
      (upperarmBluetoothManager.connected ||
        forearmBluetoothManager.connected) &&
      deltaTime >= UPDATE_INTERVAL
    ) {
      lastUpdate = now;

      if (upperarmBluetoothManager.connected) {
        const coordUpper = await upperarmBluetoothManager.getCoord();
        myArm.updateUpperRotation(coordUpper);
      }

      if (forearmBluetoothManager.connected) {
        const coordFore = await forearmBluetoothManager.getCoord();
        myArm.updateForeRotation(coordFore);
      }
    }
  }

  // background(250);
  if (record && play) {
    background("#54040b"); // maroon
  } else if (record) {
    background("#f2a5a5"); // redish
  } else if (play) {
    background("#c8a5f2"); // lilac
  } else {
    background(LIGHT_PINK);
  }

  // normalMaterial();
  myArm.draw(play);

  // recording data
  if (record) {
    // -------------- RECORD ----------------------
    recordedData.push(myArm.getRotationVector());
    recordCounter--;

    if (recordCounter <= 0) {
      onFinishRecording();
    }
  }
}

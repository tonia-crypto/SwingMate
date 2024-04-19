function onFinishRecording() {
  record = false;
  playIndex = 0;

  let recordedDataLength;
  if (recordNum == 1) {
    recordedDataLength = recordedData.length - 1;
  } else if (recordNum == 2) {
    recordedDataLength = recordedData2.length - 1;
  }
  // initialize slider
  if (slider == null) {
    slider = new Slider(recordedDataLength);
    slider.playSlider.addEventListener("playSliderUpdate", () => {
      playIndex = slider.getPlayValueInt();
    });

    myDom.getPlayBtn().mousePressed(() => onPlayBtn());
    myDom.getCropBtn().mousePressed(() => onCropBtn());
  } else {
    slider.updateMax(recordedDataLength);
  }

  if (recordNum == 2) {
    slider.fromSlider.addEventListener("fromSliderUpdate", () => {
      playIndexOffset1 = slider.getPlayValueInt();
    });
    myArm.setFillColor(MODEL_GREEN);
  }

  console.log("Set play modes");
  myDom.setPlayMode(recordNum);

  replayState = true;
}

function onPlayBtn() {
  if (!play) {
    // if play at very end or erronously behind the 'from' slider, restart playIndex at 'from' slider
    if (
      playIndex >= slider.getToValueInt() ||
      playIndex < slider.getFromValueInt()
    ) {
      playIndex = slider.getFromValueInt();
    }

    // show stop
    myDom.toggleStopIcon();
    play = true;
  } else {
    // show play
    myDom.togglePlayIcon();
    play = false;
  }
}

function onCropBtn() {
  let from = slider.getFromValueInt();
  let to = slider.getToValueInt();
  let newRangeDist = to - from;
  console.log(newRangeDist);

  slider.updateMax(newRangeDist);

  recordedData = recordedData.slice(from, to + 1);

  playIndex = 0;
}

function onRecordStopBtn(btnNum) {
  if (!record) {
    replayState = false;
    recordCounter = MAX_RECORD_FRAMES;

    if (btnNum == 1 && recordNum != 2) {
      recordedData = [];
      recordNum = 1;
    } else {
      myArm2.upperOffset = myArm.upperOffset;
      myArm2.foreOffset = myArm.foreOffset;

      recordedData2 = [];
      recordNum = 2;
      playIndexOffset1 = 0;
      myArm.setFillColo;
    }
    myDom.setRecordMode();
    record = true;
  } else {
    onFinishRecording();
  }
}

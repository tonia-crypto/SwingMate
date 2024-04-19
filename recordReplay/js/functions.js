function onFinishRecording(recordNum) {
  record = false;
  playIndex = 0;

  // initialize slider
  if (slider == null) {
    slider = new Slider(recordedData.length - 1);
    slider.playSlider.addEventListener("playSliderUpdate", () => {
      playIndex = slider.getPlayValueInt();
    });

    myDom.getPlayBtn().mousePressed(() => onPlayBtn());
    myDom.getCropBtn().mousePressed(() => onCropBtn());
  } else {
    slider.updateMax(recordedData.length - 1);
  }

  if (recordNum == 1) {
  }

  myDom.setPlayMode();
  replayState = true;
}

function onPlayBtn() {
  console.log("play button pressed");
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
    if (btnNum == 1) {
      recordedData = [];
      recordNum = 1;
    } else if (btnNum == 2) {
      recordedData2 = [];
      recordNum = 2;
    }
    myDom.setRecordMode();
    record = true;
  } else {
    onFinishRecording();
  }
}

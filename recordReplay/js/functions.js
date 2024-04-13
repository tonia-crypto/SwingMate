function onFinishRecording() {
  record = false;
  playIndex = 0;

  // initialize slider
  if (slider == null) {
    slider = new Slider(NUM_FRAMES_RECORD - 1);
    slider.playSlider.addEventListener("playSliderUpdate", () => {
      playIndex = slider.getPlayValueInt();
    });

    myDom.getPlayBtn().mousePressed(() => onPlayBtn());
    myDom.getCropBtn().mousePressed(() => onCropBtn());
  } else {
    slider.updateMax(NUM_FRAMES_RECORD - 1);
  }

  myDom.getRecordBtn().html("Rerecord");
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

    // show play
    myDom.togglePlayIcon();
    play = true;
  } else {
    // show stop
    myDom.toggleStopIcon();
    play = false;
  }
}

function onCropBtn() {
  let from = slider.getFromValueInt();
  let to = slider.getToValueInt();
  let newRangeDist = to - from;

  slider.updateMax(newRangeDist - 1);

  recordData = recordData.slice(from, to + 1);

  playIndex = 0;
}

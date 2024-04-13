// bluetooth
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const UPPERARM_CHIP_NAME = "UPPERARM_CHIP";
const FOREARM_CHIP_NAME = "FOREARM_CHIP";

// id names
const ID_TAGS = {
  CONNECT_UPPER_BTN: "#connect_upper_btn",
  ZERO_UPPER_BTN: "#zero_upper_btn",
  CONNECT_FORE_BTN: "#connect_fore_btn",
  ZERO_FORE_BTN: "#zero_fore_btn",
  RECORD_BTN: "#record_btn",
  REPLAY_BTN: "#replay_btn",
  HEADER: "#header",
};

// sizes
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const BOX_HEIGHT = 80;
const BOX_WIDTH = 15;
const BOX_DEPTH = BOX_WIDTH;
const JOINT_RADIUS = 15;

// recording + replaying
const UPDATE_INTERVAL = 100; // milliseconds
const NUM_FRAMES_RECORD = 50;

// colors
const LIGHT_PINK = "#FFEDF4";
const OFF_PURPLE = "#6260C7";

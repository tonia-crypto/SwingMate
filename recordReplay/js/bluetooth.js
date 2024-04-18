class BluetoothManager {
  constructor(chipName) {
    this.chipName = chipName;

    this.device = null;
    this.characteristic = null;
    this.connected = false;

    this.characteristicLocked = false;
  }

  async scanDevices() {
    console.log("Scanning...");
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ name: this.chipName }],
        optionalServices: ["generic_access", SERVICE_UUID],
      });

      console.log("Found device:", this.device.name);

      await this.connect();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async connect() {
    if (!this.device) {
      console.error("No device selected");
      return false;
    }

    console.log("Connecting to device:", this.device.name);
    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    this.characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    console.log("Connected to device:", this.device.name);
    this.connected = true;

    return true;
  }

  async disconnect() {
    if (!this.device) {
      console.error("No device to disconnect from.");
      return false;
    }

    if (!this.device.gatt) {
      console.error("Device is not connected.");
      return false;
    }

    try {
      this.connected = false;
      console.log("Disconnecting from device:", this.device.name);
      await this.device.gatt.disconnect();
      console.log("Disconnected from device:", this.device.name);
      return true;
    } catch (error) {
      console.error("Error while disconnecting:", error);
    }

    return false;
  }

  /**
   *
   * @param {Arm.function} setRotation setter function that will update the arm rotation with parameters (x, y, z)
   * @returns
   */
  async setRotation(setRotation) {
    try {
      // lock + read value
      if (this.characteristicLocked) return;
      else this.characteristicLocked = true;
      let val = await this.characteristic.readValue(); // read value
      this.characteristicLocked = false;

      let x = val.getFloat32(0, true);
      let y = val.getFloat32(4, true);
      let z = val.getFloat32(8, true);

      setRotation([x, y, z]);
    } catch (error) {
      console.error("Error while reading value:", error);
    }
  }

  isConnected() {
    return this.connected;
  }
}

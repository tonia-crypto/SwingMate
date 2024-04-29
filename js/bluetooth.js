/**
 * Represents a Bluetooth manager for handling device connections and data communication.
 */
class BluetoothManager {
  /**
   * Creates an instance of BluetoothManager.
   * @param {string} chipName - The name of the Bluetooth chip to search for during device scanning.
   */
  constructor(chipName) {
    /**
     * The name of the Bluetooth chip to search for during device scanning.
     * @type {string}
     */
    this.chipName = chipName;

    /**
     * The currently connected Bluetooth device.
     * @type {BluetoothDevice | null}
     */
    this.device = null;

    /**
     * The characteristic used for communication with the Bluetooth device.
     * @type {BluetoothRemoteGATTCharacteristic | null}
     */
    this.characteristic = null;

    /**
     * Indicates whether the manager is currently connected to a device.
     * @type {boolean}
     */
    this.connected = false;

    /**
     * Indicates whether the characteristic is locked for reading.
     * @type {boolean}
     */
    this.characteristicLocked = false;
  }

  /**
   * Scans for Bluetooth devices matching the specified chip name and connects to the first found device.
   */
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

  /**
   * Connects to the currently selected Bluetooth device.
   * @returns {boolean} True if the connection is successful, otherwise false.
   */
  async connect() {
    if (!this.device) {
      console.error("No device selected");
      return false;
    }

    console.log("Connecting to device:", this.device.name);
    try {
      const server = await this.device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      this.characteristic = await service.getCharacteristic(
        CHARACTERISTIC_UUID
      );

      console.log("Connected to device:", this.device.name);
      this.connected = true;

      return true;
    } catch (error) {
      console.error("Error while connecting:", error);
      return false;
    }
  }

  /**
   * Disconnects from the currently connected Bluetooth device.
   * @returns {boolean} True if disconnection is successful, otherwise false.
   */
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
      return false;
    }
  }

  /**
   * Reads the rotation data from the connected Bluetooth device and updates it using the provided setter function.
   * @param {Function} setRotation - A setter function that updates the arm rotation with parameters (x, y, z).
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

  /**
   * Checks if the manager is currently connected to a Bluetooth device.
   * @returns {boolean} True if connected, otherwise false.
   */
  isConnected() {
    return this.connected;
  }
}

import { useState, useEffect } from "react";
import { IsQuestUsbConnected, GetDeviceSerial, GetQuestDeviceModel, GetAdbPath } from "../../wailsjs/go/main/App";

export default function Quest3() {
  const [usb, setUsb] = useState(false);
  const [serial, setSerial] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    const checkUsbConnection = async () => {
      try {
        const connected = await IsQuestUsbConnected();
        setUsb(connected);
      } catch (error) {
        console.error("Error polling usb connection");
      }
    };

    // Check on mount
    checkUsbConnection();

    // Check usb connection every 2 seconds
    const interval = setInterval(checkUsbConnection, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initComponent = async () => {
      try {
        const model = await GetQuestDeviceModel();
        const adbPath = await GetAdbPath();
        const serial = await GetDeviceSerial(adbPath, model);
        setSerial(serial);
        setModel(model);
      } catch (error) {
        console.error("Error calling usb functions", error);
      }
    };

    if (usb) {
      initComponent();
    } else {
      // Clear device info when USB disconnects
      setModel("");
      setSerial("");
    }
  }, [usb]);

  return (
    <div>
      <div>Quest 3 {usb ? "Connected" : "Not Connected"}</div>
      <div>Model {model}</div>
      <div>Serial {serial}</div>
    </div>
  );
}

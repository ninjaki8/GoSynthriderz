import { useState, useEffect } from "react";
import { IsQuestUsbConnected, GetQuestDeviceModel, GetDeviceSerial } from "../../wailsjs/go/main/App";

export const useUsbConnection = (adbPath) => {
  const [questStatus, setQuestStatus] = useState(false);
  const [deviceSerial, setDeviceSerial] = useState("");

  useEffect(() => {
    if (!adbPath) return;

    const checkUsbConnection = async () => {
      try {
        const isConnected = await IsQuestUsbConnected();
        setQuestStatus(isConnected);
      } catch (error) {
        console.error("check usb connection", error);
      }
    };

    checkUsbConnection();

    // Check usb connection every 2 seconds
    const interval = setInterval(checkUsbConnection, 2000);

    return () => clearInterval(interval);
  }, [adbPath]);

  useEffect(() => {
    const fetchSerial = async () => {
      if (questStatus && deviceSerial === "") {
        try {
          const model = await GetQuestDeviceModel();
          const serial = await GetDeviceSerial(adbPath, model);
          setDeviceSerial(serial);
        } catch (error) {
          console.error("fetchSerial", error);
        }
      } else if (!questStatus) {
        setDeviceSerial("");
      }
    };

    fetchSerial();
  }, [questStatus, adbPath]);

  return {
    questStatus,
    deviceSerial,
  };
};

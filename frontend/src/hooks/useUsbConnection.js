import { useState, useEffect } from "react";
import { IsQuestUsbConnected } from "../../wailsjs/go/main/App";

export const useUsbConnection = () => {
  const [questStatus, setQuestStatus] = useState(false);

  useEffect(() => {
    const checkUsbConnection = async () => {
      try {
        const isConnected = await IsQuestUsbConnected();
        setQuestStatus(isConnected);
      } catch (error) {
        console.error("Error polling usb connection");
      }
    };

    checkUsbConnection();

    // Check usb connection every 2 seconds
    const interval = setInterval(checkUsbConnection, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    questStatus,
  };
};

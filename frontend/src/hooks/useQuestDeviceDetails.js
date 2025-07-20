import { useEffect, useState } from "react";
import { GetDeviceProperties } from "../../wailsjs/go/main/App";

export const useQuestDeviceDetails = (adbPath, questStatus, deviceSerial) => {
  const [questProperties, setQuestProperties] = useState({});

  useEffect(() => {
    const getQuestDeviceDetails = async () => {
      try {
        const questProp = await GetDeviceProperties(adbPath, deviceSerial);
        setQuestProperties(questProp);
      } catch (error) {
        console.error("Error calling usb functions", error);
      }
    };

    let interval;

    if (adbPath && questStatus) {
      // Get initial data
      getQuestDeviceDetails();

      // Set up interval only when conditions are met
      interval = setInterval(getQuestDeviceDetails, 30000);
    } else {
      // Clear device info when USB disconnects
      setQuestProperties({});
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [adbPath, questStatus, deviceSerial]);

  return {
    questProperties,
  };
};

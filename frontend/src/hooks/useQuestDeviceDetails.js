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

    if (questStatus && deviceSerial !== "") {
      getQuestDeviceDetails();
    } else {
      // Clear device info when USB disconnects
      setQuestProperties({});
    }
  }, [questStatus, deviceSerial]);

  return {
    questProperties,
  };
};

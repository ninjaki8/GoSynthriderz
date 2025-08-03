import { useState, useEffect } from "react";
import { GetAdbPath } from "../../wailsjs/go/main/App";

export const useAdbPath = () => {
  const [adbPath, setAdbPath] = useState("");
  const [adbStatus, setAdbStatus] = useState(false);

  useEffect(() => {
    const getAdbPath = async () => {
      try {
        const path = await GetAdbPath();
        setAdbPath(path);
        if (adbPath !== "") {
          setAdbStatus(true);
        } else {
          setAdbStatus(false);
        }
      } catch (error) {
        console.log("Failed to get adb path", error);
      }
    };

    getAdbPath();
  }, [adbPath]);

  return {
    adbPath,
    setAdbPath,
    adbStatus,
  };
};

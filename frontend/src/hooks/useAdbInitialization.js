// hooks/useAdbInitialization.js
import { useState, useEffect } from "react";
import { GetAdbVersion, StartAdbServer } from "../../wailsjs/go/main/App";
import { parseAdbVersion } from "../helpers/adbVersionParser";

export const useAdbInitialization = (adbPath, setErrors) => {
  const [adbVersion, setAdbVersion] = useState("");
  const [adbStatus, setAdbStatus] = useState(false);

  useEffect(() => {
    const initializeAdb = async () => {
      if (!adbPath) {
        return;
      }

      const newErrors = {};

      try {
        // Start ADB server
        await StartAdbServer(adbPath);

        // Get ADB version
        const version = await GetAdbVersion(adbPath);

        if (version && version !== "") {
          const adbVersionData = parseAdbVersion(version);
          setAdbVersion(adbVersionData);
          setAdbStatus(true);
        } else {
          setAdbStatus(false);
          newErrors.adbVersion = "Failed to get ADB version";
        }
      } catch (error) {
        console.error("Error initializing adb functions", error);
        newErrors.adbVersion = "Failed to initialize ADB: " + error;
        setAdbStatus(false);
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
      }
    };

    initializeAdb();
  }, [adbPath]);

  return {
    adbVersion,
    adbStatus,
  };
};

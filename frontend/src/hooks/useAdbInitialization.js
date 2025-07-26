// hooks/useAdbInitialization.js
import { useState, useEffect } from "react";
import { GetAdbVersion, StartAdbServer } from "../../wailsjs/go/main/App";
import { parseAdbVersion } from "../helpers/adbVersionParser";

export const useAdbInitialization = (adbPath) => {
  const [adbVersion, setAdbVersion] = useState("");
  const [adbStatus, setAdbStatus] = useState(false);

  useEffect(() => {
    const initializeAdb = async () => {
      if (!adbPath) {
        return;
      }

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
        }
      } catch (error) {
        console.error("Error initializing adb functions", error);
        setAdbStatus(false);
      }
    };

    initializeAdb();
  }, [adbPath]);

  return {
    adbVersion,
    adbStatus,
  };
};

import { useState, useEffect } from "react";
import { EventsOn, EventsOff } from "../../wailsjs/runtime/runtime";
import { GetDeviceSynthFiles, FetchPage, FetchAllPages, SyncNewBeatmaps } from "../../wailsjs/go/main/App";

export const useTerminal = (start, setStart, adbPath, customSongsDir, deviceSerial) => {
  const [terminalOutput, setTerminalOutput] = useState([]);

  useEffect(() => {
    // Set up event listener first
    EventsOn("log", (text, type = "success") => {
      const timestamp = new Date().toLocaleTimeString();
      setTerminalOutput((prev) => [...prev, { text, type, timestamp }]);
    });

    // Cleanup function to remove event listener
    return () => {
      EventsOff("log");
    };
  }, []);

  useEffect(() => {
    if (!start) return;

    console.log("started");
    const startExecution = async () => {
      // clear output
      setTerminalOutput([]);

      // Get all device files from custom songs dir
      const currentFiles = await GetDeviceSynthFiles(adbPath, customSongsDir, deviceSerial);

      // Get all synthriderz.com api listings
      const firstPage = await FetchPage(1);
      const totalPages = firstPage.pageCount;
      const allPages = await FetchAllPages(totalPages);

      // Sync new beatmaps
      await SyncNewBeatmaps(allPages, currentFiles, adbPath, deviceSerial);

      setStart(false);
    };

    startExecution();
  }, [start]);

  return {
    terminalOutput,
    setTerminalOutput,
  };
};

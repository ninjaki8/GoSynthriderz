import { useState, useEffect } from "react";
import { EventsOn, EventsOff } from "../../wailsjs/runtime/runtime";
import { GetDeviceSynthFiles, GetAdbPath, GetDeviceSerial, GetQuestDeviceModel, GetSynthridersFolder } from "../../wailsjs/go/main/App";
import { FetchPage, FetchAllPages, SyncNewBeatmaps } from "../../wailsjs/go/main/App";

export default function Program({ start, setStart }) {
  const [log, setLog] = useState([]);

  useEffect(() => {
    // Set up event listener first
    EventsOn("log", (message) => {
      setLog((prev) => [...prev, message]);
    });

    const startExecution = async () => {
      // Get all files
      const adbPath = await GetAdbPath();
      const model = await GetQuestDeviceModel();
      const serial = await GetDeviceSerial(adbPath, model);
      const folder = await GetSynthridersFolder();
      const currentFiles = await GetDeviceSynthFiles(adbPath, folder, serial);

      // Get all api listings
      const firstPage = await FetchPage(1);
      const totalPages = firstPage.pageCount;
      const allPages = await FetchAllPages(totalPages);

      // Sync new beatmaps
      const sync = await SyncNewBeatmaps(allPages, currentFiles, adbPath, serial);

      setStart(false);
    };

    if (start) {
      startExecution();
    }

    // Cleanup function to remove event listener
    return () => {
      EventsOff("log");
    };
  }, [start]);

  return (
    <div>
      <h2 className="text-xl mb-4">Log Output</h2>
      <pre>{log.join("\n")}</pre>
    </div>
  );
}

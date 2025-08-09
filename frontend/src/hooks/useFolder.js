import { useState, useEffect } from "react";
import { AdbRemoteDirExists, GetSynthridersFolder, GetSynthFilesCount } from "../../wailsjs/go/main/App";

export const useFolder = (adbPath, questStatus, deviceSerial) => {
  const [customSongsDir, setCustomSongsDir] = useState("");
  const [folderStatus, setFolderStatus] = useState(false);
  const [folderData, setFolderData] = useState({});

  // Move checkFolder here, outside useEffect so you can return it
  const checkFolder = async () => {
    if (!adbPath || !deviceSerial) return;

    try {
      const folder = await GetSynthridersFolder();
      const customSongs = await AdbRemoteDirExists(adbPath, deviceSerial, folder);
      setCustomSongsDir(folder);
      setFolderStatus(customSongs);

      let countFiles = 0;
      if (customSongs) {
        countFiles = await GetSynthFilesCount(adbPath, folder, deviceSerial);
      }

      const folderData = {
        name: "CustomSongs",
        path: folder,
        lastChecked: new Date().toLocaleTimeString(),
        fileCount: countFiles,
      };
      setFolderData(folderData);
    } catch (error) {
      console.error("Error calling synthriders folder functions", error);
    }
  };

  useEffect(() => {
    checkFolder();
  }, [adbPath, questStatus, deviceSerial]);

  return {
    folderData,
    folderStatus,
    customSongsDir,
    checkFolder,
  };
};

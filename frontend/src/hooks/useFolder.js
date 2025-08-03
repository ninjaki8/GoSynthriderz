import { useState, useEffect } from "react";
import { AdbRemoteDirExists, GetSynthridersFolder, GetSynthFilesCount } from "../../wailsjs/go/main/App";

export const useFolder = (adbPath, questStatus, deviceSerial) => {
  const [customSongsDir, setCustomSongsDir] = useState("");
  const [folderStatus, setFolderStatus] = useState(false);
  const [folderData, setFolderData] = useState({});

  useEffect(() => {
    if (!adbPath || !deviceSerial) return;

    const checkFolder = async () => {
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

    checkFolder();
  }, [adbPath, questStatus, deviceSerial]);

  return {
    folderData,
    folderStatus,
    customSongsDir,
  };
};

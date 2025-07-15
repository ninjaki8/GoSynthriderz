import { useState, useEffect } from "react";
import { AdbRemoteDirExists, GetSynthridersFolder, GetDeviceSerial, GetQuestDeviceModel, GetAdbPath } from "../../wailsjs/go/main/App";

export default function CustomSongs() {
  const [folder, setFolder] = useState(false);

  useEffect(() => {
    const initComponent = async () => {
      try {
        const model = await GetQuestDeviceModel();
        const adbPath = await GetAdbPath();
        const serial = await GetDeviceSerial(adbPath, model);
        const folder = await GetSynthridersFolder();
        const customSongs = await AdbRemoteDirExists(adbPath, serial, folder);
        setFolder(customSongs);
      } catch (error) {
        console.error("Error calling usb functions", error);
      }
    };

    initComponent();
  }, []);

  return <div>CustomSongs Folder {folder ? "Found" : "Not Found"}</div>;
}

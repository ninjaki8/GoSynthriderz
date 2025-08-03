import { useState } from "react";
import "./App.css";

import AdbCard from "./components/AdbCard";
import QuestCard from "./components/QuestCard";
import FolderCard from "./components/FolderCard";
import SyncCard from "./components/SyncCard";
import TerminalOutput from "./components/TerminalOutput";
import { useUsbConnection } from "./hooks/useUsbConnection";
import { useQuestDeviceDetails } from "./hooks/useQuestDeviceDetails";
import { useAdbPath } from "./hooks/useAdbPath";
import { useFolder } from "./hooks/useFolder";

function App() {
  const { adbPath, adbStatus } = useAdbPath();
  const { questStatus, deviceSerial } = useUsbConnection(adbPath);
  const { questProperties } = useQuestDeviceDetails(adbPath, questStatus, deviceSerial);
  const { customSongsDir, folderStatus, folderData } = useFolder(adbPath, questStatus, deviceSerial);
  const [start, setStart] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdbCard adbPath={adbPath} />
          <QuestCard questStatus={questStatus} questProperties={questProperties} />
          <FolderCard folderStatus={folderStatus} folderData={folderData} />
          <SyncCard adbStatus={adbStatus} questStatus={questStatus} folderStatus={folderStatus} start={start} setStart={setStart} />
        </div>

        {/* Terminal Output */}
        <TerminalOutput start={start} setStart={setStart} adbPath={adbPath} deviceSerial={deviceSerial} customSongsDir={customSongsDir} />
      </div>
    </div>
  );
}

export default App;

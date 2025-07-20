import { useDeviceInitialization } from "./hooks/useDeviceInitialization";

import AdbCard from "./components/AdbCard";
import QuestCard from "./components/QuestCard";
import FolderCard from "./components/FolderCard";
import SyncCard from "./components/SyncCard";
import TerminalOutput from "./components/TerminalOutput";
import "./App.css";

function App() {
  const { adbPath, deviceModel, deviceSerial, loading, errors, setErrors } = useDeviceInitialization();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your Quest 3 development environment</p>

          {/* Loading indicator */}
          {loading && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-400 rounded">
              <p className="text-blue-700">Loading...</p>
            </div>
          )}

          {/* Error display */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
              <h3 className="text-red-800 font-semibold mb-2">Errors:</h3>
              {Object.entries(errors).map(([key, message]) => (
                <p key={key} className="text-red-700 text-sm">
                  <strong>{key}:</strong> {message}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdbCard adbPath={adbPath} setErrors={setErrors} />
          <QuestCard adbPath={adbPath} deviceSerial={deviceSerial} />
          {/* <FolderCard /> */}
          {/* <SyncCard/> */}
        </div>

        {/* Terminal Output */}
        {/* <TerminalOutput/> */}
      </div>
    </div>
  );
}

export default App;

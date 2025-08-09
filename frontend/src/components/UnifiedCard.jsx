import { Folder, Play, Server, Monitor, CheckCircle, AlertCircle, Download, Zap, Headphones, Wifi, Battery, HardDrive } from "lucide-react";

import { useAdbInitialization } from "../hooks/useAdbInitialization";
import { InstallAdbWindows } from "../../wailsjs/go/main/App";

export default function UnifiedCard({
  folderStatus,
  adbStatus,
  adbPath,
  setAdbPath,
  syncStatus,
  syncProgress,
  syncDone,
  syncError,
  questStatus,
  questProperties,
}) {
  const { adbVersion } = useAdbInitialization(adbPath);

  // Battery and storage helpers (from QuestCard)
  const getBatteryColor = (level) => {
    if (level > 60) return "from-emerald-500 to-emerald-600";
    if (level > 30) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getBatteryIcon = (level) => {
    if (level > 20) return "text-emerald-400";
    return "text-red-400";
  };

  const getStoragePercentage = () => {
    const used = parseFloat(questProperties.used_space) || 0;
    const total = parseFloat(questProperties.total_space) || 1;
    return Math.round((used / total) * 100);
  };

  const getStorageColor = (percentage) => {
    if (percentage < 70) return "from-blue-500 to-blue-600";
    if (percentage < 85) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const storagePercentage = getStoragePercentage();

  const installAdb = async () => {
    const installPath = await InstallAdbWindows();
    setAdbPath(installPath);
  };

  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 max-w-5xl mx-auto">
      {/* Unified Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-800 p-6 text-white relative overflow-hidden flex items-center justify-between space-x-8">
        {/* Folder */}
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-lg border border-white/20">
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Folder Sync</h2>
            <p className="text-indigo-300 text-sm opacity-90">Local Storage</p>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              folderStatus ? "bg-emerald-400 shadow-lg shadow-emerald-400/50" : "bg-red-400 shadow-lg shadow-red-400/50"
            } animate-pulse ml-4`}
            title={folderStatus ? "Folder Mounted" : "Folder Not Mounted"}
          ></div>
        </div>

        {/* Sync */}
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-lg border border-white/20">
            <Play className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Sync</h2>
            <p className="text-purple-300 text-sm opacity-90">Remote Sync</p>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              syncStatus ? "bg-emerald-400 shadow-lg shadow-emerald-400/50" : "bg-red-400 shadow-lg shadow-red-400/50"
            } animate-pulse ml-4`}
            title={syncStatus ? "Sync Online" : "Sync Offline"}
          ></div>
        </div>

        {/* ADB */}
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-lg border border-white/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">ADB Server</h2>
            <p className="text-blue-300 text-sm opacity-90">Android Debug Bridge</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {adbStatus ? (
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" title="ADB Online" />
            ) : (
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" title="ADB Offline"></div>
            )}
          </div>
        </div>

        {/* Quest */}
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-lg border border-white/20">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Quest 3</h2>
            <p className="text-pink-300 text-sm opacity-90">VR Headset</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {questStatus ? (
              <>
                <Wifi className="w-5 h-5 text-emerald-400" title="Quest Online" />
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              </>
            ) : (
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" title="Quest Offline"></div>
            )}
          </div>
        </div>
      </div>

      {/* Unified Body: Grid 2 columns */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
        {/* LEFT COLUMN */}

        {/* Folder + Sync combined section */}
        <div className="space-y-6">
          {/* Folder Info */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold mb-3 text-white flex items-center space-x-2">
              <Folder className="w-5 h-5" />
              <span>Folder Status</span>
            </h3>
            <p>
              Status: <span className={folderStatus ? "text-emerald-400" : "text-red-400"}>{folderStatus ? "Mounted" : "Not Mounted"}</span>
            </p>
          </div>

          {/* Sync Info */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="font-semibold mb-3 text-white flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Sync Status</span>
            </h3>
            <p>
              <span className={`font-semibold ${syncStatus ? "text-emerald-400" : "text-red-400"}`}>{syncStatus ? "Online" : "Offline"}</span>
            </p>
            <p>Progress: {syncProgress}</p>
            <p>Done: {syncDone ? "Yes" : "No"}</p>
            {syncError && <p className="text-red-500 font-semibold">Error: {syncError}</p>}
          </div>
        </div>

        {/* RIGHT COLUMN */}

        {/* ADB Info */}
        <div className="space-y-6">
          <div
            className={`p-6 rounded-xl border-2 ${
              adbPath !== "" ? "bg-emerald-900 border-emerald-700" : "bg-red-900 border-red-700"
            } transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white flex items-center space-x-2">
                <Server className="w-6 h-6" />
                <span>ADB Server</span>
              </h3>
              <div>
                {adbStatus ? (
                  <Zap className="w-5 h-5 text-yellow-400 animate-pulse" title="ADB Online" />
                ) : (
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" title="ADB Offline"></div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {adbPath !== "" ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                <span className={`font-semibold ${adbPath !== "" ? "text-emerald-400" : "text-red-400"}`}>
                  {adbPath !== "" ? "ADB Installed" : "ADB Not Found"}
                </span>
              </div>

              {adbPath === "" && (
                <button
                  onClick={() => installAdb()}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-xl font-medium hover:from-blue-800 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </button>
              )}
            </div>

            {adbPath !== "" && (
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-gray-300">
                <div className="flex items-center space-x-2 mb-4 text-gray-300">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold">System Information</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="font-medium text-gray-400">Version</span>
                    <span className="font-mono text-sm bg-gray-900 px-2 py-1 rounded-md text-gray-300">{adbVersion.version}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="font-medium text-gray-400">Build</span>
                    <span className="font-mono text-sm bg-gray-900 px-2 py-1 rounded-md text-gray-300">{adbVersion.buildVersion}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="font-medium text-gray-400">Platform</span>
                    <span className="font-mono text-sm bg-gray-900 px-2 py-1 rounded-md text-gray-300">{adbVersion.platform}</span>
                  </div>

                  <div className="py-2">
                    <span className="font-medium text-gray-400 block mb-2">Install Path</span>
                    <div className="bg-gray-900 p-2 rounded-md border border-gray-700">
                      <span className="font-mono text-xs break-all text-gray-300">{adbVersion.installPath}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quest Info */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-6">
            <h3 className="font-semibold text-white flex items-center space-x-2">
              <Headphones className="w-5 h-5" />
              <span>Quest 3 Device Info</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Model */}
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium">Model</span>
                <span className="font-semibold text-white bg-gray-800 px-3 py-1 rounded-lg shadow-sm mt-1">{questProperties.model || "Unknown"}</span>
              </div>

              {/* Serial */}
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium">Serial</span>
                <span className="font-mono text-sm bg-gray-800 px-3 py-1 rounded-lg shadow-sm border border-gray-700 mt-1">
                  {questProperties.serial_no || "N/A"}
                </span>
              </div>

              {/* Manufacturer */}
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium">Manufacturer</span>
                <span className="font-semibold text-white bg-gray-800 px-3 py-1 rounded-lg shadow-sm mt-1">
                  {questProperties.manufacturer || "Meta"}
                </span>
              </div>

              {/* Software */}
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium">Software</span>
                <span className="font-mono text-sm bg-gray-800 px-3 py-1 rounded-lg shadow-sm border border-gray-700 mt-1">
                  {questProperties.software_version || "Unknown"}
                </span>
              </div>

              {/* Battery */}
              <div className="flex flex-col col-span-2">
                <span className="text-gray-400 font-medium mb-1 flex items-center space-x-2">
                  <Battery className={`w-5 h-5 ${getBatteryIcon(questProperties.battery_level)}`} />
                  <span>Battery Level</span>
                </span>
                <div className={`w-full h-5 rounded-full bg-gray-700 overflow-hidden border border-gray-600`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getBatteryColor(questProperties.battery_level)}`}
                    style={{ width: `${questProperties.battery_level}%` }}
                  />
                </div>
              </div>

              {/* Storage */}
              <div className="flex flex-col col-span-2">
                <span className="text-gray-400 font-medium mb-1 flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-gray-400" />
                  <span>Storage Used</span>
                </span>
                <div className={`w-full h-5 rounded-full bg-gray-700 overflow-hidden border border-gray-600`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getStorageColor(storagePercentage)}`}
                    style={{ width: `${storagePercentage}%` }}
                  />
                </div>
                <div className="text-sm mt-1 text-gray-400">
                  {questProperties.used_space} / {questProperties.total_space} GB ({storagePercentage}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useAdbInitialization } from "../hooks/useAdbInitialization";
import { Server, Monitor, CheckCircle, AlertCircle, Download, Zap } from "lucide-react";
import { InstallAdbWindows } from "../../wailsjs/go/main/App";

export default function AdbCard({ adbStatus, adbPath, setAdbPath }) {
  const { adbVersion } = useAdbInitialization(adbPath);

  const installAdb = async () => {
    const installPath = await InstallAdbWindows();
    setAdbPath(installPath);
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-purple-800 p-6 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/15 rounded-full blur-xl"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-lg border border-white/20">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg">ADB Server</h2>
              <p className="text-blue-300 text-sm opacity-90">Android Debug Bridge</p>
            </div>
          </div>

          {/* Status indicator in header */}
          <div className="flex items-center space-x-2">
            {adbStatus ? (
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            ) : (
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6 text-gray-300">
        {/* Status Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                adbStatus ? "bg-emerald-400 shadow-lg shadow-emerald-400/50" : "bg-red-400 shadow-lg shadow-red-400/50"
              } animate-pulse`}
            ></div>
            <span className={`font-semibold ${adbStatus ? "text-emerald-400" : "text-red-400"}`}>{adbStatus ? "Online" : "Offline"}</span>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-medium ${adbStatus ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`}>
            {adbStatus ? "Connected" : "Disconnected"}
          </div>
        </div>

        {/* Installation Status */}
        <div
          className={`p-4 rounded-xl border-2 ${
            adbPath !== "" ? "bg-emerald-900 border-emerald-700" : "bg-red-900 border-red-700"
          } transition-all duration-200`}
        >
          <div className="flex items-center justify-between">
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
        </div>

        {/* Version Details */}
        {adbPath !== "" && (
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4 text-gray-300">
              <div className="bg-gray-700 p-2 rounded-lg">
                <Monitor className="w-4 h-4 text-gray-400" />
              </div>
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
    </div>
  );
}

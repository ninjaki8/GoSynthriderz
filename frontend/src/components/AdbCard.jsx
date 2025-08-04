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
    <div className="bg-white h-120">
      {/* Compact Header */}
      <div className="h-16 bg-gradient-to-r from-blue-600 to-purple-700 px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-base">ADB Server</h2>
            <p className="text-blue-100 text-xs">Android Debug Bridge</p>
          </div>
        </div>
        {adbStatus ? (
          <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
        ) : (
          <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
        )}
      </div>

      <div className="p-4 space-y-4 text-sm">
        {/* Status Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`w-2.5 h-2.5 rounded-full ${adbStatus ? "bg-emerald-400" : "bg-red-400"} animate-pulse`}></div>
            <span className={`font-medium ${adbStatus ? "text-emerald-600" : "text-red-600"}`}>{adbStatus ? "Online" : "Offline"}</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${adbStatus ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
          >
            {adbStatus ? "Connected" : "Disconnected"}
          </span>
        </div>

        {/* Install Row */}
        <div className={`p-3 rounded-lg border ${adbPath ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {adbPath ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
              <span className={`font-medium ${adbPath ? "text-emerald-700" : "text-red-700"}`}>{adbPath ? "ADB Installed" : "ADB Not Found"}</span>
            </div>
            {!adbPath && (
              <button
                onClick={installAdb}
                className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-xs font-medium hover:from-blue-700 hover:to-purple-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            )}
          </div>
        </div>

        {/* Version Info */}
        {adbPath && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-2">
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">System Info</span>
            </div>

            <div className="grid gap-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-mono">{adbVersion.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Build</span>
                <span className="font-mono">{adbVersion.buildVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform</span>
                <span className="font-mono">{adbVersion.platform}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Install Path</span>
                <span className="font-mono text-[10px] break-all bg-white px-1 py-0.5 rounded border">{adbVersion.installPath}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

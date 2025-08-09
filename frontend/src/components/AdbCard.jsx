import { useAdbInitialization } from "../hooks/useAdbInitialization";
import { Server, Monitor, CheckCircle, AlertCircle } from "lucide-react";

export default function AdbCard({ adbStatus, adbPath }) {
  const { adbVersion } = useAdbInitialization(adbPath);

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-6">
      <h3 className="font-semibold text-white flex items-center space-x-2">
        <Server className={`w-5 h-5 ${adbStatus ? "text-emerald-400" : "text-red-400"}`} />
        <span>ADB Server</span>
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Status */}
        <div className="col-span-2 flex items-center space-x-2">
          {adbStatus ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
          <span className={`font-semibold ${adbStatus ? "text-emerald-400" : "text-red-400"}`}>{adbStatus ? "Online" : "Offline"}</span>
        </div>

        {/* Version Info */}
        {adbPath !== "" && (
          <>
            <div className="col-span-2 flex items-center space-x-2 text-gray-300 mb-2">
              <Monitor className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">System Information</span>
            </div>

            <div className="col-span-1 flex flex-col">
              <span className="text-gray-400 font-medium">Version</span>
              <span className="font-mono text-sm bg-gray-800 px-3 py-1 mt-1 text-gray-300">{adbVersion.version || "N/A"}</span>
            </div>

            <div className="col-span-1 flex flex-col">
              <span className="text-gray-400 font-medium">Build</span>
              <span className="font-mono text-sm bg-gray-800 px-3 py-1 mt-1 text-gray-300">{adbVersion.buildVersion || "N/A"}</span>
            </div>

            <div className="col-span-1 flex flex-col">
              <span className="text-gray-400 font-medium">Platform</span>
              <span className="font-mono text-sm bg-gray-800 px-3 py-1 mt-1 text-gray-300">{adbVersion.platform || "N/A"}</span>
            </div>

            <div className="col-span-1 flex flex-col">
              <span className="text-gray-400 font-medium">Install Path</span>
              <span className="font-mono text-xs bg-gray-800 px-3 py-1 mt-1 text-gray-300 break-all">{adbVersion.installPath || "N/A"}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

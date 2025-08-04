import { useEffect, useState } from "react";
import { RefreshCw, Play, AlertCircle, CheckCircle, Zap, Pause } from "lucide-react";

export default function SyncCard({ adbStatus, questStatus, folderStatus, start, setStart }) {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!start) setIsSyncing(false);
  }, [start]);

  const handleSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setStart(true);
  };

  const allReady = adbStatus && questStatus && folderStatus;
  const readyCount = [adbStatus, questStatus, folderStatus].filter(Boolean).length;

  return (
    <div className="bg-white h-120">
      {/* Header */}
      <div className="h-16 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 px-4 py-3 text-white relative overflow-hidden flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm shadow-lg border border-white/20">
            <RefreshCw className={`w-5 h-5 transition-transform duration-500 ${isSyncing ? "animate-spin" : ""}`} />
          </div>
          <div>
            <h2 className="font-bold text-sm leading-tight">Sync Control</h2>
            <p className="text-orange-100 text-xs opacity-90 leading-tight">CustomSongs Synchronization</p>
          </div>
        </div>

        {/* Status Icon */}
        <div className="flex items-center space-x-2">
          {isSyncing ? (
            <div className="bg-yellow-400/20 p-1.5 rounded-xl backdrop-blur-sm">
              <Zap className="w-4 h-4 text-yellow-200 animate-pulse" />
            </div>
          ) : allReady ? (
            <div className="bg-emerald-400/20 p-1.5 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 text-emerald-200" />
            </div>
          ) : (
            <div className="bg-red-400/20 p-1.5 rounded-xl backdrop-blur-sm">
              <Pause className="w-4 h-4 text-red-200" />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4 space-y-4 text-sm">
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isSyncing
                  ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                  : allReady
                  ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                  : "bg-red-400 shadow-lg shadow-red-400/50"
              } animate-pulse`}
            ></div>
            <span className={`font-semibold ${isSyncing ? "text-yellow-600" : allReady ? "text-emerald-600" : "text-red-600"}`}>
              {isSyncing ? "Syncing" : allReady ? "Ready" : "Not Ready"}
            </span>
          </div>
          <div
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              isSyncing ? "bg-yellow-50 text-yellow-700" : allReady ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
          >
            {readyCount}/3 Systems
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200 text-xs space-y-2">
          <h3 className="font-semibold text-gray-800">System Status</h3>
          {[
            { label: "ADB Server", status: adbStatus, readyText: "Ready", notReadyText: "Not Ready" },
            { label: "Quest Device", status: questStatus, readyText: "Connected", notReadyText: "Disconnected" },
            { label: "Songs Folder", status: folderStatus, readyText: "Found", notReadyText: "Missing" },
          ].map(({ label, status, readyText, notReadyText }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-gray-600">{label}</span>
              <div className="flex items-center space-x-1">
                {status ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                <span className={`font-medium ${status ? "text-emerald-600" : "text-red-600"} text-xs`}>{status ? readyText : notReadyText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sync Description */}
        <div
          className={`p-3 rounded-lg border-2 transition-colors duration-200 text-center text-xs font-medium ${
            isSyncing
              ? "bg-yellow-50 border-yellow-200 text-yellow-700"
              : allReady
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-blue-50 border-blue-200 text-blue-700"
          }`}
        >
          {isSyncing
            ? "🎵 Synchronization in progress..."
            : allReady
            ? "🚀 Ready to sync CustomSongs to Quest 3"
            : "⚠️ Complete system setup to enable sync"}
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={isSyncing || !allReady}
          className={`w-full py-3 rounded-lg font-semibold text-base transition-transform duration-300 ${
            isSyncing || !allReady
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 shadow-md hover:shadow-lg"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {isSyncing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Syncing Songs...</span>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start Synchronization</span>
              </>
            )}
          </div>
        </button>

        {/* Warning Message */}
        {!allReady && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 text-xs">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-semibold">Prerequisites Required</p>
                <p className="text-amber-700 mt-1 leading-tight">
                  Ensure all systems are ready: ADB server online, Quest device connected, and CustomSongs folder accessible before syncing.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

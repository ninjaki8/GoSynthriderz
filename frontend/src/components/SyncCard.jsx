import { useEffect, useState } from "react";
import { RefreshCw, Play, AlertCircle, CheckCircle, Zap, Pause } from "lucide-react";

export default function SyncCard({ adbStatus, questStatus, folderStatus, start, setStart }) {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!start) {
      setIsSyncing(false);
    }
  }, [start]);

  const handleSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setStart(true);
  };

  const allReady = adbStatus && questStatus && folderStatus;
  const readyCount = [adbStatus, questStatus, folderStatus].filter(Boolean).length;

  return (
    <div>
      {/* Body */}
      <div className="flex flex-col gap-4 text-gray-300 flex-grow">
        {/* Status Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isSyncing ? "bg-yellow-500 shadow-yellow-500/50" : allReady ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500 shadow-red-500/50"
              } animate-pulse`}
            ></div>
            <span className={`font-semibold ${isSyncing ? "text-yellow-400" : allReady ? "text-emerald-400" : "text-red-400"}`}>
              {isSyncing ? "Syncing" : allReady ? "Ready" : "Not Ready"}
            </span>
          </div>

          <div
            className={`text-xs font-medium rounded-full px-2 py-0.5 ${
              isSyncing ? "bg-yellow-900 text-yellow-300" : allReady ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"
            }`}
          >
            {readyCount}/3 Systems
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-800 rounded-xl p-3 border border-gray-700 flex flex-col gap-2">
          <h3 className="font-semibold text-gray-300 text-sm">System Status</h3>
          {[
            { label: "ADB Server", status: adbStatus },
            { label: "Quest Device", status: questStatus },
            { label: "Songs Folder", status: folderStatus },
          ].map(({ label, status }) => (
            <div key={label} className="flex items-center justify-between text-sm text-gray-400">
              <span>{label}</span>
              <div className="flex items-center space-x-2">
                {status ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                <span className={`font-medium ${status ? "text-emerald-400" : "text-red-400"}`}>{status ? "Ready" : "Not Ready"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={isSyncing || !allReady}
          className={`w-full rounded-xl font-semibold text-lg ${
            isSyncing || !allReady ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-orange-600 to-red-600 text-white"
          } py-3`}
          style={{ padding: 0 }}
        >
          <div className="flex items-center justify-center space-x-2 h-full w-full py-3">
            {isSyncing ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>Syncing Songs...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                <span>Start Synchronization</span>
              </>
            )}
          </div>
        </button>

        {/* Warning Message */}
        {!allReady && (
          <div className="bg-amber-900 border-2 border-amber-700 rounded-xl p-3 flex items-start space-x-3 text-amber-300 text-sm">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-400" />
            <div>
              <p className="font-medium">Prerequisites</p>
              <p className="mt-1 text-amber-400">
                Ensure all systems are ready: ADB server must be online, Quest device connected, and CustomSongs folder accessible before starting
                synchronization.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

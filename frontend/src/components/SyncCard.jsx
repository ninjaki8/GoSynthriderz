import { useState } from "react";
import { RefreshCw, Play, AlertCircle } from "lucide-react";

export default function SyncCard({ adbStatus, questStatus, folderStatus }) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    setIsSyncing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <RefreshCw className={`w-6 h-6 ${isSyncing ? "animate-spin" : ""}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Sync Control</h2>
              <p className="text-orange-100 text-sm">CustomSongs Synchronization</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{isSyncing ? "Synchronization in progress..." : "Ready to sync CustomSongs to Quest 3"}</p>
            <button
              onClick={handleSync}
              disabled={isSyncing || !adbStatus || !questStatus || !folderStatus}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                isSyncing || !adbStatus || !questStatus || !folderStatus
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105"
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-5 h-5 inline mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 inline mr-2" />
                  Start Sync
                </>
              )}
            </button>
          </div>
          {(!adbStatus || !questStatus || !folderStatus) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Please ensure ADB server, Quest 3, and CustomSongs folder are all ready before syncing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

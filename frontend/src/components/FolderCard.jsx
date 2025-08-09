import { useState } from "react";
import { FolderOpen, FolderX, RefreshCw, CheckCircle, AlertCircle, Music, Clock } from "lucide-react";

export default function FolderCard({ folderStatus, folderData, checkFolder }) {
  const [loading, setLoading] = useState(false);

  const refreshFolder = async () => {
    setLoading(true);
    try {
      await checkFolder();
    } finally {
      setLoading(false);
    }
  };

  // Helper component for consistent item display
  const InfoBlock = ({ icon: Icon, label, children }) => (
    <div>
      <div className="flex items-center space-x-2 mb-1">
        <Icon className="w-4 h-4 text-emerald-400" />
        <span className="font-medium text-gray-300">{label}</span>
      </div>
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-sm font-mono text-xs text-gray-400 break-all">{children}</div>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-6">
      <h3 className="font-semibold text-white flex items-center space-x-2">
        {folderStatus ? <FolderOpen className="w-5 h-5 text-emerald-400" /> : <FolderX className="w-5 h-5 text-red-400" />}
        <span>Custom Songs</span>
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Status */}
        <div className="col-span-2 flex items-center space-x-2">
          {folderStatus ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
          <span className={`font-semibold ${folderStatus ? "text-emerald-400" : "text-red-400"}`}>
            {folderStatus ? "Directory Found" : "Directory Missing"}
          </span>
        </div>

        {/* Status description */}
        {!folderStatus && (
          <p className="col-span-2 text-red-400 text-sm">Please ensure your Quest device has the CustomSongs directory accessible.</p>
        )}

        {/* Folder Details Container */}
        {folderStatus && folderData && (
          <div className="col-span-2 space-y-4">
            <InfoBlock icon={Music} label="Beatmap Files">
              {folderData.fileCount != null ? folderData.fileCount : "N/A"}
            </InfoBlock>

            <InfoBlock icon={FolderOpen} label="Directory Path">
              {folderData.path || "N/A"}
            </InfoBlock>

            <InfoBlock icon={Clock} label="Last Checked">
              {folderData.lastChecked || "Never"}
            </InfoBlock>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={refreshFolder}
        disabled={loading}
        className={`w-full bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform duration-200 cursor-pointer ${
          loading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>{loading ? "Refreshing..." : "Refresh Directory"}</span>
        </div>
      </button>
    </div>
  );
}

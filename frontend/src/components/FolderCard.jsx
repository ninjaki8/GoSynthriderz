import { FolderOpen, FolderX, RefreshCw, CheckCircle, AlertCircle, Music, Clock, HardDrive } from "lucide-react";

export default function FolderCard({ folderStatus, folderData }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-6 w-120">
      <h3 className="font-semibold text-white flex items-center space-x-2">
        {folderStatus ? (
          <FolderOpen className="w-5 h-5 text-emerald-400" />
        ) : (
          <FolderX className="w-5 h-5 text-red-400" />
        )}
        <span>Folder Check</span>
      </h3>

      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                folderStatus ? "bg-emerald-400 shadow-lg shadow-emerald-400/50" : "bg-red-400 shadow-lg shadow-red-400/50"
              } animate-pulse`}
            />
            <span className={`font-semibold ${folderStatus ? "text-emerald-400" : "text-red-400"}`}>
              {folderStatus ? "Directory Found" : "Directory Missing"}
            </span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              folderStatus ? "bg-emerald-900 text-emerald-400" : "bg-red-900 text-red-400"
            }`}
          >
            {folderStatus ? "Accessible" : "Not Found"}
          </div>
        </div>

        {/* Folder Status Card */}
        <div
          className={`p-4 rounded-xl border-2 ${
            folderStatus ? "bg-emerald-900 border-emerald-700" : "bg-red-900 border-red-700"
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            {folderStatus ? (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={`font-semibold ${folderStatus ? "text-emerald-400" : "text-red-400"}`}>
              {folderStatus ? "CustomSongs Folder Found" : "CustomSongs Folder Not Found"}
            </span>
          </div>

          {!folderStatus && (
            <p className="text-red-400 text-sm">
              Please ensure your Quest device has the CustomSongs directory accessible.
            </p>
          )}
        </div>

        {/* Folder Details */}
        {folderStatus && folderData && (
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
            <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>Directory Information</span>
            </h4>

            <div className="space-y-3">
              {/* File Count */}
              <div className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Music className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-gray-300">Song Files</span>
                </div>
                <span className="text-2xl font-bold text-emerald-400">{folderData.fileCount || 0}</span>
              </div>

              {/* Path */}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <FolderOpen className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-gray-300">Directory Path</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-sm break-all font-mono text-xs text-gray-400">
                  {folderData.path || "N/A"}
                </div>
              </div>

              {/* Last Checked */}
              <div className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-gray-300">Last Checked</span>
                </div>
                <span className="text-sm font-medium text-emerald-400 bg-emerald-900 px-2 py-1 rounded-md">
                  {folderData.lastChecked || "Never"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button className="w-full bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform duration-200 transform hover:scale-105">
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Directory</span>
        </div>
      </button>
    </div>
  );
}

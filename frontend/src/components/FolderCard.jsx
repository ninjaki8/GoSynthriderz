import { FolderOpen, FolderX, RefreshCw, CheckCircle, AlertCircle, Music, Clock, HardDrive } from "lucide-react";

export default function FolderCard({ folderStatus, folderData }) {
  return (
    <div className="bg-white h-120">
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-green-600 to-teal-700 px-4 py-3 text-white relative flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/20">
            {folderStatus ? <FolderOpen className="w-5 h-5" /> : <FolderX className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="font-bold text-sm">Folder Check</h2>
            <p className="text-green-100 text-xs opacity-80">CustomSongs Directory</p>
          </div>
        </div>
        {folderStatus ? <CheckCircle className="w-4 h-4 text-emerald-200" /> : <AlertCircle className="w-4 h-4 text-red-200" />}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Status */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                folderStatus ? "bg-emerald-400 shadow shadow-emerald-400/50" : "bg-red-400 shadow shadow-red-400/50"
              } animate-pulse`}
            ></div>
            <span className={`font-semibold ${folderStatus ? "text-emerald-600" : "text-red-600"}`}>
              {folderStatus ? "Directory Found" : "Directory Missing"}
            </span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              folderStatus ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
          >
            {folderStatus ? "Accessible" : "Not Found"}
          </span>
        </div>

        {/* Folder Status */}
        <div
          className={`p-2 rounded-lg border text-xs flex items-center space-x-2 ${
            folderStatus ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
          }`}
        >
          {folderStatus ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span className={`font-semibold ${folderStatus ? "text-emerald-700" : "text-red-700"}`}>
            {folderStatus ? "Folder Found" : "Folder Missing"}
          </span>
        </div>

        {/* Folder Details */}
        {folderStatus && folderData && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-200 text-xs space-y-2">
            <div className="flex items-center space-x-1 font-semibold text-emerald-800">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Directory Info</span>
            </div>

            <div className="flex items-center justify-between bg-white rounded-md p-2 shadow-sm">
              <div className="flex items-center space-x-1">
                <Music className="w-3.5 h-3.5 text-emerald-600" />
                <span>Beatmaps</span>
              </div>
              <span className="text-lg font-bold text-emerald-600">{folderData.fileCount || 0}</span>
            </div>

            <div>
              <div className="flex items-center space-x-1 mb-1">
                <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Directory Path</span>
              </div>
              <div className="bg-white p-2 rounded-md border shadow-sm font-mono text-[10px] text-gray-700 break-all">{folderData.path || "N/A"}</div>
            </div>

            <div className="flex items-center justify-between bg-white rounded-md p-2 shadow-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Last Checked</span>
              </div>
              <span className="text-[10px] font-medium text-gray-700 bg-emerald-50 px-1.5 py-0.5 rounded">{folderData.lastChecked || "Never"}</span>
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-2 px-3 rounded-lg text-xs transition-all duration-200 transform hover:scale-105 shadow">
          <div className="flex items-center justify-center space-x-1">
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
            <span>Refresh</span>
          </div>
        </button>
      </div>
    </div>
  );
}

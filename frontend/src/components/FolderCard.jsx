import { FolderOpen, FolderX, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function FolderCard({ folderStatus, folderData }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              {folderStatus ? <FolderOpen className="w-6 h-6" /> : <FolderX className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">Folder Check</h2>
              <p className="text-green-100 text-sm">CustomSongs Directory</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {folderStatus ? <CheckCircle className="w-5 h-5 text-green-200" /> : <AlertCircle className="w-5 h-5 text-red-200" />}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {folderStatus ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
            <span className={`font-semibold ${folderStatus ? "text-green-600" : "text-red-600"}`}>
              {folderStatus ? "CustomSongs Folder Found" : "CustomSongs Folder Not Found"}
            </span>
          </div>
          {folderStatus && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Files:</span> {folderData.fileCount} songs
                </div>
                <div className="text-gray-600 break-all">
                  <span className="font-medium">Path:</span> {folderData.path}
                </div>
                <div>
                  <span className="font-medium">Last Checked:</span> {folderData.lastChecked}
                </div>
              </div>
            </div>
          )}
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Refresh Check
          </button>
        </div>
      </div>
    </div>
  );
}

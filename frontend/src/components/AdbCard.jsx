import { useState } from "react";
import { useAdbInitialization } from "../hooks/useAdbInitialization";
import { Server, Wifi, WifiOff, ChevronDown, ChevronUp, Monitor } from "lucide-react";

export default function AdbCard({ adbPath }) {
  const [isAdbExpanded, setIsAdbExpanded] = useState(false);
  const { adbVersion, adbStatus } = useAdbInitialization(adbPath);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ADB Server</h2>
              <p className="text-blue-100 text-sm">Android Debug Bridge</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${adbStatus ? "bg-green-400" : "bg-red-400"} animate-pulse`}></div>
            <span className="text-sm font-medium">{adbStatus ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {adbStatus ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
            <span className={`font-semibold ${adbStatus ? "text-green-600" : "text-red-600"}`}>{adbStatus ? "Connected" : "Disconnected"}</span>
          </div>
          <button
            onClick={() => setAdbStatus(!adbStatus)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              adbStatus ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {adbStatus ? "Disconnect" : "Connect"}
          </button>
        </div>
        <div className="border-t pt-4">
          <button
            onClick={() => setIsAdbExpanded(!isAdbExpanded)}
            className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span className="font-medium">Version Information</span>
            {isAdbExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {isAdbExpanded && (
            <div className="mt-4 space-y-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Monitor className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Version Details</span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div>
                    <span className="font-medium">ADB Version:</span> {adbVersion.version}
                  </div>
                  <div>
                    <span className="font-medium">Build:</span> {adbVersion.buildVersion}
                  </div>
                  <div>
                    <span className="font-medium">Platform:</span> {adbVersion.platform}
                  </div>
                  <div className="break-all">
                    <span className="font-medium">Path:</span> {adbVersion.installPath}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

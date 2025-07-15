import { useState } from "react";
import { ChevronDown, ChevronUp, Headphones } from "lucide-react";

export default function QuestCard() {
  const [questStatus, setQuestStatus] = useState(true);
  const [isQuestExpanded, setIsQuestExpanded] = useState(false);

  const questData = {
    model: "Quest_3",
    serial: "2G0YC1ZF8T0F3J",
    firmware: "v60.0.0.174.425.342342342",
    batteryLevel: 78,
    storageUsed: "45.2 GB",
    storageTotal: "128 GB",
  };
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Quest 3</h2>
              <p className="text-purple-100 text-sm">VR Headset</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${questStatus ? "bg-green-400" : "bg-red-400"} animate-pulse`}></div>
            <span className="text-sm font-medium">{questStatus ? "Connected" : "Disconnected"}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Model:</span>
            <span className="font-medium">{questData.model}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Serial:</span>
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{questData.serial}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Battery:</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${questData.batteryLevel}%` }}></div>
              </div>
              <span className="text-sm font-medium">{questData.batteryLevel}%</span>
            </div>
          </div>
        </div>
        <div className="border-t pt-4 mt-4">
          <button
            onClick={() => setIsQuestExpanded(!isQuestExpanded)}
            className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900 transition-colors"
          >
            <span className="font-medium">Device Details</span>
            {isQuestExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {isQuestExpanded && (
            <div className="mt-4 space-y-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div>
                  <span className="font-medium">Firmware:</span> {questData.firmware}
                </div>
                <div>
                  <span className="font-medium">Storage:</span> {questData.storageUsed} / {questData.storageTotal}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

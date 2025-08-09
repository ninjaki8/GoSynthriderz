import { AlertCircle, Battery, CheckCircle, HardDrive, RectangleGoggles } from "lucide-react";

export default function QuestCard({ questStatus, questProperties }) {
  const getBatteryColor = (level) => {
    if (level > 60) return "from-emerald-500 to-emerald-600";
    if (level > 30) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getPercentIconColor = (level) => {
    if (level > 20) return "text-emerald-400";
    return "text-red-400";
  };

  const getStoragePercentage = () => {
    const used = parseFloat(questProperties.used_space) || 0;
    const total = parseFloat(questProperties.total_space) || 1;
    return Math.round((used / total) * 100);
  };

  const getStorageColor = (percentage) => {
    if (percentage < 70) return "from-blue-500 to-blue-600";
    if (percentage < 85) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const storagePercentage = getStoragePercentage();

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-6">
      <h3 className="font-semibold text-white flex items-center space-x-2">
        <RectangleGoggles className={`w-5 h-5 ${questStatus ? "text-emerald-400" : "text-red-400"}`} />
        <span>Device Info</span>
      </h3>

      {/* Status */}
      <div className="col-span-2 flex items-center space-x-2">
        {questStatus ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
        <span className={`font-semibold ${questStatus ? "text-emerald-400" : "text-red-400"}`}>{questStatus ? "Connected" : "Not Connected"}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Model */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Model</span>
          <span className="font-semibold text-white bg-gray-800 px-3 py-1 mt-1">{questProperties.model || "Unknown"}</span>
        </div>

        {/* Serial */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Serial</span>
          <span className="font-mono text-sm bg-gray-800 px-3 py-1 mt-1">{questProperties.serial_no || "N/A"}</span>
        </div>

        {/* Manufacturer */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Manufacturer</span>
          <span className="font-semibold text-white bg-gray-800 px-3 py-1 mt-1">{questProperties.manufacturer || "Meta"}</span>
        </div>

        {/* Build Date */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Build Date</span>
          <span className="font-mono text-sm bg-gray-800 px-3 py-1 mt-1">{questProperties.build_date || "Unknown"}</span>
        </div>

        {/* Battery */}
        <div className="flex flex-col col-span-2 my-5">
          <div className="grid grid-cols-2 items-center mb-1">
            <span className="text-gray-400 font-medium flex items-center space-x-2">
              <Battery className={`w-5 h-5 ${getPercentIconColor(questProperties.battery_level)}`} />
              <span>Battery Level</span>
            </span>
            <span className="text-sm text-gray-400 text-right">{questProperties.battery_level}%</span>
          </div>
          <div className="w-full h-5 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getBatteryColor(questProperties.battery_level)}`}
              style={{ width: `${questProperties.battery_level}%` }}
            />
          </div>
        </div>

        {/* Storage */}
        <div className="flex flex-col col-span-2">
          <div className="grid grid-cols-2 items-center mb-1">
            <span className="text-gray-400 font-medium flex items-center space-x-2">
              <HardDrive className={`w-5 h-5 ${getPercentIconColor(storagePercentage)}`} />
              <span>Storage Used</span>
            </span>
            <span className="text-sm text-gray-400 text-right">
              {questProperties.used_space} / {questProperties.total_space} GB ({storagePercentage}%)
            </span>
          </div>
          <div className="w-full h-5 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getStorageColor(storagePercentage)}`}
              style={{ width: `${storagePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

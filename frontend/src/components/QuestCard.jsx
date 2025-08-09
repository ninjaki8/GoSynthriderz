import { Headphones, Battery, HardDrive } from "lucide-react";

export default function QuestCard({ questProperties }) {
  const getBatteryColor = (level) => {
    if (level > 60) return "from-emerald-500 to-emerald-600";
    if (level > 30) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getBatteryIcon = (level) => {
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
        <Headphones className="w-5 h-5" />
        <span>Quest 3 Device Info</span>
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Model */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Model</span>
          <span className="font-semibold text-white bg-gray-800 px-3 py-1 rounded-lg shadow-sm mt-1">{questProperties.model || "Unknown"}</span>
        </div>

        {/* Serial */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Serial</span>
          <span className="font-mono text-sm bg-gray-800 px-3 py-1 rounded-lg shadow-sm border border-gray-700 mt-1">
            {questProperties.serial_no || "N/A"}
          </span>
        </div>

        {/* Manufacturer */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Manufacturer</span>
          <span className="font-semibold text-white bg-gray-800 px-3 py-1 rounded-lg shadow-sm mt-1">{questProperties.manufacturer || "Meta"}</span>
        </div>

        {/* Software */}
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium">Software</span>
          <span className="font-mono text-sm bg-gray-800 px-3 py-1 rounded-lg shadow-sm border border-gray-700 mt-1">
            {questProperties.software_version || "Unknown"}
          </span>
        </div>

        {/* Battery */}
        <div className="flex flex-col col-span-2">
          <span className="text-gray-400 font-medium mb-1 flex items-center space-x-2">
            <Battery className={`w-5 h-5 ${getBatteryIcon(questProperties.battery_level)}`} />
            <span>Battery Level</span>
          </span>
          <div className={`w-full h-5 rounded-full bg-gray-700 overflow-hidden border border-gray-600`}>
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getBatteryColor(questProperties.battery_level)}`}
              style={{ width: `${questProperties.battery_level}%` }}
            />
          </div>
        </div>

        {/* Storage */}
        <div className="flex flex-col col-span-2">
          <span className="text-gray-400 font-medium mb-1 flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-gray-400" />
            <span>Storage Used</span>
          </span>
          <div className={`w-full h-5 rounded-full bg-gray-700 overflow-hidden border border-gray-600`}>
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getStorageColor(storagePercentage)}`}
              style={{ width: `${storagePercentage}%` }}
            />
          </div>
          <div className="text-sm mt-1 text-gray-400">
            {questProperties.used_space} / {questProperties.total_space} GB ({storagePercentage}%)
          </div>
        </div>
      </div>
    </div>
  );
}

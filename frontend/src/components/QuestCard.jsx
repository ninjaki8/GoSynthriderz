import { Headphones, Wifi, Battery, HardDrive } from "lucide-react";

export default function QuestCard({ questStatus, questProperties }) {
  const getBatteryColor = (level) =>
    level > 60 ? "from-emerald-400 to-emerald-500" : level > 30 ? "from-yellow-400 to-yellow-500" : "from-red-400 to-red-500";
  const getBatteryIcon = (level) => (level > 20 ? "text-emerald-600" : "text-red-600");

  const used = parseFloat(questProperties.used_space) || 0;
  const total = parseFloat(questProperties.total_space) || 1;
  const storagePercentage = Math.round((used / total) * 100);
  const getStorageColor = (p) => (p < 70 ? "from-blue-400 to-blue-500" : p < 85 ? "from-yellow-400 to-yellow-500" : "from-red-400 to-red-500");

  return (
    <div className="bg-white h-120">
      {/* Compact Header */}
      <div className="h-16 bg-gradient-to-r from-purple-600 to-pink-700 px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base leading-tight">Quest 3</h2>
            <p className="text-purple-100 text-xs opacity-90">VR Headset</p>
          </div>
        </div>
        {questStatus ? (
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4 text-emerald-300" />
            <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse shadow shadow-emerald-300/50"></div>
          </div>
        ) : (
          <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3 text-sm">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                questStatus ? "bg-emerald-400 shadow shadow-emerald-400/50" : "bg-red-400 shadow shadow-red-400/50"
              } animate-pulse`}
            ></div>
            <span className={`font-semibold ${questStatus ? "text-emerald-600" : "text-red-600"}`}>
              {questStatus ? "USB Connected" : "Disconnected"}
            </span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              questStatus ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
          >
            {questStatus ? "Online" : "Offline"}
          </span>
        </div>

        {/* Device Info */}
        <div className="grid gap-2">
          <InfoRow label="Model" value={questProperties.model || "Unknown"} />
          <InfoRow label="Serial" value={questProperties.serial_no || "N/A"} mono />

          {/* Battery */}
          <ProgressCard
            icon={<Battery className={`w-4 h-4 ${getBatteryIcon(questProperties.battery_level)}`} />}
            label="Battery"
            value={`${questProperties.battery_level || 0}%`}
            percentage={questProperties.battery_level || 0}
            gradient={getBatteryColor(questProperties.battery_level)}
          />

          {/* Storage */}
          <ProgressCard
            icon={<HardDrive className="w-4 h-4 text-blue-600" />}
            label="Storage"
            value={`${storagePercentage}%`}
            subValue={`${questProperties.used_space || "0 GB"} / ${questProperties.total_space || "0 GB"}`}
            percentage={storagePercentage}
            gradient={getStorageColor(storagePercentage)}
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className={`px-2 py-0.5 rounded bg-white shadow-sm ${mono ? "font-mono text-xs border" : "font-semibold text-gray-900"}`}>{value}</span>
    </div>
  );
}

function ProgressCard({ icon, label, value, subValue, percentage, gradient }) {
  return (
    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-gray-600 font-medium">{label}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">{value}</div>
          {subValue && <div className="text-[10px] text-gray-500 font-mono">{subValue}</div>}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner relative overflow-hidden">
        <div className={`bg-gradient-to-r ${gradient} h-2 rounded-full transition-all duration-500 shadow-sm`} style={{ width: `${percentage}%` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

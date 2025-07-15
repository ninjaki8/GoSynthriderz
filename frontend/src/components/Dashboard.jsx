import { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  ChevronDown, 
  ChevronUp, 
  Monitor,
  Headphones,
  FolderOpen,
  FolderX,
  RefreshCw,
  Play,
  CheckCircle,
  AlertCircle,
  Terminal
} from 'lucide-react';

export default function Dashboard() {
  const [adbStatus, setAdbStatus] = useState(true);
  const [questStatus, setQuestStatus] = useState(true);
  const [folderStatus, setFolderStatus] = useState(true);
  const [isAdbExpanded, setIsAdbExpanded] = useState(false);
  const [isQuestExpanded, setIsQuestExpanded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const terminalRef = useRef(null);

  // Mock data
  const adbVersionData = {
    version: "1.0.41",
    buildVersion: "36.0.0-13206524",
    installPath: "C:\\Users\\ninjaki8\\AppData\\Local\\Android\\platform-tools\\adb.exe",
    platform: "Windows 10.0.19045"
  };

  const questData = {
    model: "Quest_3",
    serial: "2G0YC1ZF8T0F3J",
    firmware: "v60.0.0.174.425.342342342",
    batteryLevel: 78,
    storageUsed: "45.2 GB",
    storageTotal: "128 GB"
  };

  const folderData = {
    name: "CustomSongs",
    path: "/sdcard/Android/data/com.beatgames.beatsaber/files/songs",
    lastChecked: new Date().toLocaleTimeString(),
    fileCount: 247
  };

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const addToTerminal = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalOutput(prev => [...prev, { text, type, timestamp }]);
  };

  const handleSync = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setTerminalOutput([]);
    
    // Simulate sync process
    const syncSteps = [
      { text: "Initializing sync process...", delay: 500 },
      { text: "Checking ADB connection...", delay: 800 },
      { text: "✓ ADB server is running", delay: 600, type: 'success' },
      { text: "Detecting Quest 3 device...", delay: 1000 },
      { text: "✓ Quest 3 device found: 2G0YC1ZF8T0F3J", delay: 700, type: 'success' },
      { text: "Scanning CustomSongs folder...", delay: 900 },
      { text: "✓ Found 247 custom songs", delay: 600, type: 'success' },
      { text: "Starting file synchronization...", delay: 800 },
      { text: "Copying song files to device...", delay: 1200 },
      { text: "Progress: 25%", delay: 800 },
      { text: "Progress: 50%", delay: 800 },
      { text: "Progress: 75%", delay: 800 },
      { text: "Progress: 100%", delay: 800 },
      { text: "✓ Sync completed successfully!", delay: 600, type: 'success' },
      { text: "247 songs synchronized to Quest 3", delay: 400, type: 'info' }
    ];

    for (const step of syncSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      addToTerminal(step.text, step.type || 'info');
    }
    
    setIsSyncing(false);
  };

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  // ADB Server Card
  const ADBCard = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ADB Server</h2>
              <p className="text-blue-100 text-sm">Android Debug Bridge</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${adbStatus ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span className="text-sm font-medium">
              {adbStatus ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {adbStatus ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-semibold ${adbStatus ? 'text-green-600' : 'text-red-600'}`}>
              {adbStatus ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <button
            onClick={() => setAdbStatus(!adbStatus)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              adbStatus 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {adbStatus ? 'Disconnect' : 'Connect'}
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
                  <div><span className="font-medium">ADB Version:</span> {adbVersionData.version}</div>
                  <div><span className="font-medium">Build:</span> {adbVersionData.buildVersion}</div>
                  <div><span className="font-medium">Platform:</span> {adbVersionData.platform}</div>
                  <div className="break-all"><span className="font-medium">Path:</span> {adbVersionData.installPath}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Quest 3 Device Card
  const QuestCard = () => (
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
            <div className={`w-3 h-3 rounded-full ${questStatus ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span className="text-sm font-medium">
              {questStatus ? 'Connected' : 'Disconnected'}
            </span>
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
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${questData.batteryLevel}%` }}
                ></div>
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
                <div><span className="font-medium">Firmware:</span> {questData.firmware}</div>
                <div><span className="font-medium">Storage:</span> {questData.storageUsed} / {questData.storageTotal}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Folder Check Card
  const FolderCard = () => (
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
            {folderStatus ? (
              <CheckCircle className="w-5 h-5 text-green-200" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-200" />
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {folderStatus ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-semibold ${folderStatus ? 'text-green-600' : 'text-red-600'}`}>
              {folderStatus ? 'CustomSongs Folder Found' : 'CustomSongs Folder Not Found'}
            </span>
          </div>
          {folderStatus && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Files:</span> {folderData.fileCount} songs</div>
                <div className="text-gray-600 break-all"><span className="font-medium">Path:</span> {folderData.path}</div>
                <div><span className="font-medium">Last Checked:</span> {folderData.lastChecked}</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setFolderStatus(!folderStatus)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Refresh Check
          </button>
        </div>
      </div>
    </div>
  );

  // Sync Button Card
  const SyncCard = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <RefreshCw className={`w-6 h-6 ${isSyncing ? 'animate-spin' : ''}`} />
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
            <p className="text-gray-600 mb-4">
              {isSyncing ? 'Synchronization in progress...' : 'Ready to sync CustomSongs to Quest 3'}
            </p>
            <button
              onClick={handleSync}
              disabled={isSyncing || !adbStatus || !questStatus || !folderStatus}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                isSyncing || !adbStatus || !questStatus || !folderStatus
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105'
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VR Development Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your Quest 3 development environment</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ADBCard />
          <QuestCard />
          <FolderCard />
          <SyncCard />
        </div>

        {/* Terminal Output */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-gray-300" />
              <h3 className="text-white font-medium">Terminal Output</h3>
            </div>
            <button
              onClick={clearTerminal}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Clear
            </button>
          </div>
          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto p-6 font-mono text-sm"
          >
            {terminalOutput.length === 0 ? (
              <div className="text-gray-500 italic">Terminal output will appear here...</div>
            ) : (
              terminalOutput.map((line, index) => (
                <div key={index} className="mb-2">
                  <span className="text-gray-500 mr-3">[{line.timestamp}]</span>
                  <span className={
                    line.type === 'success' ? 'text-green-400' :
                    line.type === 'error' ? 'text-red-400' :
                    'text-gray-300'
                  }>
                    {line.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
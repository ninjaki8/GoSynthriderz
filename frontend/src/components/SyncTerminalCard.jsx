import { useEffect, useState, useRef } from "react";
import { RefreshCw, Play, AlertCircle, CheckCircle, Zap, Pause, Terminal, X, Copy, Check, Minimize2, Maximize2 } from "lucide-react";

export default function SyncTerminalCard({ adbStatus, questStatus, folderStatus, start, setStart, terminalOutput, setTerminalOutput }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!start) {
      setIsSyncing(false);
    }
  }, [start]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current && !isTerminalMinimized) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput, isTerminalMinimized]);

  const handleSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setStart(true);
  };

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  const copyToClipboard = async () => {
    const text = terminalOutput.map((line) => `[${line.timestamp}] ${line.text}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleTerminal = () => {
    setIsTerminalMinimized(!isTerminalMinimized);
  };

  const allReady = adbStatus && questStatus && folderStatus;
  const readyCount = [adbStatus, questStatus, folderStatus].filter(Boolean).length;

  return (
    <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Sync Control Header */}
      <div className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 p-6 text-white relative overflow-hidden flex-shrink-0">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-lg border border-white/20">
              <RefreshCw className={`w-6 h-6 transition-transform duration-500 ${isSyncing ? "animate-spin" : ""}`} />
            </div>
            <div>
              <h2 className="font-bold text-xl">Sync Control Center</h2>
              <p className="text-orange-100 text-sm opacity-90">CustomSongs Synchronization & Monitoring</p>
            </div>
          </div>

          {/* Status indicator in header */}
          <div className="flex items-center space-x-4">
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm ${
                isSyncing ? "text-yellow-200" : allReady ? "text-emerald-200" : "text-red-200"
              }`}
            >
              {readyCount}/3 Systems Ready
            </div>

            {isSyncing ? (
              <div className="bg-yellow-400/20 p-2 rounded-xl backdrop-blur-sm">
                <Zap className="w-5 h-5 text-yellow-200 animate-pulse" />
              </div>
            ) : allReady ? (
              <div className="bg-emerald-400/20 p-2 rounded-xl backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-emerald-200" />
              </div>
            ) : (
              <div className="bg-red-400/20 p-2 rounded-xl backdrop-blur-sm">
                <Pause className="w-5 h-5 text-red-200" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sync Control Body */}
      <div className="p-6 flex-shrink-0 space-y-6">
        {/* Prerequisites Status Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              adbStatus ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${adbStatus ? "bg-emerald-400" : "bg-red-400"} animate-pulse`}></div>
              <span className={`font-semibold text-sm ${adbStatus ? "text-emerald-700" : "text-red-700"}`}>ADB Server</span>
            </div>
            <p className={`text-xs mt-1 ${adbStatus ? "text-emerald-600" : "text-red-600"}`}>{adbStatus ? "Online & Ready" : "Offline"}</p>
          </div>

          <div
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              questStatus ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${questStatus ? "bg-emerald-400" : "bg-red-400"} animate-pulse`}></div>
              <span className={`font-semibold text-sm ${questStatus ? "text-emerald-700" : "text-red-700"}`}>Quest Device</span>
            </div>
            <p className={`text-xs mt-1 ${questStatus ? "text-emerald-600" : "text-red-600"}`}>{questStatus ? "Connected" : "Disconnected"}</p>
          </div>

          <div
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              folderStatus ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${folderStatus ? "bg-emerald-400" : "bg-red-400"} animate-pulse`}></div>
              <span className={`font-semibold text-sm ${folderStatus ? "text-emerald-700" : "text-red-700"}`}>Songs Folder</span>
            </div>
            <p className={`text-xs mt-1 ${folderStatus ? "text-emerald-600" : "text-red-600"}`}>{folderStatus ? "Found" : "Missing"}</p>
          </div>
        </div>

        {/* Sync Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleSync}
            disabled={isSyncing || !allReady}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
              isSyncing || !allReady
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 shadow-lg hover:shadow-xl"
            }`}
          >
            <div className="flex items-center space-x-3">
              {isSyncing ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span>Syncing Songs...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  <span>Start Synchronization</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Warning Message */}
        {!allReady && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-medium text-sm">Prerequisites Required</p>
                <p className="text-amber-700 text-sm mt-1">Complete the setup in the cards above before starting synchronization.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Terminal */}
      <div className="flex-1 min-h-0 border-t border-gray-200">
        <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-b-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-gray-800 via-gray-750 to-gray-800 px-6 py-3 border-b border-gray-700 relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700/50 p-2 rounded-xl backdrop-blur-sm border border-gray-600/50">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="flex items-center space-x-3">
                  <h3 className="text-white font-semibold">Live Output</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <span className="text-emerald-400 text-sm font-medium">Monitoring</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Traffic Light Buttons */}
                <div className="flex items-center space-x-2 mr-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/30"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/30"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/30"></div>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
                  title="Copy output"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" />}
                </button>

                <button
                  onClick={toggleTerminal}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
                  title={isTerminalMinimized ? "Maximize" : "Minimize"}
                >
                  {isTerminalMinimized ? (
                    <Maximize2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Minimize2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  )}
                </button>

                <button
                  onClick={clearTerminal}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                  title="Clear terminal"
                >
                  <X className="w-3 h-3 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className={`transition-all duration-300 ${isTerminalMinimized ? "h-0 opacity-0" : "flex-1 opacity-100"}`}>
            <div className="relative h-full">
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20"></div>
              </div>

              <div ref={terminalRef} className="relative h-full overflow-y-auto p-4 font-mono text-xs transition-all duration-300">
                {terminalOutput.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700">
                        <Terminal className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="text-gray-500 text-sm">Sync output will appear here...</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {terminalOutput.map((line, index) => (
                      <div key={index} className="group hover:bg-gray-800/30 px-2 py-1 rounded-md transition-colors duration-150">
                        <div className="flex items-start space-x-3">
                          <span className="text-gray-500 text-xs font-medium bg-gray-800/50 px-2 py-0.5 rounded-md border border-gray-700/50 flex-shrink-0">
                            {line.timestamp}
                          </span>

                          <div
                            className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                              line.type === "success"
                                ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                                : line.type === "error"
                                ? "bg-red-400 shadow-lg shadow-red-400/50"
                                : line.type === "warning"
                                ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                                : "bg-blue-400 shadow-lg shadow-blue-400/50"
                            }`}
                          ></div>

                          <span
                            className={`flex-1 leading-relaxed ${
                              line.type === "success"
                                ? "text-emerald-400"
                                : line.type === "error"
                                ? "text-red-400"
                                : line.type === "warning"
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            {line.text}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center space-x-2 mt-4 text-gray-500">
                      <span className="text-emerald-400">$</span>
                      <div className="w-2 h-3 bg-emerald-400 animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

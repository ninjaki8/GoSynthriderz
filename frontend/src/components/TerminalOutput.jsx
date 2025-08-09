import { useEffect, useRef, useState } from "react";
import { Terminal, X, Minimize2, Maximize2, Copy, Check } from "lucide-react";

export default function TerminalOutput({ terminalOutput, setTerminalOutput }) {
  const terminalRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current && !isMinimized) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput, isMinimized]);

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

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700 hover:shadow-3xl transition-all duration-300">
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-750 to-gray-800 px-6 py-4 border-b border-gray-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Terminal Icon */}
            <div className="bg-gray-700/50 p-2 rounded-xl backdrop-blur-sm border border-gray-600/50">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Title and Status */}
            <div className="flex items-center space-x-3">
              <h3 className="text-white font-semibold text-lg">Terminal Output</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                <span className="text-emerald-400 text-sm font-medium">Live</span>
              </div>
            </div>
          </div>

          {/* Terminal Controls */}
          <div className="flex items-center space-x-2">
            {/* Traffic Light Buttons */}
            <div className="flex items-center space-x-2 mr-4">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/30"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/30"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/30"></div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
              title="Copy output"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />}
            </button>

            <button
              onClick={toggleMinimize}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              ) : (
                <Minimize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              )}
            </button>

            <button
              onClick={clearTerminal}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
              title="Clear terminal"
            >
              <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className={`transition-all duration-300 ${isMinimized ? "h-0 opacity-0" : "opacity-100"}`}>
        <div className="relative">
          {/* Terminal Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20"></div>
          </div>

          {/* Scrollable Content */}
          <div
            ref={terminalRef}
            className={`relative ${isMinimized ? "h-0" : "h-96"} overflow-y-auto p-6 font-mono text-sm transition-all duration-300`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#4b5563 #1f2937",
            }}
          >
            {terminalOutput.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700">
                    <Terminal className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="text-gray-500 italic">Terminal output will appear here...</div>
                  <div className="text-gray-600 text-xs">Waiting for sync process to begin</div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {terminalOutput.map((line, index) => (
                  <div key={index} className="group hover:bg-gray-800/30 px-2 py-1 rounded-md transition-colors duration-150">
                    <div className="flex items-start space-x-3">
                      {/* Timestamp */}
                      <span className="text-gray-500 text-xs mt-0.5 font-medium bg-gray-800/50 px-2 py-0.5 rounded-md border border-gray-700/50 flex-shrink-0">
                        {line.timestamp}
                      </span>

                      {/* Log Level Indicator */}
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          line.type === "success"
                            ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                            : line.type === "error"
                            ? "bg-red-400 shadow-lg shadow-red-400/50"
                            : line.type === "warning"
                            ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                            : "bg-blue-400 shadow-lg shadow-blue-400/50"
                        }`}
                      ></div>

                      {/* Message Text */}
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

                    {/* Subtle line separator */}
                    {index < terminalOutput.length - 1 && (
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mt-2"></div>
                    )}
                  </div>
                ))}

                {/* Cursor indicator */}
                <div className="flex items-center space-x-2 mt-4 text-gray-500">
                  <span className="text-emerald-400">$</span>
                  <div className="w-2 h-4 bg-emerald-400 animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800/50 px-6 py-2 border-t border-gray-700/50 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">
            Lines: <span className="text-white font-medium">{terminalOutput.length}</span>
          </span>
          {terminalOutput.length > 0 && (
            <span className="text-gray-400">
              Last: <span className="text-white font-medium">{terminalOutput[terminalOutput.length - 1]?.timestamp}</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400">Ready</span>
        </div>
      </div>
    </div>
  );
}

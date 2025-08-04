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

  const clearTerminal = () => setTerminalOutput([]);

  const copyToClipboard = async () => {
    const text = terminalOutput.map((line) => `[${line.timestamp}] ${line.text}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore errors
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden select-text">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-750 to-gray-800 px-4 py-2 border-b border-gray-700 relative flex items-center justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-500/10 rounded-full blur-xl"></div>

        <div className="relative flex items-center space-x-3">
          <div className="bg-gray-700/60 p-1.5 rounded-xl backdrop-blur-sm border border-gray-600/50">
            <Terminal className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center space-x-2">
            <h3 className="text-white font-semibold text-sm">Terminal Output</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <span className="text-emerald-400 text-xs font-medium">Live</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={copyToClipboard}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-transform duration-200 group"
            title="Copy output"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />}
          </button>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-transform duration-200 group"
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
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-transform duration-200 group"
            title="Clear terminal"
          >
            <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className={`transition-all duration-300 ${isMinimized ? "h-0 opacity-0" : "opacity-100"}`}>
        <div className="relative">
          <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20"></div>

          <div
            ref={terminalRef}
            className="h-108 relative overflow-y-auto p-3 font-mono text-xs text-gray-300 transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
          >
            {terminalOutput.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-2 text-center text-gray-500 italic">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center border border-gray-700">
                  <Terminal className="w-6 h-6 text-gray-600" />
                </div>
                <div>Terminal output will appear here...</div>
                <div className="text-xs text-gray-600">Waiting for sync process to begin</div>
              </div>
            ) : (
              <div className="space-y-0.5">
                {terminalOutput.map((line, i) => (
                  <div
                    key={i}
                    className="group hover:bg-gray-800/30 px-2 py-0.5 rounded-md transition-colors duration-150 flex items-start space-x-2"
                  >
                    <span className="text-gray-500 text-[9px] mt-0.5 font-medium bg-gray-800/50 px-1.5 py-0.5 rounded-md border border-gray-700/50 flex-shrink-0 select-text">
                      {line.timestamp}
                    </span>

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

                    <span
                      className={`flex-1 leading-relaxed text-xs ${
                        line.type === "success"
                          ? "text-emerald-400"
                          : line.type === "error"
                          ? "text-red-400"
                          : line.type === "warning"
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } select-text`}
                    >
                      {line.text}
                    </span>
                  </div>
                ))}

                <div className="flex items-center space-x-2 mt-3 text-gray-500">
                  <span className="text-emerald-400">$</span>
                  <div className="w-2 h-4 bg-emerald-400 animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800/50 px-4 py-1 border-t border-gray-700/50 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">
            Lines: <span className="text-white font-medium">{terminalOutput.length}</span>
          </span>
          {terminalOutput.length > 0 && (
            <span className="text-gray-400">
              Last: <span className="text-white font-medium">{terminalOutput[terminalOutput.length - 1]?.timestamp}</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-xs">Ready</span>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export default function TerminalOutput() {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const terminalRef = useRef(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-gray-300" />
          <h3 className="text-white font-medium">Terminal Output</h3>
        </div>
        <button onClick={clearTerminal} className="text-gray-400 hover:text-white transition-colors text-sm">
          Clear
        </button>
      </div>
      <div ref={terminalRef} className="h-96 overflow-y-auto p-6 font-mono text-sm">
        {terminalOutput.length === 0 ? (
          <div className="text-gray-500 italic">Terminal output will appear here...</div>
        ) : (
          terminalOutput.map((line, index) => (
            <div key={index} className="mb-2">
              <span className="text-gray-500 mr-3">[{line.timestamp}]</span>
              <span className={line.type === "success" ? "text-green-400" : line.type === "error" ? "text-red-400" : "text-gray-300"}>
                {line.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

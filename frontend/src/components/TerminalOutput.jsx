import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export default function TerminalOutput({ start, setStart }) {
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

  useEffect(() => {
    if (!start) return;

    const handleSync = async () => {
      setTerminalOutput([]);

      // Simulate sync process
      const syncSteps = [
        { text: "Initializing sync process...", delay: 500 },
        { text: "Checking ADB connection...", delay: 800 },
        { text: "✓ ADB server is running", delay: 600, type: "success" },
        { text: "Detecting Quest 3 device...", delay: 1000 },
        { text: "✓ Quest 3 device found: 2G0YC1ZF8T0F3J", delay: 700, type: "success" },
        { text: "Scanning CustomSongs folder...", delay: 900 },
        { text: "✓ Found 247 custom songs", delay: 600, type: "success" },
        { text: "Starting file synchronization...", delay: 800 },
        { text: "Copying song files to device...", delay: 1200 },
        { text: "Progress: 25%", delay: 800 },
        { text: "Progress: 50%", delay: 800 },
        { text: "Progress: 75%", delay: 800 },
        { text: "Progress: 100%", delay: 800 },
        { text: "✓ Sync completed successfully!", delay: 600, type: "success" },
        { text: "247 songs synchronized to Quest 3", delay: 400, type: "info" },
      ];

      for (const step of syncSteps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay));
        addToTerminal(step.text, step.type || "info");
      }

      setStart(false);
    };

    handleSync();
  }, [start]);

  const addToTerminal = (text, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalOutput((prev) => [...prev, { text, type, timestamp }]);
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

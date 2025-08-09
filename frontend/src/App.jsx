// React
import { useState, useEffect, useRef } from "react";
import { Menu, Server, Settings, AlertCircle, Download, Folder, RectangleGoggles } from "lucide-react";
import "./App.css";

// Hooks
import { useUsbConnection } from "./hooks/useUsbConnection";
import { useQuestDeviceDetails } from "./hooks/useQuestDeviceDetails";
import { useAdbPath } from "./hooks/useAdbPath";
import { useFolder } from "./hooks/useFolder";
import { useTerminal } from "./hooks/useTerminal";
import { InstallAdbWindows } from "../wailsjs/go/main/App";

// Components
import SyncCard from "./components/SyncCard";
import AdbCard from "./components/AdbCard";
import QuestCard from "./components/QuestCard";
import FolderCard from "./components/FolderCard";

export default function AppLayout() {
  const [start, setStart] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const terminalRef = useRef(null);

  const appInfo = { version: "v1.2", author: "ninjaki8" };
  const menuItems = ["Dashboard", "ADB Server", "Quest Device", "Songs Folder"];

  const { adbPath, setAdbPath, adbStatus } = useAdbPath();
  const { questStatus, deviceSerial } = useUsbConnection(adbPath);
  const { questProperties } = useQuestDeviceDetails(adbPath, questStatus, deviceSerial);
  const { customSongsDir, folderStatus, folderData, checkFolder } = useFolder(adbPath, questStatus, deviceSerial);
  const { terminalOutput } = useTerminal(start, setStart, adbPath, customSongsDir, deviceSerial);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const installAdb = async () => {
    const installPath = await InstallAdbWindows();
    setAdbPath(installPath);
  };

  // Helper to render main card content based on active section
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <SyncCard adbStatus={adbStatus} questStatus={questStatus} folderStatus={folderStatus} start={start} setStart={setStart} />;
      case "ADB Server":
        return <AdbCard adbPath={adbPath} adbStatus={adbStatus} />;
      case "Quest Device":
        // Import & render your Quest3Card here
        return <QuestCard questStatus={questStatus} questProperties={questProperties} />;
      case "Songs Folder":
        // Import & render your FolderCard here
        return <FolderCard folderStatus={folderStatus} folderData={folderData} checkFolder={checkFolder} />;
      default:
        return null;
    }
  };

  const StatusBadge = ({ icon: Icon, status, trueText, falseText }) => (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
        status ? "bg-emerald-600/20 text-emerald-400" : "bg-red-600/20 text-red-400"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{status ? trueText : falseText}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="flex items-center h-14 px-5 border-b border-white/10 bg-black/70 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-md bg-white/10">
            <Menu className="w-5 h-5 text-gray-300" />
          </div>
          <h1 className="text-lg font-semibold tracking-wide">Quest Sync</h1>
          <span className="text-xs text-gray-400 ml-1 lowercase">companion</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <StatusBadge icon={Server} status={adbStatus} trueText="ADB Server" falseText="No ADB Server" />
          <StatusBadge icon={RectangleGoggles} status={questStatus} trueText="Quest 3" falseText="No Quest 3" />
          <StatusBadge icon={Folder} status={folderStatus} trueText="Custom Songs" falseText="No Custom Songs" />

          <button className="ml-3 p-2 rounded-md hover:bg-white/10 transition-colors" title="Settings" aria-label="Settings">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 bg-black/60 border-r border-white/20 p-5 gap-4">
          <nav className="flex flex-col gap-3">
            {menuItems.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition 
                  cursor-pointer
                  ${activeSection === section ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10"}`}
              >
                {section}
              </button>
            ))}
          </nav>

          <div className="mt-auto text-xs text-gray-400 space-y-1">
            <div>
              Author: <span className="font-mono text-white">{appInfo.author}</span>
            </div>
            <div>
              Version: <span className="font-mono text-white">{appInfo.version}</span>
            </div>
          </div>
        </aside>

        {/* Main area with SyncCard and Terminal */}
        <main className="flex flex-col flex-1 overflow-hidden">
          {/* Card section */}
          <div className="flex-1 overflow-auto p-5">
            {adbPath === "" && activeSection === "Dashboard" && (
              <div className="flex items-center justify-between mb-10">
                {/* Left: Warning icon + Status text */}
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Android Debug Bridge not found</span>
                </div>

                {/* Right: Install button */}
                <button
                  onClick={() => installAdb()}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                 bg-emerald-600/20 text-emerald-400 border border-emerald-400/20
                 hover:bg-emerald-600/30 hover:border-emerald-400/40
                 transform hover:scale-105 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Latest</span>
                </button>
              </div>
            )}

            {/* Render section based on active menu */}
            {renderSection()}
          </div>

          {/* Terminal output - responsive height */}
          <section className="bg-black/70 border-t border-white/20 flex-shrink-0 flex flex-col h-[30vh]">
            <header className="flex items-center gap-4 mb-4 p-5 pb-0">
              <div className="px-3 py-1 rounded-md bg-white/10 text-xs font-semibold tracking-wide">LOG</div>
              <p className="text-xs text-gray-400">Live output from sync</p>
            </header>

            {/* Scrollable logs */}
            <div ref={terminalRef} className="space-y-1 overflow-y-auto text-sm text-left pr-2 px-5 pb-5 flex-1">
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
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

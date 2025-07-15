import "./App.css";
import AdbCard from "./components/AdbCard";
import FolderCard from "./components/FolderCard";
import QuestCard from "./components/QuestCard";
import SyncCard from "./components/SyncCard";
import TerminalOutput from "./components/TerminalOutput";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your Quest 3 development environment</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdbCard />
          {/* <QuestCard/>
          <FolderCard/>
          <SyncCard/> */}
        </div>

        {/* Terminal Output */}
        {/* <TerminalOutput/> */}
      </div>
    </div>
  );
}

export default App;

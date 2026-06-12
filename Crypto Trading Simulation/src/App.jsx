import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Placeholder components (Tum inhe baad mein alag files mein move kar sakte ho)
const Dashboard = () => <div className="p-10 text-3xl font-bold">Dashboard Page</div>;
const Simulator = () => <div className="p-10 text-3xl font-bold">Simulator Page</div>;

function App() {
  return (
    <Router>
      <div className="flex bg-[#05070a] min-h-screen text-white">
        {/* Sidebar fixed on the left */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulator" element={<Simulator />} />
            {/* Yahan baaki pages add karte jana */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
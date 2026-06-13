import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { FiMaximize, FiX } from "react-icons/fi"; // Icons add kiye
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard"; 
import History from "./components/History";
import Wishlist from "./components/Wishlist";
import Settings from "./components/Setting";
import Performance from "./components/Performance";
import Trading from "./components/Trading";
import KnowledgeHub from "./components/KnowledgeHub";

// Helper component to check location
const TiltHelper = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="md:hidden absolute top-[70px] left-1/2 -translate-x-1/2 z-[100] w-[90%] p-4 bg-emerald-950/90 border border-emerald-500/30 rounded-xl backdrop-blur-md shadow-2xl flex items-center gap-4">
      <div className="p-3 bg-emerald-900/60 rounded-full text-emerald-400">
        <FiMaximize size={20} />
      </div>
      <div>
        <p className="text-white font-bold text-sm">Rotate Device</p>
        <p className="text-emerald-300 text-xs">Best experience in landscape mode.</p>
      </div>
      <button onClick={onClose} className="ml-auto text-gray-400 hover:text-white p-2">
        <FiX size={18} />
      </button>
    </div>
  );
};

function App() {
  const [showTiltMessage, setShowTiltMessage] = useState(true);

  return (
    <Router>
      <LayoutWrapper showTiltMessage={showTiltMessage} setShowTiltMessage={setShowTiltMessage} />
    </Router>
  );
}

// Wrapper component to use useLocation hook
function LayoutWrapper({ showTiltMessage, setShowTiltMessage }) {
  const location = useLocation();
  
  return (
    <div className="flex bg-[#05070a] h-screen overflow-hidden text-white px-2 md:px-0">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Navbar /> 
        
        {/* Tilt Message - Sirf Trading Simulator par dikhega */}
        {location.pathname === '/trade-simulator' && (
          <TiltHelper show={showTiltMessage} onClose={() => setShowTiltMessage(false)} />
        )}
        
        <main className="flex-1 overflow-y-auto custom-scrollbar pt-[45px] md:pt-0">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/watchlist" element={<Wishlist />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/trade-simulator" element={<Trading />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
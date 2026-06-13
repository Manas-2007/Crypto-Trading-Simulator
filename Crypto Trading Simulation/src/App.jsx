import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard"; 
import History from "./components/History";
import Wishlist from "./components/Wishlist";
import Settings from "./components/Setting";
import Performance from "./components/Performance";

function App() {
  return (
    <Router>
      <div className="flex bg-[#05070a] h-screen overflow-hidden text-white">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar /> 
          
          <main className="flex-1 overflow-y-auto custom-scrollbar pt-[45px] md:pt-0">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/watchlist" element={<Wishlist />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/performance" element={<Performance />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
export default App;
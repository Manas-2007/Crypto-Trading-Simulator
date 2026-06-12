import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/dashboard/Dashboard"; 
import History from "./components/History";
import Wishlist from "./components/Wishlist";


function App() {
  return (
    <Router>
      <div className="flex bg-[#05070a] h-screen overflow-hidden text-white">
        <Sidebar />
         <main className="flex-1 overflow-y-auto custom-scrollbar pt-[45px] md:pt-0">
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/history" element={<History />} />
    <Route path="/watchlist" element={<Wishlist />} />
  </Routes>
</main>
      </div>
    </Router>
  );
}
export default App;
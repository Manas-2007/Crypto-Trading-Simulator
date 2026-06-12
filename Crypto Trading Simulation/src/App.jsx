import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// Path updated to point to the new dashboard folder
import Dashboard from "./components/dashboard/Dashboard"; 

function App() {
  return (
    <Router>
      <div className="flex bg-[#05070a] min-h-screen text-white">
        {/* Sidebar fixed on the left */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            {/* Root path '/' par aate hi '/dashboard' par redirect karega */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
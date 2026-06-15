import React, { useState, useRef, useEffect } from "react";
import {
  FiMonitor,
  FiDollarSign,
  FiClock,
  FiBarChart2,
  FiVolume2,
  FiBell,
  FiTrash2,
  FiDownload,
  FiShield,
  FiSave,
} from "react-icons/fi";

// 1. REUSABLE UI COMPONENTS (UNCHANGED)
const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full relative transition-colors duration-300 focus:outline-none shrink-0 ${enabled ? "bg-emerald-500" : "bg-white/20"}`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-md transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

const SelectDropdown = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || value;

  return (
    <div className="relative w-32 md:w-40 shrink-0" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#131722] border border-white/30 hover:border-emerald-500 text-white text-[11px] md:text-xs rounded-lg px-3 py-2 cursor-pointer flex justify-between items-center transition-colors shadow-sm"
      >
        <span className="truncate">{selectedLabel}</span>
        <span 
          className="text-gray-400 text-[9px] transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-full bg-[#131722] border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-3 py-2.5 text-[11px] md:text-xs cursor-pointer transition-colors ${
                value === opt.value
                  ? "bg-emerald-500/20 text-emerald-400 font-bold border-l-2 border-emerald-500"
                  : "text-gray-300 hover:bg-white/10 hover:text-white border-l-2 border-transparent"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 2. MAIN SETTINGS COMPONENT
const Settings = () => {
  // 🔴 STATES (Loaded from LocalStorage or defaults)
  const [theme, setTheme] = useState("dark");
  const [currency, setCurrency] = useState("INR");
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("Candles");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [confirmTrades, setConfirmTrades] = useState(true);

  // 🔴 LOAD SAVED SETTINGS ON MOUNT
  useEffect(() => {
    const prefs = JSON.parse(localStorage.getItem("userPreferences")) || {};
    setTheme(prefs.theme || "dark");
    setCurrency(prefs.currency || "INR");
    setTimeframe(prefs.timeframe || "1D");
    setChartType(prefs.chartType || "Candles");
    setSoundEnabled(prefs.soundEnabled !== false); // default true
    setAlertsEnabled(prefs.alertsEnabled !== false); 
    setConfirmTrades(prefs.confirmTrades !== false);
  }, []);

  // 🔴 SAVE PREFERENCES
  const handleSave = () => {
    const prefs = { theme, currency, timeframe, chartType, soundEnabled, alertsEnabled, confirmTrades };
    localStorage.setItem("userPreferences", JSON.stringify(prefs));
    
    // Theme Application Logic (Adds class to body)
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
    
    alert("Settings Saved Successfully!");
  };

  // 🔴 THE NUCLEAR BUTTON: Wipe All Data
  const handleReset = () => {
    const isConfirmed = window.confirm(
      "WARNING: Are you sure you want to delete all your simulated trade history, active orders, and reset account balance? This cannot be undone."
    );
    if (isConfirmed) {
      // 1. Wipe all trading storage keys
      localStorage.removeItem("activeTrades");
      localStorage.removeItem("pendingOrders");
      localStorage.removeItem("closedTrades");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("activeCoin");
      
      // 2. Reset Balance to default
      localStorage.setItem("balance", 10000); 
      
      // 3. Dispatch events to instantly update all other tabs
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("tradesUpdated"));
      
      alert("All trading data has been completely wiped and reset!");
    }
  };

  // 🔴 BONUS: Working CSV Export for Trade History!
  const handleExportCSV = () => {
    const closedTrades = JSON.parse(localStorage.getItem("closedTrades")) || [];
    if (closedTrades.length === 0) {
      alert("You have no closed trades to export yet.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    // CSV Headers
    csvContent += "Trade ID,Asset,Type,Entry Price,Exit Price,Quantity,Net P/L,Status\n";

    // Format rows
    closedTrades.forEach(t => {
      const row = `${t.id},${t.asset},${t.type},${t.targetPrice},${t.exitPrice || 'N/A'},${t.qty},${t.pnl},${t.status}`;
      csvContent += row + "\n";
    });

    // Trigger Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "My_Trade_History.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="mx-2 md:mx-4 my-6 flex flex-col gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Page Header */}
      <div className="flex justify-between items-center bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-6 shadow-sm">
        <div>
          <h1 className="text-white font-extrabold text-xl md:text-2xl tracking-wide">
            Platform Settings
          </h1>
          <p className="text-gray-400 text-[10px] md:text-xs mt-1">
            Configure your trading simulator preferences and defaults.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <FiSave size={16} />{" "}
          <span className="hidden md:block">Save Changes</span>
        </button>
      </div>

      {/* Grid Layout for Settings Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* ─── CARD 1: GENERAL PREFERENCES ─── */}
        <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-6 flex flex-col gap-5">
          <h2 className="text-emerald-400 font-bold text-xs md:text-sm uppercase tracking-widest border-b border-white/10 pb-3 mb-1">
            General Preferences
          </h2>

          {/* Theme */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                <FiMonitor size={18} />
              </div>
              <div>
                <p className="text-white text-xs md:text-sm font-bold">
                  Theme Mode
                </p>
                <p className="text-gray-500 text-[9px] md:text-[11px]">
                  Toggle between Light and Dark mode
                </p>
              </div>
            </div>
            <SelectDropdown
              value={theme}
              onChange={setTheme}
              options={[
                { label: "Dark (Default)", value: "dark" },
                { label: "Light Mode", value: "light" },
              ]}
            />
          </div>

          {/* Currency (INR Focused) */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                <FiDollarSign size={18} />
              </div>
              <div>
                <p className="text-white text-xs md:text-sm font-bold">
                  Default Currency
                </p>
                <p className="text-gray-500 text-[9px] md:text-[11px]">
                  Base currency for P/L and balances
                </p>
              </div>
            </div>
            <SelectDropdown
              value={currency}
              onChange={setCurrency}
              options={[
                { label: "INR (₹)", value: "INR" },
                { label: "USD ($)", value: "USD" },
              ]}
            />
          </div>

          {/* Timeframe */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                <FiClock size={18} />
              </div>
              <div>
                <p className="text-white text-xs md:text-sm font-bold">
                  Default Timeframe
                </p>
                <p className="text-gray-500 text-[9px] md:text-[11px]">
                  Interval loaded on dashboard charts
                </p>
              </div>
            </div>
            <SelectDropdown
              value={timeframe}
              onChange={setTimeframe}
              options={[
                { label: "15 Minutes", value: "15M" },
                { label: "1 Hour", value: "1H" },
                { label: "4 Hours", value: "4H" },
                { label: "1 Day", value: "1D" },
                { label: "1 Week", value: "1W" },
              ]}
            />
          </div>

          {/* Chart Type */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                <FiBarChart2 size={18} />
              </div>
              <div>
                <p className="text-white text-xs md:text-sm font-bold">
                  Default Chart Type
                </p>
                <p className="text-gray-500 text-[9px] md:text-[11px]">
                  Preferred visual style for charts
                </p>
              </div>
            </div>
            <SelectDropdown
              value={chartType}
              onChange={setChartType}
              options={[
                { label: "Candlesticks", value: "Candles" },
                { label: "Line Chart", value: "Line" },
                { label: "Heikin Ashi", value: "HeikinAshi" },
              ]}
            />
          </div>
        </div>

        {/* ─── CARD 2: TRADING & ALERTS ─── */}
        <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-6 flex flex-col gap-5">
          <h2 className="text-emerald-400 font-bold text-xs md:text-sm uppercase tracking-widest border-b border-white/10 pb-3 mb-1">
            Trading & Alerts
          </h2>

          {/* Confirm Trades */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                <FiShield size={18} />
              </div>
              <div>
                <p className="text-white text-xs md:text-sm font-bold">
                  Order Confirmation
                </p>
                <p className="text-gray-500 text-[9px] md:text-[11px]">
                  Ask for confirmation before placing orders
                </p>
              </div>
            </div>
            <ToggleSwitch
              enabled={confirmTrades}
              onChange={() => setConfirmTrades(!confirmTrades)}
            />
          </div>

          {/* Sound Effects */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                <FiVolume2 size={18} />
              </div>
              <div>
                <p className="text-white text-xs md:text-sm font-bold">
                  Trade Sounds
                </p>
                <p className="text-gray-500 text-[9px] md:text-[11px]">
                  Play audio on order execution
                </p>
              </div>
            </div>
            <ToggleSwitch
              enabled={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
            />
          </div>

          {/* Push Notifications */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                <FiBell size={18} />
              </div>
              <div>
                <p className="text-white text-xs md:text-sm font-bold">
                  Price Alerts
                </p>
                <p className="text-gray-500 text-[9px] md:text-[11px]">
                  Receive push notifications for target hits
                </p>
              </div>
            </div>
            <ToggleSwitch
              enabled={alertsEnabled}
              onChange={() => setAlertsEnabled(!alertsEnabled)}
            />
          </div>
        </div>

        {/* ─── CARD 3: DATA MANAGEMENT  ─── */}
        <div className="lg:col-span-2 bg-[#0a0d11] border border-red-500/30 rounded-xl p-4 md:p-6 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
          <h2 className="text-red-400 font-bold text-xs md:text-sm uppercase tracking-widest border-b border-red-500/20 pb-3 mb-4">
            Data Management (Danger Zone)
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="max-w-xl">
              <p className="text-white font-bold text-sm md:text-base">
                Reset Simulator Data
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs mt-1 leading-relaxed">
                This action will permanently delete all your trade history,
                active positions, watchlist, and reset your virtual balance back
                to default. This action cannot be reversed.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              {/* Export CSV Button Hooked Up */}
              <button
                onClick={handleExportCSV}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/30 px-4 py-2.5 rounded-lg text-xs font-bold transition-all"
                title="Export Data"
              >
                <FiDownload size={14} /> Export CSV
              </button>
              {/* Reset Data Button Hooked Up */}
              <button
                onClick={handleReset}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 hover:border-red-600 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <FiTrash2 size={14} /> Reset Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
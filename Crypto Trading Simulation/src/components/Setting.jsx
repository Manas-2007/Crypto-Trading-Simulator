import React, { useState } from "react";
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

// 1. REUSABLE UI COMPONENTS
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

// Custom Select Dropdown
const SelectDropdown = ({ value, options, onChange }) => (
  <div className="relative w-32 md:w-40 shrink-0">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#131722] border border-white/30 text-white text-[11px] md:text-xs rounded-lg px-3 py-2 appearance-none focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      ▼
    </div>
  </div>
);

// 2. MAIN SETTINGS COMPONENT
const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [currency, setCurrency] = useState("USD");
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("Candles");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [confirmTrades, setConfirmTrades] = useState(true);

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  const handleReset = () => {
    const isConfirmed = window.confirm(
      "WARNING: Are you sure you want to delete all your simulated trade history and reset account balance? This cannot be undone.",
    );
    if (isConfirmed) {
      alert("All data has been reset.");
    }
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

          {/* Currency */}
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
                { label: "USD ($)", value: "USD" },
                { label: "EUR (€)", value: "EUR" },
                { label: "INR (₹)", value: "INR" },
                { label: "GBP (£)", value: "GBP" },
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
              <button
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/30 px-4 py-2.5 rounded-lg text-xs font-bold transition-all"
                title="Export Data"
              >
                <FiDownload size={14} /> Export CSV
              </button>
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

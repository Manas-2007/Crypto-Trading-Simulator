import React, { useState } from "react";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiCheckCircle,
  FiCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
} from "react-icons/fi";

// 1. DATA SECTIONS

const historyData = [
  {
    id: 1,
    sno: "01",
    asset: "BTC",
    name: "Bitcoin",
    type: "Buy",
    entry: "58,200.50",
    exit: "59,498.80",
    qty: "0.15 BTC",
    pnl: "+$194.74",
    pnlPct: "+2.23%",
    date: "12 Jun, 14:20",
    status: "Closed",
    isProfit: true,
    color: "bg-[#F7931A]",
  },
  {
    id: 2,
    sno: "02",
    asset: "ETH",
    name: "Ethereum",
    type: "Sell",
    entry: "3,250.00",
    exit: "3,125.58",
    qty: "2.50 ETH",
    pnl: "+$311.05",
    pnlPct: "+3.82%",
    date: "11 Jun, 09:15",
    status: "Closed",
    isProfit: true,
    color: "bg-[#627EEA]",
  },
  {
    id: 3,
    sno: "03",
    asset: "SOL",
    name: "Solana",
    type: "Buy",
    entry: "185.20",
    exit: "Live",
    qty: "50.0 SOL",
    pnl: "-$167.50",
    pnlPct: "-1.80%",
    date: "10 Jun, 16:45",
    status: "Open",
    isProfit: false,
    color: "bg-[#14F195]",
  },
  {
    id: 4,
    sno: "04",
    asset: "DOGE",
    name: "Dogecoin",
    type: "Buy",
    entry: "0.1420",
    exit: "0.1560",
    qty: "10,000 DOGE",
    pnl: "+$140.00",
    pnlPct: "+9.85%",
    date: "09 Jun, 11:30",
    status: "Closed",
    isProfit: true,
    color: "bg-[#C2A633]",
  },
  {
    id: 5,
    sno: "05",
    asset: "XRP",
    name: "Ripple",
    type: "Sell",
    entry: "0.5100",
    exit: "0.5201",
    qty: "1,500 XRP",
    pnl: "-$15.15",
    pnlPct: "-1.98%",
    date: "08 Jun, 08:20",
    status: "Closed",
    isProfit: false,
    color: "bg-[#23292F]",
  },
  {
    id: 6,
    sno: "06",
    asset: "BNB",
    name: "Binance",
    type: "Buy",
    entry: "590.00",
    exit: "Live",
    qty: "5.00 BNB",
    pnl: "+$10.00",
    pnlPct: "+0.33%",
    date: "08 Jun, 07:10",
    status: "Open",
    isProfit: true,
    color: "bg-[#F3BA2F]",
  },
];

// --- Summary Cards Data ---
const historyStats = [
  { id: 1, label: "TOTAL P/L", value: "+$2,450.80", type: "profit" },
  { id: 2, label: "WIN RATE", value: "72.4%", type: "profit" },
  { id: 3, label: "TOTAL TRADES", value: "156", type: "neutral" },
  { id: 4, label: "TOTAL VOLUME", value: "$142.5k", type: "neutral" },
];

// 2. INTERNAL COMPONENTS

// --- A. Animated Mini Chart for Top 4 Cards ---
const CardSparkline = ({ type }) => {
  const isProfit = type === "profit";
  const color = isProfit ? "#10b981" : "#38bdf8";

  const path = isProfit
    ? "M0 14 L8 9 L16 12 L24 5 L32 8 L40 2"
    : "M0 12 L10 8 L20 10 L30 5 L40 7"; 

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 40 16"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        className="card-sparkline-path"
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
      <circle
        cx="40"
        cy={isProfit ? 2 : 7}
        r="1.5"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
};

// --- B. Premium Summary Card ---
const SummaryCard = ({ label, value, type, index }) => {
  const isProfit = type === "profit";

  const borderColor = isProfit
    ? "rgba(16,185,129,0.3)"
    : "rgba(255,255,255,0.1)";
  const bgGradient = isProfit
    ? "linear-gradient(145deg, rgba(16,185,129,0.05) 0%, #05070a 100%)"
    : "linear-gradient(145deg, #0a0d11 0%, #05070a 100%)";
  const textColor = isProfit ? "text-emerald-400" : "text-white";
  const iconColor = isProfit ? "text-emerald-500" : "text-sky-400";

  return (
    <div
      className={`relative rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer p-3 md:p-5 summary-card-anim`}
      style={{
        background: bgGradient,
        border: `3px solid ${isProfit ? borderColor : "rgba(91, 208, 251, 0.3)"}`,
        animationDelay: `${index * 0.1}s`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}
    >
      {isProfit && (
        <div className="absolute inset-0 pointer-events-none internal-glow-pulse opacity-40"></div>
      )}

      {/* Header: Label + Icon */}
      <div className="relative z-10 flex justify-between items-start mb-2 md:mb-3">
        <p className="text-gray-400 font-semibold uppercase tracking-wider text-[9px] md:text-[11px]">
          {label}
        </p>
        <span className={`${iconColor} opacity-80 drop-shadow-md`}>
          {isProfit ? <FiTrendingUp size={14} /> : <FiActivity size={14} />}
        </span>
      </div>

      {/* Footer: Value + Mini Chart */}
      <div className="relative z-10 flex items-end justify-between gap-2">
        <p
          className={`font-mono font-bold leading-none tracking-tight ${textColor}`}
          style={{ fontSize: "clamp(15px, 1.5vw, 24px)" }}
        >
          {value}
        </p>
        <div className="w-[35%] md:w-[45%] h-5 md:h-8 shrink-0">
          <CardSparkline type={type} />
        </div>
      </div>
    </div>
  );
};

// --- C. Mini Sparkline for Table P/L 
const MiniSparkline = ({ isProfit }) => {
  const color = isProfit ? "#10b981" : "#ef4444";
  const path = isProfit
    ? "M0 14 L8 9 L16 12 L24 5 L32 8 L40 2"
    : "M0 2 L8 8 L16 5 L24 12 L32 9 L40 14";
  return (
    <svg
      width="45"
      height="18"
      viewBox="0 0 40 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 2px ${color})` }}
      />
      <path
        d={`${path} L40 16 L0 16 Z`}
        fill={`url(#grad-${isProfit})`}
        opacity="0.2"
      />
      <defs>
        <linearGradient id={`grad-${isProfit}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// 3. MAIN HISTORY COMPONENT
const History = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const tabs = ["All Orders", "Open Positions", "Closed History"];

  return (
    <div
      className="mx-2 md:mx-4 my-6 flex flex-col gap-5 md:gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <style>{`
        /* Custom Scrollbar */
        .history-scrollbar::-webkit-scrollbar { height: 4px; }
        .history-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .history-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 10px; }
        .history-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.6); }
        
        /* Card Animations */
        @keyframes fadeUpSummary {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);  }
        }
        @keyframes sparklineDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0;   }
        }
        @keyframes pulseInternalGlow {
          0%, 100% { box-shadow: inset 0 0 15px rgba(16,185,129,0.1); }
          50%      { box-shadow: inset 0 0 30px rgba(16,185,129,0.25); }
        }

        .summary-card-anim { animation: fadeUpSummary 0.5s ease both; }
        .card-sparkline-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: sparklineDraw 1.5s ease-out forwards;
          animation-delay: 0.3s;
        }
        .internal-glow-pulse { animation: pulseInternalGlow 3s ease-in-out infinite; }
      `}</style>

      {/* --- SECTION 1: Top 4 Premium Summary Cards --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {historyStats.map((stat, i) => (
          <SummaryCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            type={stat.type}
            index={i}
          />
        ))}
      </div>

      {/* --- SECTION 2: History Table */}
      <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-3 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 md:mb-6">
          <h2 className="text-white font-extrabold text-base md:text-lg tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            Trade History
          </h2>

          <div className="flex bg-[#05070a] p-1 rounded-lg border border-white/30 w-fit overflow-x-auto history-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#1a202c] text-white border border-white/30 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto history-scrollbar pb-2">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-[9px] md:text-[11px] uppercase tracking-wider border-b border-white/30">
                <th className="pb-3 md:pb-4 font-semibold pl-2">S.No</th>
                <th className="pb-3 md:pb-4 font-semibold">Assets</th>
                <th className="pb-3 md:pb-4 font-semibold">Type</th>
                <th className="pb-3 md:pb-4 font-semibold text-right">
                  Entry Price
                </th>
                <th className="pb-3 md:pb-4 font-semibold text-right">
                  Exit Price
                </th>
                <th className="pb-3 md:pb-4 font-semibold text-right">
                  Quantity
                </th>
                <th className="pb-3 md:pb-4 font-semibold text-center">
                  P/L (Return)
                </th>
                <th className="pb-3 md:pb-4 font-semibold text-center">Date</th>
                <th className="pb-3 md:pb-4 font-semibold text-right pr-2">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="text-[11px] md:text-sm">
              {historyData.map((trade) => (
                <tr
                  key={trade.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-3 md:py-4 pl-2 text-gray-500 font-mono text-[10px] md:text-xs">
                    {trade.sno}
                  </td>

                  <td className="py-3 md:py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${trade.color} flex justify-center items-center text-white font-bold text-[8px] md:text-[10px] shadow-lg shrink-0`}
                      >
                        {trade.asset.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white leading-tight text-[11px] md:text-sm">
                          {trade.asset}
                        </span>
                        <span className="text-gray-500 text-[9px] md:text-[10px]">
                          {trade.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td
                    className={`py-3 md:py-4 font-bold ${trade.type === "Buy" ? "text-emerald-400" : "text-red-500"}`}
                  >
                    <div className="flex items-center gap-1 text-[10px] md:text-xs bg-white/5 w-fit px-2 py-0.5 rounded border border-white/5">
                      {trade.type === "Buy" ? (
                        <FiArrowUpRight size={12} />
                      ) : (
                        <FiArrowDownRight size={12} />
                      )}
                      {trade.type}
                    </div>
                  </td>

                  <td className="py-3 md:py-4 text-right text-gray-300 font-mono text-[10px] md:text-xs">
                    ${trade.entry}
                  </td>

                  <td className="py-3 md:py-4 text-right font-mono text-[10px] md:text-xs">
                    {trade.exit === "Live" ? (
                      <span className="text-emerald-500 animate-pulse bg-emerald-500/10 px-2 py-0.5 rounded text-[9px]">
                        LIVE
                      </span>
                    ) : (
                      <span className="text-gray-300">${trade.exit}</span>
                    )}
                  </td>

                  <td className="py-3 md:py-4 text-right text-gray-400 font-mono text-[10px] md:text-xs">
                    {trade.qty}
                  </td>

                  <td className="py-3 md:py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex flex-col items-end">
                        <span
                          className={`font-mono font-bold text-[10px] md:text-xs ${trade.isProfit ? "text-emerald-400" : "text-red-500"}`}
                        >
                          {trade.pnl}
                        </span>
                        <span
                          className={`text-[8px] md:text-[9px] font-bold ${trade.isProfit ? "text-emerald-500/70" : "text-red-500/70"}`}
                        >
                          {trade.pnlPct}
                        </span>
                      </div>
                      <MiniSparkline isProfit={trade.isProfit} />
                    </div>
                  </td>

                  <td className="py-3 md:py-4 text-center text-gray-500 text-[9px] md:text-[11px] whitespace-nowrap">
                    {trade.date}
                  </td>

                  <td className="py-3 md:py-4 text-right pr-2">
                    <span
                      className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider ${
                        trade.status === "Closed"
                          ? "bg-white/5 text-gray-400 border border-white/30"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                      }`}
                    >
                      {trade.status === "Closed" ? (
                        <FiCheckCircle size={10} className="opacity-70" />
                      ) : (
                        <FiCircle size={10} className="animate-pulse" />
                      )}
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;

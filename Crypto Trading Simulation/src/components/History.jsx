import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiCheckCircle,
  FiCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
} from "react-icons/fi";

// --- DYNAMIC HELPERS ---
const coinNames = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  BNB: "Binance Coin",
  XRP: "Ripple",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  AVAX: "Avalanche",
  DOT: "Polkadot",
  MATIC: "Polygon",
};
const coinColors = {
  BTC: "bg-[#F7931A]",
  ETH: "bg-[#627EEA]",
  SOL: "bg-[#14F195]",
  BNB: "bg-[#F3BA2F]",
  XRP: "bg-[#23292F]",
  ADA: "bg-[#0033AD]",
  DOGE: "bg-[#C2A633]",
  AVAX: "bg-[#E84142]",
  DOT: "bg-[#E6007A]",
  MATIC: "bg-[#8247E5]",
};

// --- INTERNAL COMPONENTS (UNCHANGED UI) ---
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
      <div className="relative z-10 flex justify-between items-start mb-2 md:mb-3">
        <p className="text-gray-400 font-semibold uppercase tracking-wider text-[9px] md:text-[11px]">
          {label}
        </p>
        <span className={`${iconColor} opacity-80 drop-shadow-md`}>
          {isProfit ? <FiTrendingUp size={14} /> : <FiActivity size={14} />}
        </span>
      </div>
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

  // DYNAMIC STATES
  const [allTrades, setAllTrades] = useState([]);
  const [stats, setStats] = useState({
    pnl: "+$0.00",
    winRate: "0%",
    trades: "0",
    volume: "$0.00",
  });

  useEffect(() => {
    const fetchData = () => {
      const active = JSON.parse(localStorage.getItem("activeTrades")) || [];
      const pending = JSON.parse(localStorage.getItem("pendingOrders")) || [];
      const closed = JSON.parse(localStorage.getItem("closedTrades")) || [];

      // ... (tera calculation logic wahi rahega) ...
      // Stats Calculation (wahi purana logic)
      let totalPnl = 0;
      let winCount = 0;
      let totalVol = 0;
      closed.forEach(t => { totalPnl += (t.pnl || 0); if (t.pnl > 0) winCount++; totalVol += (t.investment * t.leverage); });
      active.forEach(t => totalVol += (t.investment * t.leverage));
      pending.forEach(t => totalVol += (t.investment * t.leverage));

      const winRateStr = closed.length > 0 ? ((winCount / closed.length) * 100).toFixed(1) + "%" : "0.0%";
      const volStr = totalVol > 1000 ? `$${(totalVol / 1000).toFixed(1)}k` : `$${totalVol.toFixed(2)}`;
      const pnlStr = `${totalPnl >= 0 ? '+' : '-'}$${Math.abs(totalPnl).toFixed(2)}`;
      setStats({ pnl: pnlStr, winRate: winRateStr, trades: (closed.length + active.length + pending.length).toString(), volume: volStr });

      const formatDate = (ts) => new Date(ts).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
      const fActive = active.map(t => ({ id: t.id, asset: t.asset, name: coinNames[t.asset] || t.asset, type: t.type, entry: t.targetPrice.toFixed(2), exit: "Live", qty: `${t.qty.toFixed(4)} ${t.asset}`, pnl: "---", pnlPct: "---", date: formatDate(t.id), status: "Open", isProfit: true, color: coinColors[t.asset] || "bg-gray-500" }));
      const fPending = pending.map(t => ({ id: t.id, asset: t.asset, name: coinNames[t.asset] || t.asset, type: t.type, entry: t.targetPrice.toFixed(2), exit: "Pending", qty: `${t.qty.toFixed(4)} ${t.asset}`, pnl: "---", pnlPct: "---", date: formatDate(t.id), status: "Pending", isProfit: true, color: coinColors[t.asset] || "bg-gray-500" }));
      const fClosed = closed.map(t => ({ id: t.id, asset: t.asset, name: coinNames[t.asset] || t.asset, type: t.type, entry: t.targetPrice.toFixed(2), exit: t.exitPrice ? t.exitPrice.toFixed(2) : "---", qty: `${t.qty.toFixed(4)} ${t.asset}`, pnl: `${t.pnl >= 0 ? '+' : '-'}$${Math.abs(t.pnl).toFixed(2)}`, pnlPct: `${t.pnl >= 0 ? '+' : '-'}${Math.abs((t.pnl / t.investment) * 100).toFixed(2)}%`, date: formatDate(t.closeTime || t.id), status: "Closed", isProfit: t.pnl >= 0, color: coinColors[t.asset] || "bg-gray-500" }));

      const combined = [...fActive, ...fPending, ...fClosed].sort((a, b) => b.id - a.id);
      setAllTrades(combined.map((trade, index) => ({ ...trade, sno: String(index + 1).padStart(2, '0') })));
    };

    fetchData(); // Initial load

    // 🔴 NAYA: Event listeners
    window.addEventListener("tradesUpdated", fetchData);
    window.addEventListener("storage", fetchData);
    
    return () => {
      window.removeEventListener("tradesUpdated", fetchData);
      window.removeEventListener("storage", fetchData);
    };
  }, []);

  // Filter based on Tabs
  const filteredTrades = allTrades.filter((trade) => {
    if (activeTab === "Open Positions")
      return trade.status === "Open" || trade.status === "Pending";
    if (activeTab === "Closed History") return trade.status === "Closed";
    return true; // "All Orders"
  });

  const dynamicStatsArray = [
    {
      id: 1,
      label: "TOTAL P/L",
      value: stats.pnl,
      type: stats.pnl.includes("+") ? "profit" : "neutral",
    },
    { id: 2, label: "WIN RATE", value: stats.winRate, type: "profit" },
    { id: 3, label: "TOTAL TRADES", value: stats.trades, type: "neutral" },
    { id: 4, label: "TOTAL VOLUME", value: stats.volume, type: "neutral" },
  ];

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
        {dynamicStatsArray.map((stat, i) => (
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
          <div className="flex items-center justify-between w-full md:w-auto">
            <h2 className="text-white font-extrabold text-base md:text-lg tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
              Trade History
            </h2>
            <button
              onClick={() => window.print()}
              className="md:hidden flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-emerald-400 border border-white/30 px-3 py-1.5 rounded-md text-[10px] font-bold transition-colors"
            >
              <FiDownload size={12} /> PDF
            </button>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto history-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => window.print()}
              className="hidden md:flex shrink-0 items-center gap-2 bg-white/5 hover:bg-white/10 text-emerald-400 border border-white/10 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              <FiDownload size={14} /> Download PDF
            </button>
            <div className="flex bg-[#05070a] p-1 rounded-lg border border-white/30 shrink-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold rounded-md transition-all whitespace-nowrap ${activeTab === tab ? "bg-[#1a202c] text-white border border-white/30 shadow-sm" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
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
              {filteredTrades.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-10 text-gray-500 font-mono"
                  >
                    No trades found in this category.
                  </td>
                </tr>
              ) : (
                filteredTrades.map((trade) => (
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
                      ) : trade.exit === "Pending" ? (
                        <span className="text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded text-[9px]">
                          PENDING
                        </span>
                      ) : (
                        <span className="text-gray-300">${trade.exit}</span>
                      )}
                    </td>
                    <td className="py-3 md:py-4 text-right text-gray-400 font-mono text-[10px] md:text-xs">
                      {trade.qty}
                    </td>
                    <td className="py-3 md:py-4">
                      {trade.pnl === "---" ? (
                        <div className="text-center text-gray-500 font-mono">
                          ---
                        </div>
                      ) : (
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
                      )}
                    </td>
                    <td className="py-3 md:py-4 text-center text-gray-500 text-[9px] md:text-[11px] whitespace-nowrap">
                      {trade.date}
                    </td>
                    <td className="py-3 md:py-4 text-right pr-2">
                      <span
                        className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-wider ${trade.status === "Closed" ? "bg-white/5 text-gray-400 border border-white/30" : trade.status === "Pending" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]"}`}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;

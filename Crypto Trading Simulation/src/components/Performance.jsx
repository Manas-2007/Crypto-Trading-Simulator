import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiTarget,
  FiAward,
  FiAlertOctagon,
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";

// ════════════════════════════════════════════════════════════
// 1. INTERNAL COMPONENTS (UI UNCHANGED)
// ════════════════════════════════════════════════════════════

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0a0d11] border border-white/20 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">
          {label}
        </p>
        <p className="text-white font-mono text-sm mb-1">
          Balance:{" "}
          <span className="font-bold">${data.cumulative.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </p>
        {label !== "Start" && (
          <p className={`font-mono text-xs font-bold ${data.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            Trade P/L: {data.pnl >= 0 ? "+" : "-"}${Math.abs(data.pnl).toFixed(2)}
          </p>
        )}
      </div>
    );
  }
  return null;
};

// Summary Card Component
const StatCard = ({ title, value, subtext, icon, isProfit, isWarning }) => (
  <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-5 flex flex-col justify-between hover:border-white/20 transition-colors group relative overflow-hidden">
    {isProfit && (
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
    )}
    {isWarning && (
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
    )}
    <div className="flex justify-between items-start mb-3 relative z-10">
      <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
        {title}
      </h3>
      <span className={`p-1.5 rounded-lg bg-white/5 ${isProfit ? "text-emerald-400" : isWarning ? "text-red-400" : "text-sky-400"}`}>
        {icon}
      </span>
    </div>
    <div className="relative z-10">
      <p className={`text-xl md:text-2xl font-bold font-mono tracking-tight ${isProfit ? "text-emerald-400" : isWarning ? "text-red-400" : "text-white"}`}>
        {value}
      </p>
      <p className={`text-[9px] md:text-[10px] font-bold mt-1 ${isWarning ? "text-red-500/80" : "text-emerald-500/80"}`}>
        {subtext}
      </p>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════
// 2. MAIN PERFORMANCE COMPONENT
// ════════════════════════════════════════════════════════════

const Performance = () => {
  // --- DYNAMIC STATES ---
  const [tradeData, setTradeData] = useState([{ trade: "Start", pnl: 0, cumulative: 10000, isWin: true }]);
  const [bestTrades, setBestTrades] = useState([]);
  const [worstTrades, setWorstTrades] = useState([]);
  const [winLossData, setWinLossData] = useState([{ name: "No Trades", value: 1, color: "#333" }]);
  const [stats, setStats] = useState({ netPnl: 0, winRate: 0, totalTrades: 0, openPositions: 0, maxDrawdown: 0, avgWin: 0, avgLoss: 0, maxWin: 0, maxLoss: 0 });

  // 🔴 THE BRAIN: Fetch and calculate everything from localStorage
  useEffect(() => {
    const calculatePerformance = () => {
      const closed = JSON.parse(localStorage.getItem("closedTrades")) || [];
      const active = JSON.parse(localStorage.getItem("activeTrades")) || [];
      const pending = JSON.parse(localStorage.getItem("pendingOrders")) || [];

      // 1. Equity Curve Data (Sort oldest to newest)
      const sortedForCurve = [...closed].sort((a, b) => (a.closeTime || a.id) - (b.closeTime || b.id));
      
      let cumulative = 10000; // Starting base balance
      let peak = 10000;
      let maxDd = 0;
      let wins = 0;
      let losses = 0;
      let totalWinAmount = 0;
      let totalLossAmount = 0;
      let maxWin = 0;
      let maxLoss = 0;

      const curveData = [{ trade: "Start", pnl: 0, cumulative: 10000, isWin: true }];

      sortedForCurve.forEach((t, i) => {
        const pnl = t.pnl || 0;
        cumulative += pnl;

        if (pnl >= 0) {
          wins++;
          totalWinAmount += pnl;
          if (pnl > maxWin) maxWin = pnl;
        } else {
          losses++;
          totalLossAmount += pnl;
          if (pnl < maxLoss) maxLoss = pnl;
        }

        if (cumulative > peak) peak = cumulative;
        const drawdown = peak > 0 ? ((peak - cumulative) / peak) * 100 : 0;
        if (drawdown > maxDd) maxDd = drawdown;

        curveData.push({
          trade: `Trade ${i + 1}`,
          pnl: pnl,
          cumulative: cumulative,
          isWin: pnl >= 0,
        });
      });

      setTradeData(curveData);

      // 2. Win/Loss Pie Data
      if (wins > 0 || losses > 0) {
        setWinLossData([
          { name: "Winning Trades", value: wins, color: "#10b981" },
          { name: "Losing Trades", value: losses, color: "#ef4444" },
        ]);
      } else {
        setWinLossData([{ name: "No Trades", value: 1, color: "#1a202c" }]);
      }

      // 3. Stats Calculation
      setStats({
        netPnl: cumulative - 10000,
        winRate: closed.length > 0 ? (wins / closed.length) * 100 : 0,
        totalTrades: closed.length,
        openPositions: active.length + pending.length,
        maxDrawdown: maxDd,
        avgWin: wins > 0 ? totalWinAmount / wins : 0,
        avgLoss: losses > 0 ? totalLossAmount / losses : 0,
        maxWin: maxWin,
        maxLoss: maxLoss
      });

      // 4. Best & Worst Trades Tables
      const sortedByPnl = [...closed].sort((a, b) => (b.pnl || 0) - (a.pnl || 0));
      const formatDate = (ts) => new Date(ts).toLocaleString('en-GB', { day: '2-digit', month: 'short' });

      const formatTrade = (t) => ({
        id: t.id,
        asset: `${t.asset}/USDT`,
        type: t.type === "Buy" ? "Long" : "Short",
        pnl: `${t.pnl >= 0 ? '+' : '-'}$${Math.abs(t.pnl).toFixed(2)}`,
        pct: `${t.pnl >= 0 ? '+' : '-'}${Math.abs(((t.pnl) / (t.investment || 1)) * 100).toFixed(2)}%`,
        date: formatDate(t.closeTime || t.id),
        isProfit: t.pnl >= 0
      });

      setBestTrades(sortedByPnl.filter(t => t.pnl > 0).slice(0, 5).map(formatTrade));
      setWorstTrades([...sortedByPnl].filter(t => t.pnl < 0).reverse().slice(0, 5).map(formatTrade));
    };

    calculatePerformance();
    window.addEventListener("storage", calculatePerformance);
    window.addEventListener("tradesUpdated", calculatePerformance);

    return () => {
      window.removeEventListener("storage", calculatePerformance);
      window.removeEventListener("tradesUpdated", calculatePerformance);
    };
  }, []);

  return (
    <div
      className="mx-2 md:mx-4 my-6 flex flex-col gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* ─── HEADER ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 mt-2 md:mt-0">
        <div>
          <h1 className="text-white font-extrabold text-base md:text-lg tracking-wide flex items-center gap-2">
            <FiTrendingUp className="text-emerald-400" size={16} />
            Performance Overview
          </h1>
          <p className="text-gray-400 text-[10px] md:text-xs mt-1">
            Track your trade-by-trade analytics and equity curve.
          </p>
        </div>

        <div className="flex bg-[#0a0d11] border border-white/30 rounded-lg p-1 w-full md:w-auto overflow-x-auto custom-scrollbar">
          {["All Time Analytics"].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 bg-[#1a202c] text-white shadow-sm border border-white/10`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── 1. TOP SUMMARY CARDS ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <StatCard
          title="Net P/L"
          value={`${stats.netPnl >= 0 ? '+' : '-'}$${Math.abs(stats.netPnl).toFixed(2)}`}
          subtext="Total Realized Return"
          icon={<FiTrendingUp size={16} />}
          isProfit={stats.netPnl >= 0}
          isWarning={stats.netPnl < 0}
        />
        <StatCard
          title="Win Rate"
          value={`${stats.winRate.toFixed(1)}%`}
          subtext={stats.winRate > 50 ? "Profitable Strategy" : "Needs Optimization"}
          icon={<FiTarget size={16} />}
          isProfit={stats.winRate >= 50}
          isWarning={stats.winRate > 0 && stats.winRate < 50}
        />
        <StatCard
          title="Total Trades"
          value={stats.totalTrades}
          subtext={`${stats.openPositions} active/pending`}
          icon={<FiAward size={16} />}
          isProfit={false}
        />
        <StatCard
          title="Max Drawdown"
          value={`-${stats.maxDrawdown.toFixed(2)}%`}
          subtext={stats.maxDrawdown < 10 ? "Healthy risk level" : "High risk exposure"}
          icon={<FiAlertOctagon size={16} />}
          isProfit={false}
          isWarning={stats.maxDrawdown > 10}
        />
      </div>

      {/* ─── 2. MAIN SPLIT (75% Chart / 25% Stats) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6">
        {/* LEFT PANEL: Equity Curve */}
        <div className="lg:col-span-3 bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              Equity Curve (Per Trade)
            </h2>
          </div>

          <div className="w-full h-[250px] md:h-[350px] min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={tradeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={stats.netPnl >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={stats.netPnl >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="trade"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "#ffffff", fontSize: 10, fontFamily: "DM Mono" }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "#f9fbfe", fontSize: 10, fontFamily: "DM Mono" }}
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke={stats.netPnl >= 0 ? "#10b981" : "#ef4444"}
                  strokeWidth={2.5}
                  fill="url(#colorCumulative)"
                  activeDot={{ r: 6, fill: stats.netPnl >= 0 ? "#10b981" : "#ef4444", stroke: "#0a0d11", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT PANEL: Mini Stats & Distribution */}
        <div className="lg:col-span-1 flex flex-col gap-5 md:gap-6">
          <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-5 flex-1 shadow-lg">
            <h2 className="text-white font-bold text-xs md:text-sm tracking-wide mb-4">
              Trade Distribution
            </h2>
            <div className="h-[140px] relative flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winLossData}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#0a0d11", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white font-bold text-lg font-mono">
                  {stats.totalTrades}
                </span>
                <span className="text-gray-500 text-[9px] uppercase font-bold">
                  Trades
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] md:text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-gray-400">Winning Trades</span>
                </div>
                <span className="text-white font-mono font-bold">
                  {winLossData[0]?.value === 1 && stats.totalTrades === 0 ? 0 : winLossData[0]?.value} ({stats.totalTrades > 0 ? stats.winRate.toFixed(1) : 0}%)
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] md:text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Losing Trades</span>
                </div>
                <span className="text-white font-mono font-bold">
                  {winLossData[1] ? winLossData[1].value : 0} ({stats.totalTrades > 0 ? (100 - stats.winRate).toFixed(1) : 0}%)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-5 flex-1 shadow-lg">
            <h2 className="text-white font-bold text-xs md:text-sm tracking-wide mb-4">
              Performance Summary
            </h2>
            <div className="flex flex-col gap-3.5">
              {[
                { label: "Average Win", val: `+$${stats.avgWin.toFixed(2)}`, color: "text-emerald-400" },
                { label: "Average Loss", val: `-$${Math.abs(stats.avgLoss).toFixed(2)}`, color: "text-red-400" },
                { label: "Largest Win", val: `+$${stats.maxWin.toFixed(2)}`, color: "text-emerald-400" },
                { label: "Largest Loss", val: `-$${Math.abs(stats.maxLoss).toFixed(2)}`, color: "text-red-400" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-300 text-[10px] md:text-xs">{item.label}</span>
                  <span className={`font-mono font-bold text-[10px] md:text-xs ${item.color}`}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── 3. BOTTOM TABLES: Best & Worst Trades ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* Best Trades Table */}
        <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-emerald-400 font-bold text-xs md:text-sm tracking-wide flex items-center gap-2">
              <FiArrowUpRight /> Best Trades (Top 5)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[9px] uppercase border-b border-white/30">
                  <th className="pb-2 font-semibold">Asset</th>
                  <th className="pb-2 font-semibold text-center">Type</th>
                  <th className="pb-2 font-semibold text-right">P/L</th>
                  <th className="pb-2 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-[11px] md:text-xs">
                {bestTrades.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4 text-gray-500 font-mono">No profitable trades yet</td></tr>
                ) : bestTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2.5 font-bold text-white">{trade.asset}</td>
                    <td className={`py-2.5 text-center font-bold ${trade.type === "Long" ? "text-emerald-400" : "text-red-400"}`}>{trade.type}</td>
                    <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">{trade.pnl}</td>
                    <td className="py-2.5 text-right text-gray-300">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Worst Trades Table */}
        <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-red-400 font-bold text-xs md:text-sm tracking-wide flex items-center gap-2">
              <FiArrowDownRight /> Worst Trades (Bottom 5)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[9px] uppercase border-b border-white/30">
                  <th className="pb-2 font-semibold">Asset</th>
                  <th className="pb-2 font-semibold text-center">Type</th>
                  <th className="pb-2 font-semibold text-right">P/L</th>
                  <th className="pb-2 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-[11px] md:text-xs">
                {worstTrades.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4 text-gray-500 font-mono">No losing trades yet</td></tr>
                ) : worstTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2.5 font-bold text-white">{trade.asset}</td>
                    <td className={`py-2.5 text-center font-bold ${trade.type === "Long" ? "text-emerald-400" : "text-red-400"}`}>{trade.type}</td>
                    <td className="py-2.5 text-right font-mono text-red-400 font-bold">{trade.pnl}</td>
                    <td className="py-2.5 text-right text-gray-300">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
import React, { useState } from "react";
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
// 1. MOCK DATA (Trade-by-Trade)
// ════════════════════════════════════════════════════════════

// Generating Trade-by-Trade Cumulative P/L data
const generateTradeData = () => {
  let cumulative = 10000; // Starting Balance
  const data = [];
  for (let i = 1; i <= 50; i++) {
    // Random profit or loss per trade
    const pnl = Math.floor(Math.random() * 400) - 150;
    cumulative += pnl;
    data.push({
      trade: `Trade ${i}`,
      pnl: pnl,
      cumulative: cumulative,
      isWin: pnl > 0,
    });
  }
  return data;
};

const tradeData = generateTradeData();

// Best & Worst Trades Data
const bestTrades = [
  {
    id: 1,
    asset: "BTC/USDT",
    type: "Long",
    pnl: "+$450.00",
    pct: "+12.5%",
    date: "12 Jun",
  },
  {
    id: 2,
    asset: "ETH/USDT",
    type: "Long",
    pnl: "+$320.50",
    pct: "+8.4%",
    date: "10 Jun",
  },
  {
    id: 3,
    asset: "SOL/USDT",
    type: "Short",
    pnl: "+$180.20",
    pct: "+5.2%",
    date: "08 Jun",
  },
];

const worstTrades = [
  {
    id: 1,
    asset: "XRP/USDT",
    type: "Long",
    pnl: "-$150.00",
    pct: "-4.5%",
    date: "11 Jun",
  },
  {
    id: 2,
    asset: "DOGE/USDT",
    type: "Long",
    pnl: "-$95.20",
    pct: "-8.1%",
    date: "09 Jun",
  },
  {
    id: 3,
    asset: "ADA/USDT",
    type: "Short",
    pnl: "-$60.00",
    pct: "-2.2%",
    date: "05 Jun",
  },
];

// Win/Loss Pie Chart Data
const winLossData = [
  { name: "Winning Trades", value: 107, color: "#10b981" }, // Emerald 500
  { name: "Losing Trades", value: 49, color: "#ef4444" }, // Red 500
];

// ════════════════════════════════════════════════════════════
// 2. INTERNAL COMPONENTS
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
          <span className="font-bold">${data.cumulative.toLocaleString()}</span>
        </p>
        <p
          className={`font-mono text-xs font-bold ${data.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}
        >
          Trade P/L: {data.pnl >= 0 ? "+" : ""}${data.pnl}
        </p>
      </div>
    );
  }
  return null;
};

// Summary Card Component
const StatCard = ({ title, value, subtext, icon, isProfit }) => (
  <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-5 flex flex-col justify-between hover:border-white/20 transition-colors group relative overflow-hidden">
    {isProfit && (
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
    )}
    <div className="flex justify-between items-start mb-3 relative z-10">
      <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">
        {title}
      </h3>
      <span
        className={`p-1.5 rounded-lg bg-white/5 ${isProfit ? "text-emerald-400" : "text-sky-400"}`}
      >
        {icon}
      </span>
    </div>
    <div className="relative z-10">
      <p
        className={`text-xl md:text-2xl font-bold font-mono tracking-tight ${isProfit ? "text-emerald-400" : "text-white"}`}
      >
        {value}
      </p>
      <p className="text-[9px] md:text-[10px] font-bold text-emerald-500/80 mt-1">
        {subtext}
      </p>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════
// 3. MAIN PERFORMANCE COMPONENT
// ════════════════════════════════════════════════════════════

const Performance = () => {
  return (
    <div
      className="mx-2 md:mx-4 my-6 flex flex-col gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* ─── HEADER ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-white font-extrabold text-xl md:text-2xl tracking-wide flex items-center gap-2">
            Performance Overview
          </h1>
          <p className="text-gray-400 text-[10px] md:text-xs mt-1">
            Track your trade-by-trade analytics and equity curve.
          </p>
        </div>
        <div className="flex bg-[#0a0d11] border border-white/30 rounded-lg p-1">
          {["Last 50 Trades", "Last 100 Trades", "All Time"].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-md transition-all ${i === 0 ? "bg-[#1a202c] text-white shadow-sm" : "text-gray-500 hover:text-white"}`}
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
          value="+$2,450.80"
          subtext="+$340.00 this week"
          icon={<FiTrendingUp size={16} />}
          isProfit={true}
        />
        <StatCard
          title="Win Rate"
          value="68.42%"
          subtext="+2.1% vs avg"
          icon={<FiTarget size={16} />}
          isProfit={true}
        />
        <StatCard
          title="Total Trades"
          value="156"
          subtext="32 open positions"
          icon={<FiAward size={16} />}
          isProfit={false}
        />
        <StatCard
          title="Max Drawdown"
          value="-4.20%"
          subtext="Healthy risk level"
          icon={<FiAlertOctagon size={16} className="text-red-400" />}
          isProfit={false}
        />
      </div>

      {/* ─── 2. MAIN SPLIT (75% Chart / 25% Stats) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6">
        {/* LEFT PANEL (75% width): Trade-by-Trade Line Chart */}
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
                  <linearGradient
                    id="colorCumulative"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="trade"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{
                    fill: "#ffffff",
                    fontSize: 10,
                    fontFamily: "DM Mono",
                  }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30}
                />
                <YAxis
                  domain={["dataMin - 200", "dataMax + 200"]}
                  stroke="rgba(255,255,255,0.2)"
                  tick={{
                    fill: "#f9fbfe",
                    fontSize: 10,
                    fontFamily: "DM Mono",
                  }}
                  tickFormatter={(val) => `$${val}`}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#colorCumulative)"
                  activeDot={{
                    r: 6,
                    fill: "#10b981",
                    stroke: "#0a0d11",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT PANEL (25% width): Mini Stats & Distribution */}
        <div className="lg:col-span-1 flex flex-col gap-5 md:gap-6">
          {/* Win/Loss Distribution Donut */}
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
                    contentStyle={{
                      backgroundColor: "#0a0d11",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-white font-bold text-lg font-mono">
                  156
                </span>
                <span className="text-gray-500 text-[9px] uppercase font-bold">
                  Trades
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] md:text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-gray-400">Winning Trades</span>
                </div>
                <span className="text-white font-mono font-bold">
                  107 (68.5%)
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px] md:text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Losing Trades</span>
                </div>
                <span className="text-white font-mono font-bold">
                  49 (31.4%)
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-4 md:p-5 flex-1 shadow-lg">
            <h2 className="text-white font-bold text-xs md:text-sm tracking-wide mb-4">
              Performance Summary
            </h2>
            <div className="flex flex-col gap-3.5">
              {[
                {
                  label: "Average Win",
                  val: "+$345.80",
                  color: "text-emerald-400",
                },
                {
                  label: "Average Loss",
                  val: "-$125.40",
                  color: "text-red-400",
                },
                {
                  label: "Largest Win",
                  val: "+$1,450.00",
                  color: "text-emerald-400",
                },
                {
                  label: "Largest Loss",
                  val: "-$450.00",
                  color: "text-red-400",
                },
                {
                  label: "Avg Trade Duration",
                  val: "2h 45m",
                  color: "text-white",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-gray-300 text-[10px] md:text-xs">
                    {item.label}
                  </span>
                  <span
                    className={`font-mono font-bold text-[10px] md:text-xs ${item.color}`}
                  >
                    {item.val}
                  </span>
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
              <FiArrowUpRight /> Best Trades
            </h2>
            <button className="text-gray-500 text-[10px] hover:text-white transition-colors">
              View All
            </button>
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
                {bestTrades.map((trade) => (
                  <tr
                    key={trade.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-2.5 font-bold text-white">
                      {trade.asset}
                    </td>
                    <td
                      className={`py-2.5 text-center font-bold ${trade.type === "Long" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {trade.type}
                    </td>
                    <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">
                      {trade.pnl}
                    </td>
                    <td className="py-2.5 text-right text-gray-300">
                      {trade.date}
                    </td>
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
              <FiArrowDownRight /> Worst Trades
            </h2>
            <button className="text-gray-500 text-[10px] hover:text-white transition-colors">
              View All
            </button>
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
                {worstTrades.map((trade) => (
                  <tr
                    key={trade.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-2.5 font-bold text-white">
                      {trade.asset}
                    </td>
                    <td
                      className={`py-2.5 text-center font-bold ${trade.type === "Long" ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {trade.type}
                    </td>
                    <td className="py-2.5 text-right font-mono text-red-400 font-bold">
                      {trade.pnl}
                    </td>
                    <td className="py-2.5 text-right text-gray-300">
                      {trade.date}
                    </td>
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

import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiEye,
  FiTrendingUp,
  FiTrendingDown,
  FiStar,
  FiBell,
  FiActivity,
} from "react-icons/fi";

// 1. MOCK DATA
const initialWishlist = [
  {
    id: 1,
    sno: "01",
    asset: "BTC",
    name: "Bitcoin",
    price: "59,498.80",
    change: "+2.45%",
    isUp: true,
    status: "Bullish",
    color: "bg-[#F7931A]",
  },
  {
    id: 2,
    sno: "02",
    asset: "ETH",
    name: "Ethereum",
    price: "3,125.58",
    change: "-1.12%",
    isUp: false,
    status: "Bearish",
    color: "bg-[#627EEA]",
  },
  {
    id: 3,
    sno: "03",
    asset: "SOL",
    name: "Solana",
    price: "181.85",
    change: "+5.70%",
    isUp: true,
    status: "Strong Buy",
    color: "bg-[#14F195]",
  },
  {
    id: 4,
    sno: "04",
    asset: "LINK",
    name: "Chainlink",
    price: "14.20",
    change: "+1.05%",
    isUp: true,
    status: "Neutral",
    color: "bg-[#2A5ADA]",
  },
  {
    id: 5,
    sno: "05",
    asset: "MATIC",
    name: "Polygon",
    price: "0.6540",
    change: "-3.45%",
    isUp: false,
    status: "Bearish",
    color: "bg-[#8247E5]",
  },
];

const wishlistStats = [
  {
    id: 1,
    label: "TOTAL ASSETS",
    value: "5",
    icon: <FiStar />,
    type: "neutral",
  },
  {
    id: 2,
    label: "24H MOVEMENT",
    value: "+4.20%",
    icon: <FiActivity />,
    type: "profit",
  },
  {
    id: 3,
    label: "TOP PERFORMER",
    value: "SOL",
    icon: <FiTrendingUp />,
    type: "profit",
  },
  {
    id: 4,
    label: "ACTIVE ALERTS",
    value: "3",
    icon: <FiBell />,
    type: "neutral",
  },
];

// 2. INTERNAL COMPONENTS (Charts & Cards)
const MiniSparkline = ({ isUp }) => {
  const color = isUp ? "#10b981" : "#ef4444";
  const path = isUp
    ? "M0 14 L8 9 L16 12 L24 5 L32 8 L40 2"
    : "M0 2 L8 8 L16 5 L24 12 L32 9 L40 14";
  return (
    <svg
      width="45"
      height="15"
      viewBox="0 0 40 16"
      fill="none"
      className="shrink-0 mt-1"
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
        fill={`url(#gradList-${isUp})`}
        opacity="0.2"
      />
      <defs>
        <linearGradient id={`gradList-${isUp}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// --- Animated Top Grid Cards ---
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

const SummaryCard = ({ label, value, icon, type, index }) => {
  const isProfit = type === "profit";
  const borderColor = isProfit
    ? "rgba(16,185,129,0.3)"
    : "rgba(255,255,255,0.1)";
  const bgGradient = isProfit
    ? "linear-gradient(145deg, rgba(16,185,129,0.05) 0%, #05070a 100%)"
    : "linear-gradient(145deg, #0a0d11 0%, #05070a 100%)";

  return (
    <div
      className="relative rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer p-3 md:p-5 list-card-anim"
      style={{
        background: bgGradient,
        border: `3px solid ${isProfit ? borderColor : "rgba(168, 233, 238, 0.3)"}`,
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
        <span
          className={`${isProfit ? "text-emerald-500" : "text-sky-400"} opacity-80 drop-shadow-md`}
        >
          {icon}
        </span>
      </div>
      <div className="relative z-10 flex items-end justify-between gap-2">
        <p
          className={`font-mono font-bold leading-none tracking-tight ${isProfit ? "text-emerald-400" : "text-white"}`}
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

// 3. MAIN WISHLIST COMPONENT
const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [searchTerm, setSearchTerm] = useState("");

  // Interactive Functions
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleEmptyWishlist = () => {
    setWishlist([]);
  };

  const filteredList = wishlist.filter(
    (item) =>
      item.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className="mx-2 md:mx-4 my-6 flex flex-col gap-5 md:gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <style>{`
        .list-scrollbar::-webkit-scrollbar { height: 4px; }
        .list-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .list-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 10px; }
        .list-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.6); }
        
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

        .list-card-anim { animation: fadeUpSummary 0.5s ease both; }
        .card-sparkline-path { stroke-dasharray: 100; stroke-dashoffset: 100; animation: sparklineDraw 1.5s ease-out forwards; animation-delay: 0.3s; }
        .internal-glow-pulse { animation: pulseInternalGlow 3s ease-in-out infinite; }
      `}</style>

      {/* --- 1. Top Summary Grids --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {wishlistStats.map((stat, i) => (
          <SummaryCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            type={stat.type}
            index={i}
          />
        ))}
      </div>

      {/* --- 2. Search, Filter & Actions --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        {/* Search Bar */}
        <div className="flex w-full md:w-auto items-center gap-2 bg-[#0a0d11] border border-white/30 rounded-lg px-3 py-2 md:py-2.5 focus-within:border-emerald-500/50 transition-colors">
          <FiSearch className="text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-[11px] md:text-sm w-full md:w-64 placeholder:text-gray-600"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0a0d11] hover:bg-white/5 border border-white/30 text-gray-300 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-[10px] md:text-xs font-bold transition-all">
            <FiFilter /> Filter
          </button>
          <button
            onClick={handleEmptyWishlist}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-[10px] md:text-xs font-bold transition-all"
          >
            <FiTrash2 /> Empty List
          </button>
        </div>
      </div>

      {/* --- 3. The Wishlist Table  */}
      <div className="bg-[#0a0d11] border border-white/30 rounded-xl p-3 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {wishlist.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-500">
            <FiStar size={40} className="mb-3 opacity-20" />
            <p className="text-sm">Your wishlist is currently empty.</p>
          </div>
        ) : (
          <div className="overflow-x-auto list-scrollbar pb-2">
            <table className="w-full min-w-[850px] text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-[9px] md:text-[11px] uppercase tracking-wider border-b border-white/30">
                  <th className="pb-3 md:pb-4 font-semibold pl-2">S.No</th>
                  <th className="pb-3 md:pb-4 font-semibold">Asset</th>
                  <th className="pb-3 md:pb-4 font-semibold text-right">
                    Price & Trend
                  </th>
                  <th className="pb-3 md:pb-4 font-semibold text-right">
                    24H %
                  </th>
                  <th className="pb-3 md:pb-4 font-semibold text-center">
                    Status
                  </th>
                  <th className="pb-3 md:pb-4 font-semibold text-center">
                    Action
                  </th>
                  <th className="pb-3 md:pb-4 font-semibold text-right pr-2">
                    Options
                  </th>
                </tr>
              </thead>

              <tbody className="text-[11px] md:text-sm">
                {filteredList.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className="border-b border-white/10 hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* S.No */}
                    <td className="py-3 md:py-4 pl-2 text-gray-500 font-mono text-[10px] md:text-xs">
                      {coin.sno}
                    </td>

                    {/* Asset Info */}
                    <td className="py-3 md:py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div
                          className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${coin.color} flex justify-center items-center text-white font-bold text-[8px] md:text-[10px] shadow-lg shrink-0`}
                        >
                          {coin.asset.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white leading-tight text-[11px] md:text-sm">
                            {coin.asset}
                          </span>
                          <span className="text-gray-500 text-[9px] md:text-[10px]">
                            {coin.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price & Mini Chart  */}
                    <td className="py-3 md:py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-gray-200 font-mono text-[11px] md:text-[14px] font-bold">
                          ${coin.price}
                        </span>
                        <MiniSparkline isUp={coin.isUp} />
                      </div>
                    </td>

                    {/* 24H % */}
                    <td
                      className={`py-3 md:py-4 text-right font-mono font-bold text-[10px] md:text-xs ${coin.isUp ? "text-emerald-400" : "text-red-500"}`}
                    >
                      <div className="flex items-center justify-end gap-1">
                        {coin.isUp ? (
                          <FiTrendingUp size={12} />
                        ) : (
                          <FiTrendingDown size={12} />
                        )}
                        {coin.change}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 md:py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-wider ${
                          coin.isUp
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {coin.status}
                      </span>
                    </td>

                    {/* Action (View Button) */}
                    <td className="py-3 md:py-4 text-center">
                      <button className="flex items-center justify-center gap-1.5 mx-auto bg-emerald-600/20 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 hover:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[9px] md:text-[11px] font-bold transition-all shadow-sm">
                        <FiEye size={12} /> View
                      </button>
                    </td>

                    {/* Options (Remove) */}
                    <td className="py-3 md:py-4 text-right pr-2">
                      <button
                        onClick={() => handleRemove(coin.id)}
                        className="p-1.5 md:p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all inline-flex items-center justify-center"
                        title="Remove from Wishlist"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

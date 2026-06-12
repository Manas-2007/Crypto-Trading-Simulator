import React, { useState } from 'react';
import { FiTrendingUp, FiActivity, FiStar } from 'react-icons/fi';

// Mock Data for the list
const cryptoAssets = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', price: '59,498.80', vol: '36.17 B', change: '+1.11%', isUp: true, color: 'bg-[#F7931A]' },
  { id: 2, symbol: 'ETH', name: 'Ethereum', price: '3,125.58', vol: '21.66 B', change: '+3.74%', isUp: true, color: 'bg-[#627EEA]' },
  { id: 3, symbol: 'XRP', name: 'XRP', price: '0.5201', vol: '5.96 B', change: '+0.07%', isUp: true, color: 'bg-[#23292F]' },
  { id: 4, symbol: 'USDT', name: 'Tether USDt', price: '0.9996', vol: '100.88 B', change: '-0.06%', isUp: false, color: 'bg-[#26A17B]' },
  { id: 5, symbol: 'DOGE', name: 'Dogecoin', price: '0.1560', vol: '5.68 B', change: '+13.63%', isUp: true, color: 'bg-[#C2A633]' },
];

const DashCoins = () => {
  const [activeTab, setActiveTab] = useState('All Assets');
  const tabs = ['All Assets', 'Tradable', 'Losers', 'Gainers'];

  return (
    // Flex-col on mobile, flex-row on desktop (75% / 25% split)
    <div className="mx-4 my-8 flex flex-col lg:flex-row gap-6 mb-8">
      
      {/* ---------------- LEFT SIDE: MARKET TABLE (75%) ---------------- */}
      <div className="w-full lg:w-[75%] bg-[#0a0d11] border border-white/30 rounded-xl p-5 flex flex-col">
        
        {/* Tabs */}
        <div className="flex space-x-2 border-b border-white/30 pb-3 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-[#1a202c] text-white shadow-sm border border-[#2a303c]' 
                  : 'text-gray-300 hover:text-gray-300 hover:bg-[#131722]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto mt-4 custom-scrollbar flex-grow">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-[11px] uppercase tracking-wider border-b border-white/30">
                <th className="pb-3 font-medium pl-2">Asset</th>
                <th className="pb-3 font-medium text-right">Last Price</th>
                <th className="pb-3 font-medium text-right">Volume (24h)</th>
                <th className="pb-3 font-medium text-right">Change (24h)</th>
                <th className="pb-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cryptoAssets.map((coin) => (
                <tr key={coin.id} className="border-b border-[#1a202c]/50 hover:bg-[#131722] transition-colors group">
                  {/* Asset Column */}
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      {/* Fake Crypto Logo */}
                      <div className={`w-8 h-8 rounded-full ${coin.color} flex justify-center items-center text-white font-bold text-[10px] shadow-lg`}>
                        {coin.symbol.charAt(0)}
                      </div>
                      <div>
                        <span className="text-white font-bold text-sm tracking-wide block">{coin.symbol}</span>
                        <span className="text-gray-500 text-[10px]">{coin.name}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Price */}
                  <td className="py-3.5 text-right text-white font-mono text-sm">
                    ${coin.price}
                  </td>
                  
                  {/* Volume */}
                  <td className="py-3.5 text-right text-gray-400 font-mono text-xs">
                    {coin.vol}
                  </td>
                  
                  {/* Change */}
                  <td className={`py-3.5 text-right font-bold text-xs ${coin.isUp ? 'text-emerald-400' : 'text-red-500'}`}>
                    {coin.change}
                  </td>
                  
                  {/* Action Button */}
                  <td className="py-3.5 text-center">
                    <button className="bg-[#1a202c] hover:bg-emerald-600 text-emerald-500 text-white px-5 py-1.5 rounded text-xs font-bold transition-all opacity-80 group-hover:opacity-100 shadow-sm border border-[#2a303c] border-emerald-500">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE: ANIMATED QUOTE PANEL (25%) ---------------- */}
      <div className="w-full lg:w-[25%] lg:min-w-[320px] relative overflow-hidden rounded-3xl">

  {/* Animated Styles */}
  <style>{`
    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }

    @keyframes floatSlow {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }

    @keyframes rotateGlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes pulseGlow {
      0%,100% { opacity: .5; }
      50% { opacity: 1; }
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }

    @keyframes drawLine {
      from {
        stroke-dashoffset: 1000;
      }
      to {
        stroke-dashoffset: 0;
      }
    }

    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }

    @keyframes blink {
      50% { border-color: transparent; }
    }

    .glass-card {
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
    }

    .floating {
      animation: float 4s ease-in-out infinite;
    }

    .floating-slow {
      animation: floatSlow 6s ease-in-out infinite;
    }

    .rotate-glow {
      animation: rotateGlow 12s linear infinite;
    }

    .pulse-glow {
      animation: pulseGlow 3s infinite;
    }

    .chart-line {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: drawLine 3s ease forwards;
    }

    .typewriter {
      overflow: hidden;
      white-space: nowrap;
      border-right: 2px solid #10b981;
      animation:
        typing 4s steps(60,end),
        blink .8s infinite;
    }

    .shimmer {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .shimmer::before {
      content: "";
      position: absolute;
      top: 0;
      left: -150%;
      width: 60%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,0.08),
        transparent
      );
      animation: shimmer 5s infinite;
    }
  `}</style>

  {/* Main Glass Card */}
  <div className="glass-card relative min-h-[500px] rounded-3xl flex flex-col items-center justify-center p-6 md:p-8 text-center overflow-hidden">

    {/* Animated Border Glow */}
    <div className="absolute inset-0 rounded-3xl p-[1px]">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-30 blur-xl rotate-glow"></div>
    </div>

    {/* Shimmer Effect */}
    <div className="shimmer"></div>

    {/* Background Glow Orbs */}
    <div className="absolute top-10 left-5 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pulse-glow"></div>

    <div
      className="absolute bottom-10 right-5 w-36 h-36 bg-cyan-500/20 blur-3xl rounded-full pulse-glow"
      style={{ animationDelay: "1s" }}
    ></div>

    {/* Floating Particles */}
    <div className="absolute top-20 right-10 floating text-emerald-400/20">
      <FiStar size={24} />
    </div>

    <div className="absolute bottom-24 left-8 floating-slow text-cyan-400/20">
      <FiTrendingUp size={30} />
    </div>

    <div className="absolute top-1/3 left-4 floating text-white/10">
      <FiActivity size={22} />
    </div>

    {/* Center Glow Ring */}
    <div className="absolute w-52 h-52 rounded-full border border-emerald-500/20 rotate-glow"></div>

    <div
      className="absolute w-72 h-72 rounded-full border border-cyan-500/10 rotate-glow"
      style={{ animationDuration: "20s" }}
    ></div>

    {/* Main Content */}
    <div className="relative z-10 flex flex-col items-center">

      {/* Icon */}
      <div className="floating mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/30 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,.35)]">
          <FiActivity
            className="text-emerald-400"
            size={30}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
        Trader's Edge
      </h3>

      {/* Quote */}
      <div className="max-w-[260px] md:max-w-[320px]">
        <p className="text-gray-200 text-sm md:text-base italic leading-relaxed">
          “Success in trading isn't about being right every time.
          It's about staying disciplined, managing risk,
          and letting winners grow.”
        </p>
      </div>

      {/* Author */}
      <span className="mt-4 text-emerald-400 text-xs md:text-sm font-semibold tracking-widest uppercase">
        — Stay Consistent
      </span>

      {/* Motivation Badge */}
      <div className="mt-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
        🚀 Every Trade Is A Lesson
      </div>

    </div>

    {/* Animated Stock Chart */}
    <svg
      className="absolute bottom-0 left-0 w-full h-32 opacity-70"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
    >
      <path
        d="M0 30 L0 25 L10 20 L20 23 L35 14 L45 18 L60 8 L75 14 L90 5 L100 10 L100 30 Z"
        fill="url(#chartFill)"
      />

      <path
        d="M0 25 L10 20 L20 23 L35 14 L45 18 L60 8 L75 14 L90 5 L100 10"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        className="chart-line"
      />

      <defs>
        <linearGradient
          id="chartFill"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#10b981"
            stopOpacity="0.5"
          />
          <stop
            offset="100%"
            stopColor="#10b981"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
    </svg>

  </div>
</div>
    </div>
  );
};

export default DashCoins;
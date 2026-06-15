import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

// Hum base coins define kar rahe hain jo ribbon mein ghumenge
const baseCoins = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "AVAX", "DOT", "MATIC"];

const PriceRibbon = () => {
  const [liveTickers, setLiveTickers] = useState({});

  // 🔴 1. Connect to Live WebSocket Feed
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("all_tickers", (data) => setLiveTickers(data));
    return () => socket.disconnect();
  }, []);

  // 🔴 2. Format Live Data for the Ribbon
  const dynamicTickerData = baseCoins.map((coin) => {
    const ticker = liveTickers[`${coin}USDT`];
    
    // Fallback if data is still loading
    const currentPrice = ticker ? parseFloat(ticker.c) : 0;
    const priceFormatted = currentPrice ? currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : "---";
    
    const changeRaw = ticker ? parseFloat(ticker.P) : 0;
    const isUp = changeRaw >= 0;
    const changeFormatted = ticker ? `${isUp ? "+" : ""}${changeRaw.toFixed(2)}%` : "0.00%";

    return {
      name: coin,
      price: priceFormatted,
      change: changeFormatted,
      isUp: isUp,
    };
  });

  return (
    <div className="mx-2 md:mx-4 overflow-hidden bg-[#0d1015] border border-white/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] rounded-xl">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-premium {
          display: flex;
          /* max-content ensures it adapts perfectly to the items inside */
          width: max-content; 
          animation: marquee 25s linear infinite;
        }
        /* Pause animation on hover for better UX */
        .animate-marquee-premium:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 🔴 3. Render using dynamic data */}
      <div className="animate-marquee-premium">
        {/* Array ko double kiya taaki infinite loop smooth lage */}
        {[...dynamicTickerData, ...dynamicTickerData].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-3 border-r border-white/30 hover:bg-white/5 transition-colors duration-300 shrink-0"
          >
            {/* Coin Name Badge */}
            <div className="flex items-center gap-1.5 border border-white/10 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-md bg-[#0a0d11]">
              <span className="text-white font-extrabold text-[10px] md:text-sm tracking-tight">
                {item.name}
              </span>
            </div>

            {/* Price */}
            <span className="font-mono text-gray-100 text-[11px] md:text-sm font-medium tracking-wide drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
              ${item.price}
            </span>

            {/* Change Badge */}
            <div
              className={`flex items-center gap-0.5 md:gap-1 font-bold px-1.5 py-0.5 md:px-2 rounded text-[9px] md:text-xs ${
                item.isUp
                  ? "bg-emerald-950/40 text-emerald-400 border border-emerald-700 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                  : "bg-red-950/40 text-red-400 border border-red-700 shadow-[0_0_8px_rgba(239,68,68,0.2)]"
              }`}
            >
              {item.isUp ? (
                <FiArrowUpRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
              ) : (
                <FiArrowDownRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
              )}
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRibbon;
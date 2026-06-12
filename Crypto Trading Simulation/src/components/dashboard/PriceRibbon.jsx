import React from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

const tickerData = [
  { name: "BTC", price: "45,581.50", change: "+2.4%", isUp: true },
  { name: "ETH", price: "3,125.80", change: "-1.2%", isUp: false },
  { name: "SOL", price: "181.85", change: "+5.1%", isUp: true },
  { name: "BNB", price: "590.20", change: "+0.8%", isUp: true },
  { name: "XRP", price: "0.5201", change: "-2.3%", isUp: false },
  { name: "ADA", price: "0.455", change: "+1.9%", isUp: true },
  { name: "DOGE", price: "0.151", change: "+4.2%", isUp: true },
];

const PriceRibbon = () => {
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

      <div className="animate-marquee-premium">
        {[...tickerData, ...tickerData].map((item, index) => (
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

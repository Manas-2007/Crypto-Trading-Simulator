import React from "react";

const DashCandle = () => {
  return (
    <div className="mx-4 mt-5 mb-10">
      {/* Section Header */}
      <div className="mb-4 md:mb-5 flex justify-between items-end">
        <div>
          <h2 className="text-white font-extrabold text-[13px] md:text-base tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            Live Pattern Recognition
          </h2>
          <p className="text-gray-400 text-[10px] md:text-xs mt-1 md:mt-1.5 font-medium">
            Detected market candlestick formations in real-time
          </p>
        </div>
      </div>

      {/* Internal CSS for Candle Animations */}
      <style>{`
        @keyframes engulfingGreen {
          0%, 20% { transform: scaleY(0.2); opacity: 0.5; }
          50%, 80% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 15px rgba(16,185,129,0.5); }
          100% { transform: scaleY(0.2); opacity: 0.5; }
        }
        @keyframes engulfingRed {
          0%, 20% { transform: scaleY(0.2); opacity: 0.5; }
          50%, 80% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 15px rgba(239,68,68,0.5); }
          100% { transform: scaleY(0.2); opacity: 0.5; }
        }
        @keyframes wickGrowDown {
          0%, 20% { transform: scaleY(0); }
          50%, 80% { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }
        @keyframes wickGrowUp {
          0%, 20% { transform: scaleY(0); }
          50%, 80% { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }
        @keyframes dojiPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; box-shadow: 0 0 15px rgba(255,255,255,0.4); }
        }
        @keyframes cascadeGrow {
          0%, 30% { transform: scaleY(0.2); opacity: 0.3; }
          60%, 100% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 10px rgba(16,185,129,0.3); }
        }
        
        .anim-engulf-bull { animation: engulfingGreen 3s ease-in-out infinite; transform-origin: bottom; }
        .anim-engulf-bear { animation: engulfingRed 3s ease-in-out infinite; transform-origin: top; }
        .anim-wick-down { animation: wickGrowDown 3s ease-in-out infinite; transform-origin: top; }
        .anim-wick-up { animation: wickGrowUp 3s ease-in-out infinite; transform-origin: bottom; }
        .anim-doji { animation: dojiPulse 2.5s ease-in-out infinite; }
        
        .anim-cascade-1 { animation: cascadeGrow 3s ease-in-out infinite; transform-origin: bottom; }
        .anim-cascade-2 { animation: cascadeGrow 3s ease-in-out infinite 0.2s; transform-origin: bottom; }
        .anim-cascade-3 { animation: cascadeGrow 3s ease-in-out infinite 0.4s; transform-origin: bottom; }
      `}</style>

      {/* 8 Cards Grid (2 Cols on Mobile, 2 Cols Tablet, 4 Cols on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {/* 1. Bullish Engulfing */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="absolute left-[20%] md:left-4 bottom-[30%] md:bottom-5 w-[15%] md:w-3 h-[25%] md:h-5 bg-red-500 rounded-sm opacity-60"></div>
            <div className="absolute left-[25%] md:left-[21px] bottom-[20%] md:bottom-3 w-[5%] md:w-[2px] h-[45%] md:h-9 bg-red-500 opacity-40"></div>
            <div className="absolute right-[20%] md:right-4 bottom-[20%] md:bottom-3 w-[15%] md:w-3 h-[60%] md:h-12 bg-emerald-500 rounded-sm anim-engulf-bull"></div>
            <div className="absolute right-[25%] md:right-[21px] bottom-[10%] md:bottom-1 w-[5%] md:w-[2px] h-[80%] md:h-16 bg-emerald-500 opacity-80"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-emerald-400 transition-colors">
              Bullish Engulfing
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              Buyers completely overwhelm sellers. Strong uptrend signal.
            </p>
          </div>
        </div>

        {/* 2. Hammer */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="absolute top-[20%] md:top-4 w-[20%] md:w-4 h-[25%] md:h-5 bg-emerald-500 rounded-sm z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <div className="absolute top-[10%] md:top-2 w-[5%] md:w-[2px] h-[15%] md:h-3 bg-emerald-500 opacity-60"></div>
            <div className="absolute top-[45%] md:top-9 w-[5%] md:w-[2px] h-[45%] md:h-9 bg-emerald-500 opacity-80 anim-wick-down"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-emerald-400 transition-colors">
              Hammer
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              Sharp rejection of lower prices indicating bulls stepping in.
            </p>
          </div>
        </div>

        {/* 3. Bearish Engulfing */}
        <div className="bg-[#0a0d11] border border-red-500/50 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="absolute left-[20%] md:left-4 top-[25%] md:top-5 w-[15%] md:w-3 h-[25%] md:h-5 bg-emerald-500 rounded-sm opacity-60"></div>
            <div className="absolute left-[25%] md:left-[21px] top-[15%] md:top-3 w-[5%] md:w-[2px] h-[45%] md:h-9 bg-emerald-500 opacity-40"></div>
            <div className="absolute right-[20%] md:right-4 top-[15%] md:top-3 w-[15%] md:w-3 h-[60%] md:h-12 bg-red-500 rounded-sm anim-engulf-bear"></div>
            <div className="absolute right-[25%] md:right-[21px] top-[5%] md:top-1 w-[5%] md:w-[2px] h-[80%] md:h-16 bg-red-500 opacity-80"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-red-400 transition-colors">
              Bearish Engulfing
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              Sellers totally dominate buyers. Signals potential downtrend.
            </p>
          </div>
        </div>

        {/* 4. Doji Star */}
        <div className="bg-[#0a0d11] border border-gray-500/40 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="w-[25%] md:w-5 h-[2px] bg-gray-200 z-10 anim-doji"></div>
            <div className="absolute top-[10%] md:top-2 bottom-[10%] md:bottom-2 w-[5%] md:w-[2px] bg-gray-400 opacity-60"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-gray-200 transition-colors">
              Doji Star
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              Market indecision. Buying & selling pressure are equal.
            </p>
          </div>
        </div>

        {/* 5. Three White Soldiers */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="absolute left-[15%] md:left-3 bottom-[15%] md:bottom-3 w-[12%] md:w-2.5 h-[25%] md:h-5 bg-emerald-500 rounded-sm anim-cascade-1 opacity-80"></div>
            <div className="absolute left-[40%] md:left-8 bottom-[35%] md:bottom-7 w-[12%] md:w-2.5 h-[30%] md:h-6 bg-emerald-500 rounded-sm anim-cascade-2 opacity-90"></div>
            <div className="absolute left-[65%] md:left-[52px] bottom-[60%] md:bottom-12 w-[12%] md:w-2.5 h-[35%] md:h-7 bg-emerald-500 rounded-sm anim-cascade-3"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-emerald-400 transition-colors">
              3 White Soldiers
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              Strong bullish force. Three consecutive long green bodies.
            </p>
          </div>
        </div>

        {/* 6. Shooting Star */}
        <div className="bg-[#0a0d11] border border-red-500/50 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="absolute bottom-[20%] md:bottom-4 w-[20%] md:w-4 h-[20%] md:h-4 bg-red-500 rounded-sm z-10 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <div className="absolute bottom-[10%] md:bottom-2 w-[5%] md:w-[2px] h-[10%] md:h-2 bg-red-500 opacity-60"></div>
            <div className="absolute bottom-[40%] md:bottom-8 w-[5%] md:w-[2px] h-[50%] md:h-10 bg-red-500 opacity-80 anim-wick-up"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-red-400 transition-colors">
              Shooting Star
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              Bearish rejection. Long upper wick shows selling.
            </p>
          </div>
        </div>

        {/* 7. Morning Star */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="absolute left-[15%] md:left-3 top-[15%] md:top-3 w-[12%] md:w-2.5 h-[40%] md:h-8 bg-red-500 rounded-sm opacity-60"></div>
            <div className="absolute left-[42%] md:left-[34px] bottom-[15%] md:bottom-3 w-[15%] md:w-3 h-[10%] md:h-2 bg-gray-300 rounded-sm opacity-80"></div>
            <div className="absolute left-[49%] md:left-[39px] bottom-[10%] md:bottom-2 w-[5%] md:w-[2px] h-[20%] md:h-4 bg-gray-300 opacity-50"></div>
            <div className="absolute right-[15%] md:right-3 bottom-[15%] md:bottom-3 w-[12%] md:w-2.5 h-[50%] md:h-10 bg-emerald-500 rounded-sm anim-cascade-3"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-emerald-400 transition-colors">
              Morning Star
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              A 3-candle pattern signaling a major bullish reversal.
            </p>
          </div>
        </div>

        {/* 8. Hanging Man */}
        <div className="bg-[#0a0d11] border border-red-500/50 rounded-xl p-3 md:p-5 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] text-center md:text-left">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            <div className="absolute top-[20%] md:top-4 w-[20%] md:w-4 h-[25%] md:h-5 bg-red-500 rounded-sm z-10 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <div className="absolute top-[10%] md:top-2 w-[5%] md:w-[2px] h-[10%] md:h-2 bg-red-500 opacity-60"></div>
            <div className="absolute top-[45%] md:top-9 w-[5%] md:w-[2px] h-[45%] md:h-9 bg-red-500 opacity-80 anim-wick-down"></div>
          </div>
          <div>
            <h3 className="text-white text-[11px] md:text-sm font-bold mb-0.5 md:mb-1.5 group-hover:text-red-400 transition-colors">
              Hanging Man
            </h3>
            <p className="text-gray-500 text-[9px] md:text-xs leading-snug md:leading-relaxed">
              Occurs at resistance. Warns of a potential drop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCandle;

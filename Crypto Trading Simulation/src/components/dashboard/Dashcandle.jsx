import React from 'react';

const DashCandle = () => {
  return (
    <div className="mx-4 mt-5 mb-10">
      
      {/* Section Header */}
      <div className="mb-5 flex justify-between items-end">
        <div>
          <h2 className="text-white font-extrabold text-base tracking-widest uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            Live Pattern Recognition
          </h2>
          <p className="text-gray-400 text-xs mt-1.5 font-medium">Detected market candlestick formations in real-time</p>
        </div>
      </div>

      {/* Internal CSS for Premium Candle Animations */}
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

      {/* 8 Cards Grid (2 Rows on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* ROW 1 */}
        {/* 1. Bullish Engulfing */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Red Candle */}
            <div className="absolute left-4 bottom-5 w-3 h-5 bg-red-500 rounded-sm opacity-60"></div>
            <div className="absolute left-[21px] bottom-3 w-[2px] h-9 bg-red-500 opacity-40"></div>
            {/* Green Animated Candle */}
            <div className="absolute right-4 bottom-3 w-3 h-12 bg-emerald-500 rounded-sm anim-engulf-bull"></div>
            <div className="absolute right-[21px] bottom-1 w-[2px] h-16 bg-emerald-500 opacity-80"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-emerald-400 transition-colors">Bullish Engulfing</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Buyers completely overwhelm sellers. Strong uptrend reversal signal.</p>
          </div>
        </div>

        {/* 2. Hammer */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Hammer Body */}
            <div className="absolute top-4 w-4 h-5 bg-emerald-500 rounded-sm z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            {/* Top Wick */}
            <div className="absolute top-2 w-[2px] h-3 bg-emerald-500 opacity-60"></div>
            {/* Animated Bottom Wick */}
            <div className="absolute top-9 w-[2px] h-9 bg-emerald-500 opacity-80 anim-wick-down"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-emerald-400 transition-colors">Hammer</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Sharp rejection of lower prices indicating bulls are stepping in.</p>
          </div>
        </div>

        {/* 3. Bearish Engulfing */}
        <div className="bg-[#0a0d11] border border-red-500/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Green Candle */}
            <div className="absolute left-4 top-5 w-3 h-5 bg-emerald-500 rounded-sm opacity-60"></div>
            <div className="absolute left-[21px] top-3 w-[2px] h-9 bg-emerald-500 opacity-40"></div>
            {/* Red Animated Candle */}
            <div className="absolute right-4 top-3 w-3 h-12 bg-red-500 rounded-sm anim-engulf-bear"></div>
            <div className="absolute right-[21px] top-1 w-[2px] h-16 bg-red-500 opacity-80"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-red-400 transition-colors">Bearish Engulfing</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Sellers totally dominate buyers. Signals a potential downtrend.</p>
          </div>
        </div>

        {/* 4. Doji Star */}
        <div className="bg-[#0a0d11] border border-gray-300/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Doji Body (Cross) */}
            <div className="w-5 h-[2px] bg-gray-200 z-10 anim-doji"></div>
            {/* Wicks */}
            <div className="absolute top-2 bottom-2 w-[2px] bg-gray-400 opacity-60"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-gray-200 transition-colors">Doji Star</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Market indecision. Buying and selling pressure are perfectly equal.</p>
          </div>
        </div>


        {/* ROW 2 - NEW CANDLES */}
        {/* 5. Three White Soldiers */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Soldier 1 */}
            <div className="absolute left-3 bottom-3 w-2.5 h-5 bg-emerald-500 rounded-sm anim-cascade-1 opacity-80"></div>
            {/* Soldier 2 */}
            <div className="absolute left-8 bottom-7 w-2.5 h-6 bg-emerald-500 rounded-sm anim-cascade-2 opacity-90"></div>
            {/* Soldier 3 */}
            <div className="absolute left-[52px] bottom-12 w-2.5 h-7 bg-emerald-500 rounded-sm anim-cascade-3"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-emerald-400 transition-colors">3 White Soldiers</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Strong bullish force. Three consecutive long green bodies.</p>
          </div>
        </div>

        {/* 6. Shooting Star */}
        <div className="bg-[#0a0d11] border border-red-500/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Body */}
            <div className="absolute bottom-4 w-4 h-4 bg-red-500 rounded-sm z-10 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            {/* Bottom Wick */}
            <div className="absolute bottom-2 w-[2px] h-2 bg-red-500 opacity-60"></div>
            {/* Animated Top Wick */}
            <div className="absolute bottom-8 w-[2px] h-10 bg-red-500 opacity-80 anim-wick-up"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-red-400 transition-colors">Shooting Star</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Bearish rejection after an uptrend. Long upper wick shows selling.</p>
          </div>
        </div>

        {/* 7. Morning Star */}
        <div className="bg-[#0a0d11] border border-emerald-500/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Red Bear */}
            <div className="absolute left-3 top-3 w-2.5 h-8 bg-red-500 rounded-sm opacity-60"></div>
            {/* Bottom Doji/Star */}
            <div className="absolute left-[34px] bottom-3 w-3 h-2 bg-gray-300 rounded-sm opacity-80"></div>
            <div className="absolute left-[39px] bottom-2 w-[2px] h-4 bg-gray-300 opacity-50"></div>
            {/* Green Bull (Animated) */}
            <div className="absolute right-3 bottom-3 w-2.5 h-10 bg-emerald-500 rounded-sm anim-cascade-3"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-emerald-400 transition-colors">Morning Star</h3>
            <p className="text-gray-500 text-xs leading-relaxed">A 3-candle pattern signaling a major bullish reversal at the bottom.</p>
          </div>
        </div>

        {/* 8. Hanging Man */}
        <div className="bg-[#0a0d11] border border-[#1a202c] hover:border-red-500/50 rounded-xl p-5 flex items-center gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
          <div className="w-20 h-20 rounded-xl bg-[#131722] flex items-center justify-center relative shrink-0">
            {/* Body */}
            <div className="absolute top-4 w-4 h-5 bg-red-500 rounded-sm z-10 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            {/* Top Wick */}
            <div className="absolute top-2 w-[2px] h-2 bg-red-500 opacity-60"></div>
            {/* Animated Bottom Wick */}
            <div className="absolute top-9 w-[2px] h-9 bg-red-500 opacity-80 anim-wick-down"></div>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-1.5 group-hover:text-red-400 transition-colors">Hanging Man</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Looks like a hammer but occurs at resistance. Warns of a drop.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashCandle;
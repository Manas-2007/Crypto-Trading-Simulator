import React, { useState } from "react";
import { FiX, FiBookOpen, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import ChartPatterns from "./ChartPatterns";
import Indicators from "./Indicators";

// ════════════════════════════════════════════════════════════
// 1. DATA: TOP 15 CANDLESTICK PATTERNS (Complete Data)
// ════════════════════════════════════════════════════════════
const patternsData = [
  {
    id: 1,
    name: "Bullish Engulfing",
    type: "Bullish",
    short: "Buyers completely overwhelm sellers. Strong uptrend signal.",
    detail: "This two-candle pattern occurs at the bottom of a downtrend. The second green candle completely swallows the previous red candle's body, indicating a massive shift in momentum from bears to bulls.",
    howToTrade: "Buy near the close of the engulfing candle or the open of the next. Stop-loss goes below the pattern's low.",
  },
  {
    id: 2,
    name: "Hammer",
    type: "Bullish",
    short: "Sharp rejection of lower prices indicating bulls stepping in.",
    detail: "The Hammer has a small real body at the top and a long lower wick (at least twice the body size). It shows that despite selling pressure, buyers stepped in and pushed the price back up.",
    howToTrade: "Look for a Hammer after a prolonged downtrend. Enter a long trade when the next candle breaks above the Hammer's high.",
  },
  {
    id: 3,
    name: "Bearish Engulfing",
    type: "Bearish",
    short: "Sellers totally dominate buyers. Signals potential downtrend.",
    detail: "Found at the top of an uptrend. The selling pressure completely overwhelms the buying pressure of the previous day. A highly reliable bearish reversal signal.",
    howToTrade: "Sell short when the engulfing candle closes. Keep strict stop-loss above the highest wick of the pattern.",
  },
  {
    id: 4,
    name: "Doji Star",
    type: "Neutral",
    short: "Market indecision. Buying & selling pressure are equal.",
    detail: "A Doji forms when a crypto asset opens and closes at almost the same price. It looks like a cross or plus sign. It signals that neither bulls nor bears have gained control, often warning of a potential trend reversal.",
    howToTrade: "Don't trade the Doji in isolation. Wait for the next candle to confirm the direction before entering a position.",
  },
  {
    id: 5,
    name: "Three White Soldiers",
    type: "Bullish",
    short: "Strong bullish force. Three consecutive long green bodies.",
    detail: "A powerful bullish signal occurring after a downtrend. It features three consecutive long green candles with small or no wicks, each opening within the previous body and closing higher.",
    howToTrade: "Often signals a major trend reversal. Can buy immediately, but be cautious of overbought conditions.",
  },
  {
    id: 6,
    name: "Shooting Star",
    type: "Bearish",
    short: "Bearish rejection. Long upper wick shows selling.",
    detail: "Looks like an Inverted Hammer but occurs at the top of an uptrend. It means buyers tried to push the price higher, but sellers rejected it aggressively, closing near the open.",
    howToTrade: "Confirm with a red candle next. Short the asset, placing a stop-loss above the top wick.",
  },
  {
    id: 7,
    name: "Morning Star",
    type: "Bullish",
    short: "A 3-candle pattern signaling a major bullish reversal.",
    detail: "Consists of a long red candle, a small-bodied candle (or Doji) that gaps down, and a long green candle that closes at least halfway up the first red candle's body.",
    howToTrade: "Enter long after the third (green) candle closes. It shows hope is returning to the market.",
  },
  {
    id: 8,
    name: "Hanging Man",
    type: "Bearish",
    short: "Occurs at resistance. Warns of a potential drop.",
    detail: "Visually identical to a Hammer, but it forms after an uptrend. The long lower shadow shows that sellers were able to push the price down significantly, signaling the bulls are losing control.",
    howToTrade: "Enter a short position if the following candle closes below the Hanging Man's body.",
  },
  {
    id: 9,
    name: "Inverted Hammer",
    type: "Bullish",
    short: "Found at downtrend bottoms with a long top wick.",
    detail: "Similar to the Hammer but upside down. The long upper wick indicates that buyers tried to push the price up, and although sellers pushed it back down, the selling momentum is weakening.",
    howToTrade: "Wait for a bullish confirmation candle next. Place a stop-loss just below the Inverted Hammer's low.",
  },
  {
    id: 10,
    name: "Evening Star",
    type: "Bearish",
    short: "A 3-candle bearish reversal pattern at the top of an uptrend.",
    detail: "The opposite of a Morning Star. A strong green candle, followed by a small hesitation candle at the top, and finally a strong red candle crashing down.",
    howToTrade: "A prime signal to take profits or open a short position. Wait for the third candle to close.",
  },
  {
    id: 11,
    name: "Piercing Line",
    type: "Bullish",
    short: "Green candle pierces more than 50% of previous red candle.",
    detail: "Occurs in a downtrend. The second (green) candle opens lower than the first's close, but rallies to close above the 50% midpoint of the first (red) candle's body.",
    howToTrade: "Buy on the next candle if it breaks the high of the green piercing candle.",
  },
  {
    id: 12,
    name: "Dark Cloud Cover",
    type: "Bearish",
    short: "Red candle pierces more than 50% of previous green candle.",
    detail: "A large green candle followed by a red candle that opens higher but closes below the midpoint of the green candle. It shows bears are aggressively taking over.",
    howToTrade: "Short the asset once the red candle closes below the 50% mark of the previous green candle.",
  },
  {
    id: 13,
    name: "Three Black Crows",
    type: "Bearish",
    short: "Three consecutive large red candles indicating strong selling.",
    detail: "The exact opposite of Three White Soldiers. Three large red candles stepping downwards. It shows a complete collapse of buyer support.",
    howToTrade: "A very strong sell signal. Avoid catching the falling knife; wait for consolidation before trying to buy again.",
  },
  {
    id: 14,
    name: "Harami (Bullish)",
    type: "Bullish",
    short: "An 'inside bar' indicating momentum is pausing or reversing.",
    detail: "Harami means 'pregnant' in Japanese. A large red candle is followed by a small green candle whose body is completely contained within the red body. It shows selling has stopped.",
    howToTrade: "Wait for a breakout. If the third candle breaks above the pattern, go long.",
  },
  {
    id: 15,
    name: "Marubozu",
    type: "Neutral",
    short: "A long body with little to no wicks, showing sheer dominance.",
    detail: "A Marubozu can be Green (extreme bullish) or Red (extreme bearish). It means the price opened at the low/high and closed at the absolute high/low, with zero hesitation.",
    howToTrade: "Trade in the direction of the Marubozu. If green, the trend is heavily up. If red, heavily down.",
  },
];

// ════════════════════════════════════════════════════════════
// 2. REUSABLE STATIC CANDLE COMPONENT (Perfect Alignment)
// ════════════════════════════════════════════════════════════
const AnimatedCandleGroup = ({ id, inModal = false }) => {
  const scale = inModal ? "scale-125 md:scale-[1.5]" : "scale-75 md:scale-90";
  
  const renderPattern = () => {
    switch (id) {
      case 1: // Bullish Engulfing
        return (
          <div className="flex items-center justify-center gap-4 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-16 bg-red-500 opacity-60"></div>
              <div className="absolute w-3 h-8 bg-red-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-80"></div>
              <div className="absolute w-3 h-14 bg-emerald-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 2: // Hammer
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute top-[20%] w-3 h-8 bg-emerald-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 3: // Bearish Engulfing
        return (
          <div className="flex items-center justify-center gap-4 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-16 bg-emerald-500 opacity-60"></div>
              <div className="absolute w-3 h-8 bg-emerald-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-80"></div>
              <div className="absolute w-3 h-14 bg-red-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 4: // Doji Star
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-16 bg-gray-400 opacity-60"></div>
              <div className="absolute w-5 h-[2px] bg-gray-300 rounded-sm z-10 shadow-[0_0_8px_rgba(255,255,255,0.3)]"></div>
            </div>
          </div>
        );
      case 5: // Three White Soldiers
        return (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[15%] w-3 h-10 bg-emerald-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[35%] w-3 h-10 bg-emerald-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[55%] w-3 h-10 bg-emerald-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 6: // Shooting Star
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex flex-col items-center justify-center h-24">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute bottom-[15%] w-3 h-8 bg-red-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 7: // Morning Star
        return (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[10%] w-3 h-14 bg-red-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-16 bg-gray-400 opacity-60"></div>
              <div className="absolute top-[60%] w-4 h-[2px] bg-gray-300 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[20%] w-3 h-12 bg-emerald-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 8: // Hanging Man
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[15%] w-3 h-8 bg-red-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 9: // Inverted Hammer
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[15%] w-3 h-8 bg-emerald-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 10: // Evening Star
        return (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[10%] w-3 h-14 bg-emerald-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-16 bg-gray-400 opacity-60"></div>
              <div className="absolute top-[15%] w-4 h-[2px] bg-gray-300 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[20%] w-3 h-12 bg-red-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 11: // Piercing Line
        return (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[15%] w-3 h-14 bg-red-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[15%] w-3 h-10 bg-emerald-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 12: // Dark Cloud Cover
        return (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-emerald-500 opacity-60"></div>
              <div className="absolute bottom-[15%] w-3 h-14 bg-emerald-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[15%] w-3 h-10 bg-red-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 13: // Three Black Crows
        return (
          <div className="flex items-center justify-center gap-3 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[15%] w-3 h-10 bg-red-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[35%] w-3 h-10 bg-red-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[55%] w-3 h-10 bg-red-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 14: // Harami (Bullish)
        return (
          <div className="flex items-center justify-center gap-4 w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-24 bg-red-500 opacity-60"></div>
              <div className="absolute top-[15%] w-3 h-16 bg-red-500 rounded-sm z-10"></div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-[1px] h-16 bg-emerald-500 opacity-60"></div>
              <div className="absolute w-3 h-8 bg-emerald-500 rounded-sm z-10"></div>
            </div>
          </div>
        );
      case 15: // Marubozu
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-4 h-20 bg-emerald-500 rounded-sm z-10 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
            </div>
          </div>
        );
      default:
        return <div className="text-white text-[10px]">No Visual</div>;
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${scale} transition-transform`}>
      {renderPattern()}
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 3. MAIN KNOWLEDGE HUB COMPONENT
// ════════════════════════════════════════════════════════════
const KnowledgeHub = () => {
  const [activeTab, setActiveTab] = useState("Candlestick Patterns");
  const [selectedPattern, setSelectedPattern] = useState(null);

  const tabs = [
    "Candlestick Patterns",
    "Chart Patterns",
    "Indicators",
  ];

  return (
    <div className="mx-2 md:mx-6 my-6 flex flex-col gap-6" style={{ fontFamily: "DM Sans, sans-serif" }}>
      
      {/* ─── CSS Animations Injection ─── */}
      <style>{`
        @keyframes engulfingGreen { 0%, 20% { transform: scaleY(0.2); opacity: 0.5; } 50%, 80% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 15px rgba(16,185,129,0.5); } 100% { transform: scaleY(0.2); opacity: 0.5; } }
        @keyframes engulfingRed { 0%, 20% { transform: scaleY(0.2); opacity: 0.5; } 50%, 80% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 15px rgba(239,68,68,0.5); } 100% { transform: scaleY(0.2); opacity: 0.5; } }
        @keyframes wickGrowDown { 0%, 20% { transform: scaleY(0); } 50%, 80% { transform: scaleY(1); } 100% { transform: scaleY(0); } }
        @keyframes wickGrowUp { 0%, 20% { transform: scaleY(0); } 50%, 80% { transform: scaleY(1); } 100% { transform: scaleY(0); } }
        @keyframes dojiPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; box-shadow: 0 0 15px rgba(255,255,255,0.4); } }
        @keyframes cascadeGrow { 0%, 30% { transform: scaleY(0.2); opacity: 0.3; } 60%, 100% { transform: scaleY(1); opacity: 1; box-shadow: 0 0 10px rgba(16,185,129,0.3); } }
        
        .anim-engulf-bull { animation: engulfingGreen 3s ease-in-out infinite; transform-origin: bottom; }
        .anim-engulf-bear { animation: engulfingRed 3s ease-in-out infinite; transform-origin: top; }
        .anim-wick-down { animation: wickGrowDown 3s ease-in-out infinite; transform-origin: top; }
        .anim-wick-up { animation: wickGrowUp 3s ease-in-out infinite; transform-origin: bottom; }
        .anim-doji { animation: dojiPulse 2.5s ease-in-out infinite; }
        .anim-cascade-1 { animation: cascadeGrow 3s ease-in-out infinite; transform-origin: bottom; }
        .anim-cascade-2 { animation: cascadeGrow 3s ease-in-out infinite 0.2s; transform-origin: bottom; }
        .anim-cascade-3 { animation: cascadeGrow 3s ease-in-out infinite 0.4s; transform-origin: bottom; }
      `}</style>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-white/20 pb-2 mt-2 md:mt-0">
        <div>
          <h1 className="text-white font-black text-base md:text-lg tracking-tighter uppercase flex items-center gap-2">
            <FiBookOpen className="text-emerald-400" size={16} />
            Knowledge Hub
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
            Technical Analysis & Pattern Recognition
          </p>
        </div>

        {/* Compact Tab Filters */}
        <div className="flex gap-1 bg-[#0a0d11] p-0.5 rounded-lg border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-emerald-400 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── RENDER SWITCH LOGIC ─── */}
      {activeTab === "Candlestick Patterns" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-3 md:gap-4 pb-10">
          {patternsData.map((pattern, index) => (
            <div
              key={pattern.id}
              className="group bg-[#0a0d11] border border-white/30 hover:border-emerald-500/30 rounded-xl p-2.5 flex flex-col gap-2 transition-all duration-300 hover:bg-[#0d1117] relative overflow-hidden"
            >
              {/* Invisible full card button */}
              <button onClick={() => setSelectedPattern(pattern)} className="absolute inset-0 z-20"></button>
              
              {/* Index Badge */}
              <div className="absolute top-2 left-2 bg-white/10 text-gray-200 font-mono text-[10px] px-1.5 rounded border border-white/10 z-10">
                {index + 1}
              </div>

              {/* Visual Box (Compact & Sharp) */}
              <div className="h-20 w-full mt-5 bg-[#05070a] rounded-lg border border-white/5 flex items-center justify-center overflow-hidden relative z-10">
                <AnimatedCandleGroup id={pattern.id} inModal={false} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-0.5 relative z-10 pointer-events-none">
                <h3 className="text-white font-bold text-[14px] leading-tight truncate">
                  {pattern.name}
                </h3>
                <p className="text-gray-400 text-[10px] leading-snug line-clamp-2 h-[24px]">
                  {pattern.short}
                </p>
              </div>

              {/* Action Area - Perfectly aligned at bottom */}
              <div className="mt-auto pt-2 border-t border-white/5 flex flex-col gap-2 relative z-10 pointer-events-none">
                <span
                  className={`w-max px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    pattern.type === "Bullish"
                      ? "text-emerald-500"
                      : pattern.type === "Bearish"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {pattern.type} REVERSAL
                </span>

                <div className="w-full py-1.5 bg-white/15 group-hover:bg-emerald-500/20 text-white group-hover:text-emerald-400 rounded-md text-[10px] font-bold transition-all flex items-center justify-center gap-1">
                  STUDY <FiArrowRight size={10} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === "Chart Patterns" ? (
        <ChartPatterns />
      ) : activeTab === "Indicators" ? (
        <Indicators />
      ) : (
        <div className="text-gray-500 text-center py-20 uppercase tracking-widest text-xs">
          Coming Soon...
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          4. DETAILS MODAL (Premium, Responsive, Compact Desktop)
          ════════════════════════════════════════════════════════════ */}
      {selectedPattern && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          
          {/* Main Box: Reduced height on desktop (md:h-[550px]), max-h on mobile (max-h-[85vh]) */}
          <div className="bg-[#0a0d11] border border-white/40 w-full max-w-4xl max-h-[85vh] md:h-[550px] rounded-2xl shadow-2xl flex flex-col md:flex-row relative overflow-hidden ring-1 ring-white/5">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPattern(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <FiX size={20} />
            </button>

            {/* Left Side: Visualizer (h-[30vh] on mobile so it doesn't eat up the whole screen) */}
            <div className="w-full md:w-5/12 h-[30vh] md:h-full bg-gradient-to-br from-[#05070a] to-[#0f141a] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/15 shrink-0">
              <div className="absolute inset-0 opacity-20 blur-[50px] bg-emerald-500/20" />
              <div className="relative z-10 w-full h-full flex items-center justify-center scale-90 md:scale-100">
                <AnimatedCandleGroup id={selectedPattern.id} inModal={true} />
              </div>
              <span className="absolute bottom-4 md:bottom-8 text-emerald-500/60 text-[9px] font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md hidden md:block">
                Visual Analysis
              </span>
            </div>

            {/* Right Side: Content & Actions */}
            <div className="w-full md:w-7/12 flex flex-col h-[55vh] md:h-full bg-[#0a0d11]">
              
              {/* Scrollable Text Area */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                
                <div className="mb-5 md:mb-6">
                  <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {selectedPattern.type} Pattern
                  </span>
                  <h2 className="text-white font-black text-2xl md:text-4xl mt-1 tracking-tight">
                    {selectedPattern.name}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-3">
                      Definition
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-light">
                      {selectedPattern.detail}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 border-l-2 border-emerald-500 pl-3">
                      Trading Strategy
                    </h3>
                    <div className="bg-[#05070a] p-4 rounded-xl border border-white/5 shadow-inner">
                      <p className="text-emerald-50/80 text-sm leading-relaxed">
                        {selectedPattern.howToTrade}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer: 'I Understand' Button */}
              <div className="p-4 md:p-6 border-t border-white/5 bg-[#0a0d11] shrink-0">
                <button
                  onClick={() => setSelectedPattern(null)}
                  className="w-full py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  I Understand
                </button>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub;
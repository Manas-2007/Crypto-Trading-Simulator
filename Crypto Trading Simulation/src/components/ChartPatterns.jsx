import React, { useState } from "react";
import { FiX, FiActivity, FiArrowRight } from "react-icons/fi";

// ════════════════════════════════════════════════════════════
// 1. DATA: TOP 10 CHART PATTERNS
// ════════════════════════════════════════════════════════════
const chartPatternsData = [
  {
    id: 1,
    name: "Head & Shoulders",
    type: "Bearish",
    short: "Shift to downtrend.",
    detail:
      "Three peaks: higher central peak (head) and two lower peaks (shoulders). Neckline connects the troughs.",
    howToTrade: "Short below neckline. Stop-loss above right shoulder.",
  },
  {
    id: 2,
    name: "Inv. Head & Shoulders",
    type: "Bullish",
    short: "Shift to uptrend.",
    detail:
      "Three troughs: lower central trough (head) and two higher troughs (shoulders).",
    howToTrade: "Long above neckline. Stop-loss below right shoulder.",
  },
  {
    id: 3,
    name: "Double Top",
    type: "Bearish",
    short: "'M' shaped reversal.",
    detail:
      "Price attempts to break resistance twice but fails, forming two peaks.",
    howToTrade: "Short below support (neckline). Stop-loss above peaks.",
  },
  {
    id: 4,
    name: "Double Bottom",
    type: "Bullish",
    short: "'W' shaped reversal.",
    detail:
      "Price drops to support twice and is rejected, creating two bottoms.",
    howToTrade: "Long above resistance (neckline). Stop-loss below lows.",
  },
  {
    id: 5,
    name: "Ascending Triangle",
    type: "Bullish",
    short: "Buying accumulation.",
    detail:
      "Horizontal resistance at the top and rising trendline at the bottom.",
    howToTrade: "Long on breakout above resistance. Stop-loss below trendline.",
  },
  {
    id: 6,
    name: "Descending Triangle",
    type: "Bearish",
    short: "Selling accumulation.",
    detail:
      "Horizontal support at the bottom and descending trendline at the top.",
    howToTrade: "Short on breakdown below support. Stop-loss above trendline.",
  },
  {
    id: 7,
    name: "Symmetrical Triangle",
    type: "Neutral",
    short: "Consolidation pattern.",
    detail:
      "Converging trendlines (descending & ascending). Breakout can be in either direction.",
    howToTrade: "Wait for breakout direction. Stop-loss inside opposite line.",
  },
  {
    id: 8,
    name: "Bull Flag",
    type: "Bullish",
    short: "Pause before uptrend.",
    detail:
      "Strong upward movement (flagpole) followed by downward consolidation (flag).",
    howToTrade: "Long on breakout above flag. Stop-loss below flag low.",
  },
  {
    id: 9,
    name: "Bear Flag",
    type: "Bearish",
    short: "Pause before downtrend.",
    detail:
      "Sharp downward drop (flagpole) followed by upward consolidation (flag).",
    howToTrade: "Short on breakdown below flag. Stop-loss above flag high.",
  },
  {
    id: 10,
    name: "Cup and Handle",
    type: "Bullish",
    short: "Rounding bottom breakout.",
    detail:
      "'Cup' forms U-shape, 'handle' is a short downward drift. Shows consolidation before breakout.",
    howToTrade: "Long above handle resistance. Stop-loss below handle low.",
  },
];

// ════════════════════════════════════════════════════════════
// 2. SVG CHART VISUALS (Fixed Scaling & Visibility)
// ════════════════════════════════════════════════════════════
const ChartPatternVisual = ({ id, inModal = false }) => {
  // Modal uses full space, Cards use slightly scaled back space for neatness
  const scale = inModal ? "w-full h-full max-h-[220px]" : "w-[60%] h-[60%]";

  const green = "#10b981";
  const red = "#ef4444";
  const neutral = "#9ca3af";
  const guide = "#374151";

  const renderSVG = () => {
    switch (id) {
      case 1: // Head & Shoulders
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(239,68,68,0.4)] overflow-visible"
          >
            <line
              x1="0"
              y1="75"
              x2="100"
              y2="75"
              stroke={guide}
              strokeWidth="1.5"
              strokeDasharray="3"
            />
            <path
              d="M 5 85 L 20 40 L 35 75 L 50 15 L 65 75 L 80 40 L 95 85"
              fill="none"
              stroke={red}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 2: // Inverse Head & Shoulders
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] overflow-visible"
          >
            <line
              x1="0"
              y1="25"
              x2="100"
              y2="25"
              stroke={guide}
              strokeWidth="1.5"
              strokeDasharray="3"
            />
            <path
              d="M 5 15 L 20 60 L 35 25 L 50 85 L 65 25 L 80 60 L 95 15"
              fill="none"
              stroke={green}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 3: // Double Top
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(239,68,68,0.4)] overflow-visible"
          >
            <line
              x1="5"
              y1="70"
              x2="95"
              y2="70"
              stroke={guide}
              strokeWidth="1.5"
              strokeDasharray="3"
            />
            <path
              d="M 10 90 L 30 20 L 50 70 L 70 20 L 90 90"
              fill="none"
              stroke={red}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 4: // Double Bottom
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] overflow-visible"
          >
            <line
              x1="5"
              y1="30"
              x2="95"
              y2="30"
              stroke={guide}
              strokeWidth="1.5"
              strokeDasharray="3"
            />
            <path
              d="M 10 10 L 30 80 L 50 30 L 70 80 L 90 10"
              fill="none"
              stroke={green}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 5: // Ascending Triangle
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] overflow-visible"
          >
            <line
              x1="5"
              y1="20"
              x2="95"
              y2="20"
              stroke={guide}
              strokeWidth="2"
            />
            <line
              x1="5"
              y1="90"
              x2="95"
              y2="20"
              stroke={guide}
              strokeWidth="2"
            />
            <path
              d="M 10 90 L 35 20 L 50 60 L 65 20 L 80 35 L 90 10"
              fill="none"
              stroke={green}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 6: // Descending Triangle
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(239,68,68,0.4)] overflow-visible"
          >
            <line
              x1="5"
              y1="80"
              x2="95"
              y2="80"
              stroke={guide}
              strokeWidth="2"
            />
            <line
              x1="5"
              y1="10"
              x2="95"
              y2="80"
              stroke={guide}
              strokeWidth="2"
            />
            <path
              d="M 10 10 L 35 80 L 50 40 L 65 80 L 80 65 L 90 90"
              fill="none"
              stroke={red}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 7: // Symmetrical Triangle
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(156,163,175,0.4)] overflow-visible"
          >
            <line
              x1="5"
              y1="10"
              x2="95"
              y2="50"
              stroke={guide}
              strokeWidth="2"
            />
            <line
              x1="5"
              y1="90"
              x2="95"
              y2="50"
              stroke={guide}
              strokeWidth="2"
            />
            <path
              d="M 10 90 L 30 25 L 45 65 L 60 40 L 75 55 L 90 45"
              fill="none"
              stroke={neutral}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 8: // Bull Flag
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] overflow-visible"
          >
            <line
              x1="25"
              y1="20"
              x2="75"
              y2="40"
              stroke={guide}
              strokeWidth="1.5"
            />
            <line
              x1="25"
              y1="50"
              x2="75"
              y2="70"
              stroke={guide}
              strokeWidth="1.5"
            />
            <path
              d="M 10 90 L 30 20 L 45 40 L 55 30 L 65 50 L 75 40 L 95 15"
              fill="none"
              stroke={green}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 9: // Bear Flag
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(239,68,68,0.4)] overflow-visible"
          >
            <line
              x1="25"
              y1="80"
              x2="75"
              y2="60"
              stroke={guide}
              strokeWidth="1.5"
            />
            <line
              x1="25"
              y1="50"
              x2="75"
              y2="30"
              stroke={guide}
              strokeWidth="1.5"
            />
            <path
              d="M 10 10 L 30 80 L 45 60 L 55 70 L 65 50 L 75 60 L 95 85"
              fill="none"
              stroke={red}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 10: // Cup and Handle
        return (
          <svg
            viewBox="0 0 100 100"
            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] overflow-visible"
          >
            <line
              x1="5"
              y1="30"
              x2="95"
              y2="30"
              stroke={guide}
              strokeWidth="1.5"
              strokeDasharray="3"
            />
            <path
              d="M 5 30 C 5 100, 65 100, 65 30 C 65 55, 80 55, 80 40 L 95 10"
              fill="none"
              stroke={green}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-center ${scale}`}>
      {renderSVG()}
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 3. MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export default function ChartPatterns() {
  const [selectedPattern, setSelectedPattern] = useState(null);

  return (
    <div
      className="w-full flex flex-col gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Grid Layout: 2 (Mobile), 4 (Laptop), 5 (Large Screen) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 pb-10">
        {chartPatternsData.map((pattern, index) => (
          <div
            key={pattern.id}
            className="group bg-[#0a0d11] border border-white/30 hover:border-cyan-500/30 rounded-xl p-2.5 flex flex-col gap-2 transition-all duration-300 hover:bg-[#0d1117] relative overflow-hidden"
          >
            {/* Click Area */}
            <button
              onClick={() => setSelectedPattern(pattern)}
              className="absolute inset-0 z-20"
            ></button>

            {/* Index Badge */}
            <div className="absolute top-2 left-2 z-10 bg-white/5 text-gray-300 font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/30">
              {index + 1}
            </div>

            {/* Visual Box (Smaller height, max SVG visibility) */}
            <div className="h-24 w-full mt-4 bg-[#05070a] rounded-lg border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
              <ChartPatternVisual id={pattern.id} />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5 mt-1 relative z-10 pointer-events-none">
              <h3 className="text-white font-bold text-[11px] leading-tight truncate">
                {pattern.name}
              </h3>
              <p className="text-gray-500 text-[9px] leading-snug line-clamp-2 h-[26px]">
                {pattern.short}
              </p>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-auto pt-2 border-t border-white/5 flex flex-col gap-2 relative z-10 pointer-events-none">
              <span
                className={`w-max px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                  pattern.type === "Bullish"
                    ? "text-emerald-500 bg-emerald-500/10"
                    : pattern.type === "Bearish"
                      ? "text-red-500 bg-red-500/10"
                      : "text-gray-400 bg-gray-500/10"
                }`}
              >
                {pattern.type}
              </span>

              <div className="w-full py-1.5 bg-white/15 group-hover:bg-cyan-500/10 text-white group-hover:text-cyan-400 rounded-md text-[9px] font-bold transition-all flex items-center justify-center gap-1">
                STUDY <FiArrowRight size={10} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════
          4. DETAILS MODAL (Text Balanced for Phone & Desktop)
          ════════════════════════════════════════════════════════════ */}
      {selectedPattern && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#0a0d11] border border-white/40 w-full max-w-4xl max-h-[85vh] md:h-[500px] rounded-2xl shadow-2xl flex flex-col md:flex-row relative overflow-hidden ring-1 ring-white/5">
            <button
              onClick={() => setSelectedPattern(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <FiX size={20} />
            </button>

            {/* Left Side: Visualizer */}
            <div className="w-full md:w-5/12 h-[25vh] md:h-full bg-gradient-to-br from-[#05070a] to-[#0f141a] p-4 md:p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/20 shrink-0">
              <div className="absolute inset-0 opacity-20 blur-[50px] bg-cyan-500/20" />
              <div className="relative z-10 w-full h-full flex items-center justify-center scale-90 md:scale-100">
                <ChartPatternVisual id={selectedPattern.id} inModal={true} />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-7/12 flex flex-col h-[60vh] md:h-full bg-[#0a0d11]">
              <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                <div className="mb-4 md:mb-6">
                  <span className="text-cyan-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                    {selectedPattern.type} Chart Pattern
                  </span>
                  {/* Balanced Text Size */}
                  <h2 className="text-white font-black text-xl md:text-3xl mt-1 tracking-tight">
                    {selectedPattern.name}
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2 border-l-2 border-cyan-500 pl-3">
                      Definition
                    </h3>
                    {/* Balanced Text Size */}
                    <p className="text-gray-300 text-[13px] md:text-sm leading-relaxed font-light">
                      {selectedPattern.detail}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2 border-l-2 border-cyan-500 pl-3">
                      Trading Strategy
                    </h3>
                    <div className="bg-[#05070a] p-3 md:p-4 rounded-xl border border-white/5 shadow-inner">
                      {/* Balanced Text Size */}
                      <p className="text-cyan-50/80 text-[13px] md:text-sm leading-relaxed">
                        {selectedPattern.howToTrade}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-4 md:p-6 border-t border-white/5 bg-[#0a0d11] shrink-0">
                <button
                  onClick={() => setSelectedPattern(null)}
                  className="w-full py-3 md:py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black text-[11px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
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
}

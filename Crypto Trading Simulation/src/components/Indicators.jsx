import React, { useState } from "react";
import { FiX, FiBarChart2, FiArrowRight } from "react-icons/fi";

// ════════════════════════════════════════════════════════════
// 1. DATA: TOP 10 TECHNICAL INDICATORS
// ════════════════════════════════════════════════════════════
const indicatorsData = [
  { id: 1, name: "Simple Moving Average", type: "Trend", short: "Smooths price data to identify trend direction.", detail: "The SMA calculates the average price of an asset over a specific number of periods. It filters out the noise of random short-term price fluctuations.", howToTrade: "Buy when price crosses above the SMA. Sell when price crosses below." },
  { id: 2, name: "Exponential Moving Avg", type: "Trend", short: "Similar to SMA but reacts faster to recent prices.", detail: "The EMA places a greater weight and significance on the most recent data points, making it more responsive to new information than the SMA.", howToTrade: "Use EMA crossovers (e.g., 9 EMA crossing above 21 EMA) as buy/sell signals." },
  { id: 3, name: "Relative Strength Index", type: "Momentum", short: "Measures the speed and change of price movements.", detail: "RSI oscillates between 0 and 100. Traditionally, an asset is considered overbought when RSI is above 70 and oversold when it is below 30.", howToTrade: "Look for bullish divergence when RSI is oversold, or bearish divergence when overbought." },
  { id: 4, name: "MACD", type: "Momentum", short: "Shows relationship between two moving averages.", detail: "Consists of the MACD line, Signal line, and a Histogram. It helps traders detect changes in the strength, direction, and duration of a trend.", howToTrade: "Buy when the MACD line crosses above the Signal line (bullish crossover)." },
  { id: 5, name: "Bollinger Bands", type: "Volatility", short: "Bands that expand/contract based on volatility.", detail: "Consists of a middle SMA and an upper and lower band (standard deviations). Prices tend to bounce within the bands.", howToTrade: "Price touching the lower band can be a buy signal; touching the upper band can be a sell signal." },
  { id: 6, name: "Average True Range", type: "Volatility", short: "Measures market volatility, not trend direction.", detail: "ATR indicates how much an asset moves on average during a given timeframe. High ATR means high volatility.", howToTrade: "Use ATR to set dynamic stop-losses. A wider ATR requires a wider stop-loss." },
  { id: 7, name: "Volume", type: "Volume", short: "The number of shares/coins traded in a period.", detail: "Volume confirms the strength of a trend. A price movement accompanied by high volume is stronger and more relevant than one with low volume.", howToTrade: "Look for high volume during breakouts to confirm the validity of the move." },
  { id: 8, name: "VWAP", type: "Volume", short: "Average price weighted by volume over a day.", detail: "Volume Weighted Average Price shows the true average price a coin traded at. Used heavily by institutional algorithms.", howToTrade: "If price is above VWAP, the intraday trend is bullish. If below, it is bearish." },
  { id: 9, name: "Stochastic Oscillator", type: "Momentum", short: "Compares closing price to its price range.", detail: "Oscillates between 0-100. Overbought > 80, Oversold < 20. It assumes prices close near the high in uptrends and near the low in downtrends.", howToTrade: "Buy when Stochastic falls below 20 and then crosses back above it." },
  { id: 10, name: "Fibonacci Retracement", type: "Support", short: "Horizontal lines indicating possible support/resistance.", detail: "Based on the Fibonacci sequence, common levels are 23.6%, 38.2%, 50%, and 61.8%. Often used to find pullback entries.", howToTrade: "Buy near the 0.5 or 0.618 level during an uptrend pullback." },
];

// ════════════════════════════════════════════════════════════
// 2. SVG INDICATOR VISUALS (Candles + Indicators Combined)
// ════════════════════════════════════════════════════════════
const IndicatorVisual = ({ id, inModal = false }) => {
  const scale = inModal ? "w-full h-full max-h-[220px]" : "w-[75%] h-[75%]";
  
  const green = "#10b981"; 
  const red = "#ef4444";   
  const cyan = "#06b6d4"; // For main indicator lines
  const yellow = "#f59e0b"; // For secondary lines (EMA/VWAP)
  const purple = "#a855f7"; // MACD / Bands
  const gridLine = "#374151"; 

  // Reusable background candles (Ups and Downs)
  const renderBackgroundCandles = (scaleY = 1, offsetY = 0) => (
    <g transform={`translate(0, ${offsetY}) scale(1, ${scaleY})`} opacity="0.4">
      <line x1="15" y1="20" x2="15" y2="50" stroke={green} strokeWidth="1.5" />
      <rect x="10" y="25" width="10" height="20" fill={green} rx="1" />
      
      <line x1="35" y1="15" x2="35" y2="45" stroke={green} strokeWidth="1.5" />
      <rect x="30" y="20" width="10" height="15" fill={green} rx="1" />
      
      <line x1="55" y1="10" x2="55" y2="60" stroke={red} strokeWidth="1.5" />
      <rect x="50" y="30" width="10" height="25" fill={red} rx="1" />
      
      <line x1="75" y1="40" x2="75" y2="80" stroke={red} strokeWidth="1.5" />
      <rect x="70" y="50" width="10" height="20" fill={red} rx="1" />
      
      <line x1="95" y1="60" x2="95" y2="90" stroke={green} strokeWidth="1.5" />
      <rect x="90" y="70" width="10" height="15" fill={green} rx="1" />
    </g>
  );

  const renderSVG = () => {
    switch (id) {
      case 1: // SMA (Single smooth line over candles)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles()}
            <path d="M 5 45 C 30 35, 60 45, 105 75" fill="none" stroke={cyan} strokeWidth="2.5" className="drop-shadow-[0_0_5px_rgba(6,182,212,0.6)]" />
          </svg>
        );
      case 2: // EMA (Tighter to price action)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles()}
            <path d="M 5 35 Q 35 15, 60 55 T 105 75" fill="none" stroke={yellow} strokeWidth="2.5" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.6)]" />
          </svg>
        );
      case 3: // RSI (Split pane: Candles top, RSI bottom)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles(0.5, 0)} {/* Scaled down candles */}
            <line x1="0" y1="60" x2="110" y2="60" stroke={gridLine} strokeWidth="1" />
            <line x1="0" y1="70" x2="110" y2="70" stroke={gridLine} strokeWidth="1" strokeDasharray="2" />
            <line x1="0" y1="95" x2="110" y2="95" stroke={gridLine} strokeWidth="1" strokeDasharray="2" />
            {/* RSI Line */}
            <path d="M 5 85 L 25 75 L 45 65 L 65 90 L 85 80 L 105 95" fill="none" stroke={purple} strokeWidth="2" className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]" />
          </svg>
        );
      case 4: // MACD (Histogram + Lines)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles(0.5, 0)}
            <line x1="0" y1="60" x2="110" y2="60" stroke={gridLine} strokeWidth="1" />
            <line x1="0" y1="80" x2="110" y2="80" stroke={gridLine} strokeWidth="1" />
            {/* Histogram */}
            <rect x="15" y="70" width="4" height="10" fill={green} opacity="0.6" />
            <rect x="35" y="65" width="4" height="15" fill={green} opacity="0.6" />
            <rect x="55" y="80" width="4" height="10" fill={red} opacity="0.6" />
            <rect x="75" y="80" width="4" height="15" fill={red} opacity="0.6" />
            {/* MACD Line & Signal Line */}
            <path d="M 5 85 C 30 65, 50 85, 105 95" fill="none" stroke={cyan} strokeWidth="1.5" />
            <path d="M 5 80 C 30 70, 50 75, 105 90" fill="none" stroke={yellow} strokeWidth="1.5" />
          </svg>
        );
      case 5: // Bollinger Bands (3 bands over candles)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles()}
            {/* Upper Band */}
            <path d="M 5 20 Q 50 0, 105 50" fill="none" stroke={cyan} strokeWidth="1" opacity="0.8" />
            {/* Middle SMA */}
            <path d="M 5 45 C 30 35, 60 45, 105 75" fill="none" stroke={yellow} strokeWidth="1" opacity="0.8" strokeDasharray="2" />
            {/* Lower Band */}
            <path d="M 5 70 Q 50 80, 105 100" fill="none" stroke={cyan} strokeWidth="1" opacity="0.8" />
            {/* Light fill between bands */}
            <path d="M 5 20 Q 50 0, 105 50 L 105 100 Q 50 80, 5 70 Z" fill={cyan} opacity="0.05" />
          </svg>
        );
      case 6: // ATR (Volatility line)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles(0.5, 0)}
            <line x1="0" y1="60" x2="110" y2="60" stroke={gridLine} strokeWidth="1" />
            {/* ATR Line rising showing increased volatility as price drops */}
            <path d="M 5 95 L 25 90 L 45 85 L 65 70 L 85 65 L 105 75" fill="none" stroke={yellow} strokeWidth="2" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
          </svg>
        );
      case 7: // Volume (Bars overlayed at bottom)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles()}
            {/* Volume Bars */}
            <rect x="11" y="80" width="8" height="20" fill={green} opacity="0.8" />
            <rect x="31" y="70" width="8" height="30" fill={green} opacity="0.8" />
            <rect x="51" y="55" width="8" height="45" fill={red} opacity="0.8" />
            <rect x="71" y="65" width="8" height="35" fill={red} opacity="0.8" />
            <rect x="91" y="85" width="8" height="15" fill={green} opacity="0.8" />
          </svg>
        );
      case 8: // VWAP (Anchored average line)
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles()}
            <path d="M 5 30 L 25 35 L 45 42 L 65 55 L 85 70 L 105 80" fill="none" stroke={purple} strokeWidth="2.5" className="drop-shadow-[0_0_5px_rgba(168,85,247,0.6)]" />
          </svg>
        );
      case 9: // Stochastic
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles(0.5, 0)}
            <line x1="0" y1="60" x2="110" y2="60" stroke={gridLine} strokeWidth="1" />
            <line x1="0" y1="70" x2="110" y2="70" stroke={gridLine} strokeWidth="1" strokeDasharray="2" />
            <line x1="0" y1="95" x2="110" y2="95" stroke={gridLine} strokeWidth="1" strokeDasharray="2" />
            {/* %K and %D lines crossing */}
            <path d="M 5 80 L 25 65 L 55 90 L 85 75 L 105 95" fill="none" stroke={cyan} strokeWidth="1.5" />
            <path d="M 5 85 L 25 70 L 55 85 L 85 80 L 105 90" fill="none" stroke={yellow} strokeWidth="1.5" strokeDasharray="2" />
          </svg>
        );
      case 10: // Fibonacci Retracement
        return (
          <svg viewBox="0 0 110 100" className="overflow-visible">
            {renderBackgroundCandles()}
            {/* Fib Levels */}
            <line x1="0" y1="10" x2="110" y2="10" stroke={cyan} strokeWidth="1" strokeDasharray="2" opacity="0.8" />
            <text x="5" y="8" fill={cyan} fontSize="8" opacity="0.8">0</text>
            <line x1="0" y1="35" x2="110" y2="35" stroke={yellow} strokeWidth="1" strokeDasharray="2" opacity="0.8" />
            <text x="5" y="33" fill={yellow} fontSize="8" opacity="0.8">0.382</text>
            <line x1="0" y1="50" x2="110" y2="50" stroke={green} strokeWidth="1" strokeDasharray="2" opacity="0.8" />
            <text x="5" y="48" fill={green} fontSize="8" opacity="0.8">0.5</text>
            <line x1="0" y1="65" x2="110" y2="65" stroke={red} strokeWidth="1" strokeDasharray="2" opacity="0.8" />
            <text x="5" y="63" fill={red} fontSize="8" opacity="0.8">0.618</text>
            <line x1="0" y1="90" x2="110" y2="90" stroke={cyan} strokeWidth="1" strokeDasharray="2" opacity="0.8" />
            <text x="5" y="88" fill={cyan} fontSize="8" opacity="0.8">1</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return <div className={`flex items-center justify-center ${scale}`}>{renderSVG()}</div>;
};

// ════════════════════════════════════════════════════════════
// 3. MAIN COMPONENT (Indicators Grid)
// ════════════════════════════════════════════════════════════
export default function Indicators() {
  const [selectedPattern, setSelectedPattern] = useState(null);

  return (
    <div className="w-full flex flex-col gap-6" style={{ fontFamily: "DM Sans, sans-serif" }}>

      {/* Grid Layout: Matches ChartPatterns perfectly */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 pb-10">
        {indicatorsData.map((indicator, index) => (
          <div
            key={indicator.id}
            className="group bg-[#0a0d11] border border-white/30 hover:border-cyan-500/30 rounded-xl p-2.5 flex flex-col gap-2 transition-all duration-300 hover:bg-[#0d1117] relative overflow-hidden"
          >
            {/* Click Area */}
            <button onClick={() => setSelectedPattern(indicator)} className="absolute inset-0 z-20"></button>

            {/* Index Badge */}
            <div className="absolute top-2 left-2 z-10 bg-white/5 text-gray-300 font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/20">
              {index + 1}
            </div>

            {/* Visual Box */}
            <div className="h-24 w-full mt-4 bg-[#05070a] rounded-lg border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
              <IndicatorVisual id={indicator.id} />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5 mt-1 relative z-10 pointer-events-none">
              <h3 className="text-white font-bold text-[14px] leading-tight truncate">
                {indicator.name}
              </h3>
              <p className="text-gray-400 text-[11px] leading-snug line-clamp-2 h-[26px]">
                {indicator.short}
              </p>
            </div>

            {/* Bottom Action Area */}
            <div className="mt-auto pt-2 border-t border-white/5 flex flex-col gap-2 relative z-10 pointer-events-none">
              <span
                className={`w-max px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                  indicator.type === "Trend" ? "text-cyan-400 bg-cyan-600/10" :
                  indicator.type === "Momentum" ? "text-purple-400 bg-purple-600/10" :
                  indicator.type === "Volatility" ? "text-yellow-400 bg-yellow-600/10" :
                  "text-emerald-500 bg-emerald-500/10"
                }`}
              >
                {indicator.type}
              </span>

              <div className="w-full py-1.5 bg-white/15 group-hover:bg-cyan-500/10 text-white group-hover:text-cyan-400 rounded-md text-[9px] font-bold transition-all flex items-center justify-center gap-1">
                STUDY <FiArrowRight size={10} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════
          4. DETAILS MODAL (Exact match to previous premium UI)
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
            <div className="w-full md:w-5/12 h-[25vh] md:h-full bg-gradient-to-br from-[#05070a] to-[#0f141a] p-4 md:p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/15 shrink-0">
              <div className="absolute inset-0 opacity-20 blur-[50px] bg-cyan-500/20" />
              <div className="relative z-10 w-full h-full flex items-center justify-center scale-90 md:scale-100">
                <IndicatorVisual id={selectedPattern.id} inModal={true} />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-7/12 flex flex-col h-[60vh] md:h-full bg-[#0a0d11]">
              
              <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                <div className="mb-4 md:mb-6">
                  <span className="text-cyan-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                    {selectedPattern.type} Indicator
                  </span>
                  <h2 className="text-white font-black text-xl md:text-3xl mt-1 tracking-tight">
                    {selectedPattern.name}
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2 border-l-2 border-cyan-500 pl-3">
                      Definition
                    </h3>
                    <p className="text-gray-300 text-[13px] md:text-sm leading-relaxed font-light">
                      {selectedPattern.detail}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2 border-l-2 border-cyan-500 pl-3">
                      Trading Strategy
                    </h3>
                    <div className="bg-[#05070a] p-3 md:p-4 rounded-xl border border-white/5 shadow-inner">
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
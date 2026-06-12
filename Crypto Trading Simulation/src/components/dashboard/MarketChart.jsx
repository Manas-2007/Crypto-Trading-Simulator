import React, { useEffect, useRef } from "react";

const MarketChart = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.innerHTML === "") {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "BITSTAMP:BTCUSD",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#05070a",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_widget",
      });
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="mx-2 md:mx-4 flex flex-col lg:flex-row gap-4 h-auto lg:h-[550px]">
      {/* ---------------- LEFT SIDE: CHART (Approx 75% width) ---------------- */}
      <div className="flex-grow w-full lg:w-[75%] rounded-xl overflow-hidden border border-white/30 bg-[#05070a]">
        <div
          id="tradingview_widget"
          ref={containerRef}
          className="h-[350px] md:h-[450px] lg:h-full w-full"
        />
      </div>

      {/* ---------------- RIGHT SIDE: STATS PANEL (Approx 25% width) ---------------- */}
      <div className="w-full lg:w-[25%] rounded-xl border border-white/30 bg-[#0a0d11] p-4 md:p-5 flex flex-col overflow-y-auto custom-scrollbar">
        {/* --- Header Info --- */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-white font-extrabold text-lg md:text-xl tracking-tight flex items-center gap-2">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#F7931A] flex justify-center items-center text-white text-[9px] md:text-[10px] font-black">
                ₿
              </div>
              BTC/USD
            </h2>
            <p className="text-gray-400 text-[10px] md:text-[11px] mt-1 font-medium">
              Bitcoin / U.S. Dollar • Spot
            </p>
          </div>
        </div>

        {/* --- Live Price Area --- */}
        <div className="mt-3 md:mt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
              59,498
            </span>
            <span className="text-gray-500 text-xs md:text-sm font-bold">
              USD
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-1.5">
            {/* Percentage Badge */}
            <div className="text-emerald-400 text-[10px] md:text-[11px] font-bold bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded">
              +486 (0.82%)
            </div>
            {/* Live Indicator */}
            <div className="flex items-center gap-1 md:gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]"></span>
              <span className="text-emerald-500/80 text-[8px] md:text-[9px] font-bold tracking-widest uppercase">
                Live Market
              </span>
            </div>
          </div>
        </div>

        {/* --- Navigation Action Buttons (BUY / SELL) --- */}
        <div className="flex gap-2 md:gap-3 mt-5 md:mt-6">
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 md:py-2.5 rounded-lg transition-all shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-xs md:text-sm tracking-wide">
            BUY
          </button>
          <button className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2 md:py-2.5 rounded-lg transition-all shadow-[0_4px_12px_rgba(239,68,68,0.15)] hover:shadow-[0_4px_15px_rgba(239,68,68,0.3)] text-xs md:text-sm tracking-wide">
            SELL
          </button>
        </div>

        <hr className="border-white/30 my-4 md:my-6" />

        {/* --- Ranges Section --- */}
        <div className="space-y-3 md:space-y-4">
          {/* Day's Range */}
          <div>
            <div className="flex justify-between text-gray-400 text-[9px] md:text-[10px] uppercase font-bold mb-1.5">
              <span>58,816</span>
              <span>Day's Range</span>
              <span>59,908</span>
            </div>
            <div className="h-1 bg-[#1a202c] rounded-full relative w-full">
              <div className="absolute left-[20%] right-[10%] h-full bg-[#2a303c] rounded-full"></div>
              <div className="absolute left-[70%] top-1 text-emerald-500 text-[8px] md:text-[10px]">
                ▲
              </div>
            </div>
          </div>

          {/* 52Wk Range */}
          <div>
            <div className="flex justify-between text-gray-400 text-[9px] md:text-[10px] uppercase font-bold mb-1.5">
              <span>24,920</span>
              <span>52wk Range</span>
              <span>73,794</span>
            </div>
            <div className="h-1 bg-[#1a202c] rounded-full relative w-full">
              <div className="absolute left-[10%] right-[5%] h-full bg-[#2a303c] rounded-full"></div>
              <div className="absolute left-[60%] top-1 text-emerald-500 text-[8px] md:text-[10px]">
                ▲
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/30 my-4 md:my-6" />

        {/* --- Key Stats Section --- */}
        <div className="flex-grow">
          <h3 className="text-white text-xs md:text-sm font-bold mb-2 md:mb-3">
            Key stats
          </h3>
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-[10px] md:text-xs">
                Volume
              </span>
              <span className="text-white text-[10px] md:text-xs font-mono font-medium">
                453.79
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-[10px] md:text-xs">
                Average Volume (30D)
              </span>
              <span className="text-white text-[10px] md:text-xs font-mono font-medium">
                2.48 K
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-[10px] md:text-xs">
                Trading volume 24h
              </span>
              <span className="text-white text-[10px] md:text-xs font-mono font-medium">
                26.83 B
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-[10px] md:text-xs">
                Market capitalization
              </span>
              <span className="text-white text-[10px] md:text-xs font-mono font-medium">
                1.17 T
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketChart;

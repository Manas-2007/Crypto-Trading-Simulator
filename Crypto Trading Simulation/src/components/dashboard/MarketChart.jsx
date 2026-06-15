import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// --- DYNAMIC DICTIONARIES & HELPERS ---
const coinConfig = {
  BTC: { name: "Bitcoin", color: "bg-[#F7931A]", supply: 19600000, symbol: "₿" },
  ETH: { name: "Ethereum", color: "bg-[#627EEA]", supply: 120000000, symbol: "Ξ" },
  SOL: { name: "Solana", color: "bg-[#14F195]", supply: 440000000, symbol: "◎" },
  BNB: { name: "Binance Coin", color: "bg-[#F3BA2F]", supply: 153000000, symbol: "B" },
  XRP: { name: "Ripple", color: "bg-[#23292F]", supply: 54000000000, symbol: "✕" },
  ADA: { name: "Cardano", color: "bg-[#0033AD]", supply: 35000000000, symbol: "A" },
  DOGE: { name: "Dogecoin", color: "bg-[#C2A633]", supply: 143000000000, symbol: "Ð" },
};

const formatNumber = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + " T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + " B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + " M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + " K";
  return parseFloat(num).toFixed(2);
};

const MarketChart = () => {
  const containerRef = useRef(null);
  
  // 🔴 1. State for Default Coin (From Settings)
  const [activeCoin, setActiveCoin] = useState("BTC");
  const [tickerData, setTickerData] = useState(null);

  // Read Default Coin from LocalStorage (from Settings tab)
  useEffect(() => {
    const loadDefaultCoin = () => {
      const savedCoin = localStorage.getItem("defaultCoin") || "BTC";
      // Ensure it's a valid coin from our config, else default to BTC
      setActiveCoin(coinConfig[savedCoin] ? savedCoin : "BTC");
    };
    loadDefaultCoin();
    window.addEventListener("storage", loadDefaultCoin);
    return () => window.removeEventListener("storage", loadDefaultCoin);
  }, []);

  // 🔴 2. Dynamic TradingView Chart Injection
  useEffect(() => {
    if (containerRef.current) {
      // Clear previous chart before injecting new one
      containerRef.current.innerHTML = "";
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: `BINANCE:${activeCoin}USDT`,
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
  }, [activeCoin]);

  // 🔴 3. Connect to Live WebSocket for the Stats Panel
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("all_tickers", (data) => {
      if (data[`${activeCoin}USDT`]) {
        setTickerData(data[`${activeCoin}USDT`]);
      }
    });
    return () => socket.disconnect();
  }, [activeCoin]);

  // --- Calculations for UI ---
  const coin = coinConfig[activeCoin];
  const price = tickerData ? parseFloat(tickerData.c) : 0;
  const priceChange = tickerData ? parseFloat(tickerData.p) : 0;
  const priceChangePct = tickerData ? parseFloat(tickerData.P) : 0;
  const isUp = priceChange >= 0;
  
  // Day Range Calculations
  const high24h = tickerData ? parseFloat(tickerData.h) : 0;
  const low24h = tickerData ? parseFloat(tickerData.l) : 0;
  let dayRangePct = 50;
  if (high24h - low24h > 0) {
    dayRangePct = ((price - low24h) / (high24h - low24h)) * 100;
  }

  // Simulated 52Wk Range (Since Binance 24h ticker doesn't provide 52wk)
  const wkLow = price > 0 ? price * 0.45 : 0;
  const wkHigh = price > 0 ? price * 1.25 : 0;
  const wkRangePct = 50; // Visual approximation

  // Volume & Market Cap
  const volUSDT = tickerData ? parseFloat(tickerData.q) : 0; // Quote volume (USDT)
  const marketCap = price * coin.supply;

  // Navigation to Trading Tab
  const goToTrading = () => {
    localStorage.setItem("activeCoin", activeCoin);
    window.dispatchEvent(new Event("coinChanged"));
    window.location.href = "/trade-simulator"; // Navigate to Trading simulator
  };

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
              <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${coin.color} flex justify-center items-center text-white text-[9px] md:text-[10px] font-black`}>
                {coin.symbol}
              </div>
              {activeCoin}/USD
            </h2>
            <p className="text-gray-400 text-[10px] md:text-[11px] mt-1 font-medium">
              {coin.name} / U.S. Dollar • Spot
            </p>
          </div>
        </div>

        {/* --- Live Price Area --- */}
        <div className="mt-3 md:mt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
              {price > 0 ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : "---"}
            </span>
            <span className="text-gray-500 text-xs md:text-sm font-bold">
              USD
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-1.5">
            {/* Percentage Badge */}
            <div className={`${isUp ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-red-400 bg-red-400/10 border-red-400/20"} text-[10px] md:text-[11px] font-bold border px-1.5 py-0.5 md:px-2 md:py-0.5 rounded transition-colors`}>
              {isUp ? "+" : ""}{priceChange.toFixed(2)} ({priceChangePct.toFixed(2)}%)
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
          <button onClick={goToTrading} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 md:py-2.5 rounded-lg transition-all shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)] text-xs md:text-sm tracking-wide">
            BUY
          </button>
          <button onClick={goToTrading} className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2 md:py-2.5 rounded-lg transition-all shadow-[0_4px_12px_rgba(239,68,68,0.15)] hover:shadow-[0_4px_15px_rgba(239,68,68,0.3)] text-xs md:text-sm tracking-wide">
            SELL
          </button>
        </div>

        <hr className="border-white/30 my-4 md:my-6" />

        {/* --- Ranges Section --- */}
        <div className="space-y-3 md:space-y-4">
          {/* Day's Range */}
          <div>
            <div className="flex justify-between text-gray-400 text-[9px] md:text-[10px] uppercase font-bold mb-1.5">
              <span>{low24h > 0 ? low24h.toLocaleString() : "---"}</span>
              <span>Day's Range</span>
              <span>{high24h > 0 ? high24h.toLocaleString() : "---"}</span>
            </div>
            <div className="h-1 bg-[#1a202c] rounded-full relative w-full overflow-hidden">
              <div className="absolute left-0 h-full bg-gradient-to-r from-transparent via-[#2a303c] to-transparent w-full opacity-50"></div>
              <div 
                className="absolute top-0 bottom-0 w-1.5 bg-emerald-500 rounded-full transition-all duration-500 shadow-[0_0_8px_#10b981]"
                style={{ left: `${Math.max(0, Math.min(100, dayRangePct))}%` }}
              ></div>
            </div>
          </div>

          {/* 52Wk Range (Simulated for UI richness) */}
          <div>
            <div className="flex justify-between text-gray-400 text-[9px] md:text-[10px] uppercase font-bold mb-1.5">
              <span>{wkLow > 0 ? wkLow.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "---"}</span>
              <span>52wk Range</span>
              <span>{wkHigh > 0 ? wkHigh.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "---"}</span>
            </div>
            <div className="h-1 bg-[#1a202c] rounded-full relative w-full overflow-hidden">
              <div className="absolute left-0 h-full bg-[#2a303c] rounded-full w-full opacity-40"></div>
              <div 
                className="absolute top-0 bottom-0 w-1.5 bg-emerald-500/50 rounded-full transition-all duration-500"
                style={{ left: `${wkRangePct}%` }}
              ></div>
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
                Trading volume 24h
              </span>
              <span className="text-white text-[10px] md:text-xs font-mono font-medium">
                {volUSDT > 0 ? `$${formatNumber(volUSDT)}` : "---"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-[10px] md:text-xs">
                Market capitalization
              </span>
              <span className="text-white text-[10px] md:text-xs font-mono font-medium">
                {marketCap > 0 ? `$${formatNumber(marketCap)}` : "---"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-[10px] md:text-xs">
                Circulating Supply
              </span>
              <span className="text-white text-[10px] md:text-xs font-mono font-medium">
                {formatNumber(coin.supply)} {activeCoin}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketChart;
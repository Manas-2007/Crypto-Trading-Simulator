import React, { useEffect, useRef, memo, useState } from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
  FiMaximize,
  FiX,
} from "react-icons/fi";
import TradeModal from "./TradeModal";

// ════════════════════════════════════════════════════════════
// 1. TRADE MARKER COMPONENT (Tooltip & Circle)
// ════════════════════════════════════════════════════════════
const TradeMarker = ({ trade, onClose, currentPrice }) => {
  const [showDetails, setShowDetails] = useState(false);

  const profitLoss =
    trade.type === "Buy"
      ? (currentPrice - trade.targetPrice) * trade.inputValue
      : (trade.targetPrice - currentPrice) * trade.inputValue;

  return (
    <div className="absolute inset-0 z-[60] flex items-center pointer-events-none">
      {/* Dotted Line */}
      <div
        className={`absolute left-0 right-0 border-t-2 border-dashed ${trade.type === "Buy" ? "border-emerald-500" : "border-red-500"} opacity-60`}
      ></div>

      {/* Marker Point */}
      <div className="absolute left-[50%] -translate-x-1/2 flex flex-col items-center pointer-events-auto">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-white/20 transition-transform hover:scale-110 ${trade.type === "Buy" ? "bg-emerald-500" : "bg-red-500"}`}
        >
          {trade.type === "Buy" ? (
            <FiArrowUp color="white" size={14} />
          ) : (
            <FiArrowDown color="white" size={14} />
          )}
        </div>

        {/* Tooltip */}
        {showDetails && (
          <div
            className="absolute top-10 mt-2 w-56 bg-[#0a0d11] border border-white/20 rounded-xl p-3 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`font-bold text-sm ${trade.type === "Buy" ? "text-emerald-400" : "text-red-400"}`}
              >
                {trade.type}: {trade.asset}
              </span>
              {/* FIX: Ye sirf tooltip band karega, trade nahi */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(false);
                }}
                className="text-gray-500 hover:text-white p-1"
              >
                <FiX size={14} />
              </button>
            </div>

            <div className="space-y-1.5 text-[11px] text-gray-400 font-mono mb-3">
              <div className="flex justify-between">
                <span>Executed:</span>{" "}
                <span className="text-white">
                  ${trade.targetPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Current:</span>{" "}
                <span className="text-white">${currentPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/10 mt-1">
                <span>P/L:</span>
                <span
                  className={
                    profitLoss >= 0 ? "text-emerald-400" : "text-red-400"
                  }
                >
                  {profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)}
                </span>
              </div>
            </div>

            {/* FIX: Trade band karne ke liye alag button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-full py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded text-[10px] font-bold transition-all"
            >
              Close Position
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 2. TRADINGVIEW WIDGET (Pro Chart)
// ════════════════════════════════════════════════════════════
const TradingViewChart = memo(({ activeTrades, onCloseTrade }) => {
  const container = useRef();
  const chartWrapperRef = useRef();

  // LIVE PRICE MOCKING STATE (Ye missing tha, isliye crash ho raha tha!)
  const [currentPrice, setCurrentPrice] = useState(68247.9);

  // Har 2 second mein price randomly up/down hoga taaki P/L change hota dikhe
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => prev + (Math.random() - 0.5) * 15);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      chartWrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = "";
    }
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "#0a0d11",
        "gridColor": "rgba(255, 255, 255, 0.05)",
        "hide_top_toolbar": false,
        "hide_side_toolbar": false, 
        "hide_legend": false,
        "save_image": true,
        "allow_symbol_change": true,
        "toolbar_bg": "#05070a",
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div
      ref={chartWrapperRef}
      className="relative w-full h-[450px] md:h-[600px] border border-white/30 rounded-xl overflow-hidden shadow-2xl bg-[#0a0d11]"
    >
      {/* --- VISUAL MARKER --- */}
      {activeTrades.map((trade) => (
        <TradeMarker
          key={trade.id}
          trade={trade}
          onClose={() => onCloseTrade(trade.id)}
          currentPrice={currentPrice}
        />
      ))}

      {/* --- Fullscreen Button --- */}
      <button
        onClick={toggleFullscreen}
        className="hidden md:flex absolute top-[10px] right-[48px] z-50 p-[5px] bg-[#131722] hover:bg-emerald-600/80 text-gray-300 hover:text-white rounded transition-all border border-white/10"
        title="Toggle Fullscreen"
        style={{
          height: "28px",
          width: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FiMaximize size={14} />
      </button>

      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
});

// ════════════════════════════════════════════════════════════
// 3. MOCK DATA FOR TOP CRYPTOCURRENCIES
// ════════════════════════════════════════════════════════════
const cryptoData = [
  {
    id: 1,
    rank: "1",
    asset: "BTC",
    name: "Bitcoin",
    price: "68,247.90",
    change: "+1.86%",
    isUp: true,
    high: "68,785.60",
    low: "66,842.10",
    mcap: "$1.34T",
    vol: "$28.42B",
    rsi: "65",
    trend: "Bullish",
    color: "bg-[#F7931A]",
  },
  {
    id: 2,
    rank: "2",
    asset: "ETH",
    name: "Ethereum",
    price: "3,512.45",
    change: "+2.35%",
    isUp: true,
    high: "3,567.80",
    low: "3,401.20",
    mcap: "$422.18B",
    vol: "$15.63B",
    rsi: "58",
    trend: "Neutral",
    color: "bg-[#627EEA]",
  },
  {
    id: 3,
    rank: "3",
    asset: "SOL",
    name: "Solana",
    price: "152.68",
    change: "+4.12%",
    isUp: true,
    high: "156.20",
    low: "146.30",
    mcap: "$71.02B",
    vol: "$3.15B",
    rsi: "72",
    trend: "Overbought",
    color: "bg-[#14F195]",
  },
  {
    id: 4,
    rank: "4",
    asset: "BNB",
    name: "Binance Coin",
    price: "598.34",
    change: "-0.75%",
    isUp: false,
    high: "605.20",
    low: "589.10",
    mcap: "$88.11B",
    vol: "$1.23B",
    rsi: "42",
    trend: "Bearish",
    color: "bg-[#F3BA2F]",
  },
  {
    id: 5,
    rank: "5",
    asset: "XRP",
    name: "Ripple",
    price: "0.5321",
    change: "+0.92%",
    isUp: true,
    high: "0.5387",
    low: "0.5191",
    mcap: "$29.36B",
    vol: "$1.08B",
    rsi: "50",
    trend: "Neutral",
    color: "bg-[#23292F]",
  },
];

// ════════════════════════════════════════════════════════════
// 4. MAIN TRADING COMPONENT
// ════════════════════════════════════════════════════════════
const Trading = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [activeTrades, setActiveTrades] = useState([]);

  const openTradeModal = (asset) => {
    setSelectedAsset(asset);
    setModalOpen(true);
  };

  const executeTrade = (tradeData) => {
    const newTrade = { ...tradeData, id: Date.now() };
    setActiveTrades((prev) => [...prev, newTrade]);
  };

  return (
    <div
      className="mx-2 md:mx-4 my-7 md:my-2 flex flex-col gap-6"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* --- TOP SECTION --- */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1 px-1">
          <FiActivity className="text-emerald-400" size={18} />
          <h1 className="text-white font-extrabold text-lg tracking-wide uppercase">
            Market Analysis
          </h1>
        </div>

        <TradingViewChart
          activeTrades={activeTrades}
          onCloseTrade={(id) =>
            setActiveTrades((prev) => prev.filter((t) => t.id !== id))
          }
        />
      </div>

      {/* --- TRADE MODAL --- */}
      <TradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        asset={selectedAsset}
        onTrade={executeTrade}
      />

      {/* --- BOTTOM SECTION: Market Watch --- */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-end px-1">
          <div>
            <h2 className="text-white font-extrabold text-lg md:text-xl tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
              Market Watch
            </h2>
            <p className="text-gray-400 text-[10px] md:text-xs mt-1">
              Live simulation feed of top crypto assets.
            </p>
          </div>
        </div>

        {/* ─── DESKTOP VIEW (TABLE) ─── */}
<div className="hidden md:block bg-[#0a0d11] border border-white/30 rounded-xl p-4 shadow-lg overflow-x-auto custom-scrollbar">
  <table className="w-full min-w-[1100px] text-left border-collapse">
    <thead>
      <tr className="text-gray-400 text-[10px] uppercase tracking-wider border-b border-white/30">
        <th className="pb-4 font-semibold pl-2">S.No.</th>
        <th className="pb-4 font-semibold">Asset</th>
        <th className="pb-4 font-semibold text-right">Price</th>
        <th className="pb-4 font-semibold text-right">24h Change</th>
        <th className="pb-4 font-semibold text-right">24h Vol</th>
        <th className="pb-4 font-semibold text-right">Market Cap</th>
        <th className="pb-4 font-semibold text-right">RSI (14)</th>
        <th className="pb-4 font-semibold text-right">Trend</th>
        <th className="pb-4 font-semibold text-center pr-2">Action</th>
      </tr>
    </thead>
    <tbody className="text-sm">
      {cryptoData.map((coin) => (
        <tr key={coin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
          <td className="py-4 pl-2 text-gray-300 font-mono text-xs">#{coin.rank}</td>
          <td className="py-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${coin.color} flex justify-center items-center text-white font-bold text-[10px] shadow-lg`}>
                {coin.asset.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white leading-tight">{coin.asset}</span>
                <span className="text-gray-500 text-[10px]">{coin.name}</span>
              </div>
            </div>
          </td>
          <td className="py-4 text-right text-white font-mono font-bold">${coin.price}</td>
          <td className={`py-4 text-right font-mono font-bold text-xs ${coin.isUp ? "text-emerald-400" : "text-red-500"}`}>
            <div className="flex items-center justify-end gap-1">
              {coin.isUp ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
              {coin.change}
            </div>
          </td>
          <td className="py-4 text-right text-gray-400 font-mono text-xs">{coin.vol}</td>
          <td className="py-4 text-right text-gray-400 font-mono text-xs">{coin.mcap}</td>
          <td className="py-4 text-right text-gray-300 font-mono text-xs">{coin.rsi}</td>
          <td className={`py-4 text-right font-bold text-xs ${coin.trend === 'Bullish' ? 'text-emerald-400' : coin.trend === 'Bearish' ? 'text-red-500' : 'text-gray-400'}`}>
            {coin.trend}
          </td>
          <td className="py-4 text-center pr-2">
            <button
              onClick={() => openTradeModal(coin.asset)}
              className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/30 px-6 py-2 rounded-md text-xs font-bold transition-all shadow-sm"
            >
              Trade {coin.asset}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* ─── MOBILE VIEW (CLEAN GRID CARDS) ─── */}
<div className="md:hidden flex flex-col gap-4 pb-4">
  {cryptoData.map((coin) => (
    <div key={coin.id} className="bg-[#0a0d11] border border-white/40 p-4 rounded-xl flex flex-col gap-3 shadow-lg relative overflow-hidden">
      
      {/* Top Header: Asset & Price */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${coin.color} flex justify-center items-center text-white font-bold text-xs`}>
            {coin.asset.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm">{coin.asset}</span>
            <span className="text-gray-400 text-[10px]">{coin.name}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono font-bold text-white text-sm">${coin.price}</span>
          <span className={`font-mono text-[10px] font-bold ${coin.isUp ? "text-emerald-400" : "text-red-400"}`}>
            {coin.change}
          </span>
        </div>
      </div>

      {/* Stats Grid: 2x2 layout */}
      <div className="grid grid-cols-2 gap-y-2 border-t border-white/30 pt-3">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase text-gray-400 font-bold">Volume</span>
          <span className="text-gray-300 font-mono text-xs">{coin.vol}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] uppercase text-gray-400 font-bold">M.Cap</span>
          <span className="text-gray-300 font-mono text-xs">{coin.mcap}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase text-gray-400 font-bold">RSI (14)</span>
          <span className="text-gray-300 font-mono text-xs">{coin.rsi}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] uppercase text-gray-400 font-bold">Trend</span>
          <span className={`font-bold text-xs ${coin.trend === 'Bullish' ? 'text-emerald-400' : coin.trend === 'Bearish' ? 'text-red-400' : 'text-gray-400'}`}>
            {coin.trend}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => openTradeModal(coin.asset)}
        className="w-full bg-emerald-400/10 hover:bg-emerald-500 active:scale-95 text-emerald-400 hover:text-white border border-green-600 py-2 rounded-lg text-xs font-bold transition-all mt-1"
      >
        Trade {coin.asset}
      </button>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default Trading;

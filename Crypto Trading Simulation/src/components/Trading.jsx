import React, { useEffect, useRef, memo, useState } from "react";
import io from "socket.io-client";
import useCryptoSocket from "../hooks/useCryptoSocket";
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
// 1. TRADE MARKER COMPONENT (Now with accurate P/L Math & Smart Positioning)
// ════════════════════════════════════════════════════════════
const TradeMarker = ({ trade, onClose, currentPrice, index }) => {
  const [showDetails, setShowDetails] = useState(false);

  // EXACT P/L MATH: (Exit - Entry) * Qty * Leverage
  const profitLoss =
    trade.type === "Buy"
      ? (currentPrice - trade.targetPrice) * trade.qty * trade.leverage
      : (trade.targetPrice - currentPrice) * trade.qty * trade.leverage;

  // 🔴 MAGIC CALCULATION (The Hack for Overlap & Movement)
  // Entry Price aur Live Price ka difference nikal kar UI ko move karenge.
  // 0.5 is zoom sensitivity. Tu isey 1 ya 2 karke dekh sakta hai agar movement slow lage.
  const verticalOffset = (trade.targetPrice - currentPrice) * 0.5; 
  
  // Trades ek ke upar ek na aayen, isliye har trade ko right shift karenge (60px per trade)
  const horizontalOffset = `calc(20% + ${index * 60}px)`;

  return (
    // 1. Wrapper ko Y-Axis pe move kiya (Price ke hisaab se upar-neeche hoga)
    <div 
      className="absolute left-0 right-0 z-[60] flex items-center pointer-events-none transition-transform duration-[400ms] ease-out"
      style={{ top: "50%", transform: `translateY(${verticalOffset}px)` }}
    >
      {/* Dotted Line */}
      <div
        className={`absolute left-0 right-0 border-t-2 border-dashed ${trade.type === "Buy" ? "border-emerald-500" : "border-red-500"} opacity-60`}
      ></div>

      {/* 2. Marker ko X-Axis pe spread kiya taaki overlap na ho */}
      <div 
        className="absolute flex flex-col items-center pointer-events-auto"
        style={{ left: horizontalOffset }}
      >
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

        {/* Tooltip Details */}
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
                <span>Margin:</span>{" "}
                <span className="text-white">
                  ${trade.investment.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Entry Price:</span>{" "}
                <span className="text-white">
                  ${trade.targetPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Live Price:</span>{" "}
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

            <button
              onClick={(e) => {
                e.stopPropagation();
                // Close button ab live price bhejega action ke liye
                onClose(trade.id, currentPrice);
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
// 2. TRADINGVIEW WIDGET
// ════════════════════════════════════════════════════════════
const TradingViewChart = memo(({ activeTrades, onCloseTrade, symbol }) => {
  const container = useRef();
  const chartWrapperRef = useRef();

  const [activeCoin, setActiveCoin] = useState(
    () => localStorage.getItem("activeCoin") || "BTC",
  );
  useEffect(() => {
    const handleCoinChange = () =>
      setActiveCoin(localStorage.getItem("activeCoin") || "BTC");
    window.addEventListener("coinChanged", handleCoinChange);
    return () => window.removeEventListener("coinChanged", handleCoinChange);
  }, []);

  const liveData = useCryptoSocket(activeCoin);
  const currentPrice = parseFloat(liveData.price) || 0;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      chartWrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (!container.current) return; 

    if (container.current) {
      container.current.innerHTML = "";
    }
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
    {
      "autosize": true,
      "symbol": "${symbol}", 
      "interval": "1", 
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "backgroundColor": "#05070a",
      "gridColor": "rgba(255, 255, 255, 0.05)",
      "hide_top_toolbar": false,
      "hide_side_toolbar": false,
      "hide_legend": false,
      "save_image": false,
      "allow_symbol_change": false,
      "toolbar_bg": "#05070a",
      "support_host": "https://www.tradingview.com"
    }`;
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      ref={chartWrapperRef}
      className="relative w-full h-[450px] md:h-[600px] border border-white/30 rounded-xl overflow-hidden shadow-2xl bg-[#0a0d11]"
    >
      // Aise update kar:
          {activeTrades.map((trade, index) => (
            trade.asset === activeCoin && (
              <TradeMarker 
                key={trade.id} 
                trade={trade} 
                index={index} 
                onClose={(id, exitPrice) => onCloseTrade(id, exitPrice)} 
                currentPrice={currentPrice} 
              />
            )
          ))}
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
// 3. TOP 10 CRYPTO DATA
// ════════════════════════════════════════════════════════════
const cryptoData = [
  {
    id: 1,
    rank: "1",
    asset: "BTC",
    name: "Bitcoin",
    price: "64,550.59",
    change: "+1.26%",
    isUp: true,
    high: "64,762.77",
    low: "63,746.18",
    mcap: "$1.27T",
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
  {
    id: 6,
    rank: "6",
    asset: "ADA",
    name: "Cardano",
    price: "0.4560",
    change: "-1.20%",
    isUp: false,
    high: "0.4610",
    low: "0.4480",
    mcap: "$16.20B",
    vol: "$400M",
    rsi: "45",
    trend: "Bearish",
    color: "bg-[#0033AD]",
  },
  {
    id: 7,
    rank: "7",
    asset: "DOGE",
    name: "Dogecoin",
    price: "0.1420",
    change: "+5.60%",
    isUp: true,
    high: "0.1450",
    low: "0.1340",
    mcap: "$20.50B",
    vol: "$1.20B",
    rsi: "68",
    trend: "Bullish",
    color: "bg-[#C2A633]",
  },
  {
    id: 8,
    rank: "8",
    asset: "AVAX",
    name: "Avalanche",
    price: "32.40",
    change: "+1.10%",
    isUp: true,
    high: "33.00",
    low: "31.50",
    mcap: "$12.80B",
    vol: "$600M",
    rsi: "55",
    trend: "Neutral",
    color: "bg-[#E84142]",
  },
  {
    id: 9,
    rank: "9",
    asset: "DOT",
    name: "Polkadot",
    price: "6.85",
    change: "-0.50%",
    isUp: false,
    high: "6.95",
    low: "6.70",
    mcap: "$9.80B",
    vol: "$200M",
    rsi: "48",
    trend: "Neutral",
    color: "bg-[#E6007A]",
  },
  {
    id: 10,
    rank: "10",
    asset: "MATIC",
    name: "Polygon",
    price: "0.6800",
    change: "+2.00%",
    isUp: true,
    high: "0.6900",
    low: "0.6600",
    mcap: "$6.70B",
    vol: "$300M",
    rsi: "60",
    trend: "Bullish",
    color: "bg-[#8247E5]",
  },
];

// ════════════════════════════════════════════════════════════
// 4. MAIN TRADING COMPONENT (Brain of the Operations)
// ════════════════════════════════════════════════════════════
const Trading = () => {
  const [activeCoin, setActiveCoin] = useState(
    () => localStorage.getItem("activeCoin") || "BTC",
  );
  const [currentSymbol, setCurrentSymbol] = useState(
    "BINANCE:" + (localStorage.getItem("activeCoin") || "BTC") + "USDT",
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [modalPrice, setModalPrice] = useState(0);
  const [activeTrades, setActiveTrades] = useState([]);

  // --- BALANCE TRACKING ---
  const [balance, setBalance] = useState(
    () => parseFloat(localStorage.getItem("balance")) || 10000,
  );

  const liveData = useCryptoSocket(activeCoin);
  const [liveTickers, setLiveTickers] = useState({});

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("all_tickers", (data) => setLiveTickers(data));
    return () => socket.disconnect();
  }, []);

  // Sync balance with Navbar
  useEffect(() => {
    localStorage.setItem("balance", balance);
    window.dispatchEvent(new Event("storage"));
  }, [balance]);

  const handleCoinSwitch = (asset) => {
    setCurrentSymbol("BINANCE:" + asset + "USDT");
    localStorage.setItem("activeCoin", asset);
    setActiveCoin(asset);
    window.dispatchEvent(new Event("coinChanged"));
  };

  const openTradeModal = (e, asset) => {
    e.stopPropagation();
    setSelectedAsset(asset);
    handleCoinSwitch(asset);

    let targetPrice = 0;
    if (asset === activeCoin && liveData.price !== "0.00") {
      targetPrice = parseFloat(liveData.price);
    } else {
      const coin = cryptoData.find((c) => c.asset === asset);
      targetPrice = coin ? parseFloat(coin.price.replace(/,/g, "")) : 0;
    }

    setModalPrice(targetPrice);
    setModalOpen(true);
  };

  // 🔴 1. OPENING THE POSITION
 const executeTrade = (tradeData) => {
    const { asset, type, targetPrice, inputValue, inputType, leverage } = tradeData;

    let totalPositionValue = 0;
    let coinQty = 0;

    // 1. Calculate Total Position Value (Ensure they are treated as Numbers)
    if (inputType === "Amount") {
      totalPositionValue = Number(inputValue); 
      coinQty = Number(inputValue) / Number(targetPrice);
    } else {
      coinQty = Number(inputValue); 
      totalPositionValue = Number(inputValue) * Number(targetPrice);
    }

    // 2. Apply Leverage to get EXACT Margin
    const exactMarginToDeduct = totalPositionValue / Number(leverage);

    // 3. Balance Check
    if (balance < exactMarginToDeduct) {
      alert(`Transaction Failed: Insufficient Balance! You need $${exactMarginToDeduct.toFixed(2)} USDT for this ${leverage}x trade.`);
      return;
    }

    // 4. Update Balance (Deduct EXACT Margin)
    setBalance((prev) => prev - exactMarginToDeduct);

    // 5. Save the Trade to Chart
    const newTrade = { 
      ...tradeData, 
      id: Date.now(),
      investment: exactMarginToDeduct, // Exact paisa jo balance se kata
      qty: coinQty,
      leverage: Number(leverage)
    };
    
    setActiveTrades((prev) => [...prev, newTrade]);
    setModalOpen(false);
    
    // Success Alert
    alert(`Trade Success: ${type} ${coinQty.toFixed(4)} ${asset} at ${leverage}x\nMargin Used: $${exactMarginToDeduct.toFixed(2)}`);
  };


  // 🟢 2. CLOSING THE POSITION (Calculating P/L)
  const handleClosePosition = (tradeId, exitPrice) => {
    const tradeToClose = activeTrades.find((t) => t.id === tradeId);
    if (!tradeToClose) return;

    // Calculate P/L
    let profitLoss = 0;
    if (tradeToClose.type === "Buy") {
      profitLoss =
        (exitPrice - tradeToClose.targetPrice) *
        tradeToClose.qty *
        tradeToClose.leverage;
    } else {
      profitLoss =
        (tradeToClose.targetPrice - exitPrice) *
        tradeToClose.qty *
        tradeToClose.leverage;
    }

    // Add Initial Investment + P/L back to balance
    const totalReturn = tradeToClose.investment + profitLoss;

    setBalance((prev) => prev + totalReturn);

    // Remove the trade from Chart
    setActiveTrades((prev) => prev.filter((t) => t.id !== tradeId));

    alert(
      `Position Closed: ${tradeToClose.asset}\nNet P/L: ${profitLoss >= 0 ? "+" : ""}$${profitLoss.toFixed(2)}\nReturned to Balance: $${totalReturn.toFixed(2)}`,
    );
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
          symbol={currentSymbol}
          activeTrades={activeTrades}
          onCloseTrade={handleClosePosition} // Pass close handler
        />
      </div>

      {/* --- TRADE MODAL --- */}
      <TradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        asset={selectedAsset}
        onTrade={executeTrade}
        currentPrice={modalPrice}
        currentBalance={balance}
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
              Live simulation feed of top 10 crypto assets.
            </p>
          </div>
        </div>

       {/* ─── DESKTOP VIEW ─── */}
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
            {/* ─── DESKTOP VIEW KI TBODY REPLACE KARO ─── */}
            <tbody className="text-sm">
              {cryptoData.map((coin) => {
                // 🔴 LIVE DATA LOGIC
                const ticker = liveTickers[`${coin.asset}USDT`];
                const livePrice = ticker ? parseFloat(ticker.c).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : coin.price;
                const changeVal = ticker ? parseFloat(ticker.P) : parseFloat(coin.change);
                const liveChange = ticker ? Math.abs(changeVal).toFixed(2) + "%" : coin.change.replace('+', '').replace('-', '');
                const isUp = changeVal >= 0;
                const liveVol = ticker ? parseFloat(ticker.v).toLocaleString('en-US', { maximumFractionDigits: 0 }) : coin.vol;

                // 🔴 DYNAMIC TREND LOGIC (RSI KE BASIS PAR)
                const rsiValue = parseFloat(coin.rsi);
                const trendLabel = rsiValue >= 60 ? "Bullish" : rsiValue <= 40 ? "Bearish" : "Neutral";
                const trendColor = rsiValue >= 60 ? "text-emerald-400" : rsiValue <= 40 ? "text-red-500" : "text-gray-400";

                return (
                  <tr
                    key={coin.id}
                    onClick={() => handleCoinSwitch(coin.asset)}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer ${activeCoin === coin.asset ? 'bg-white/5 border-l-2 border-l-emerald-500' : ''}`}
                  >
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
                    
                    {/* LIVE COLUMNS */}
                    <td className="py-4 text-right text-white font-mono font-bold">${livePrice}</td>
                    <td className={`py-4 text-right font-mono font-bold text-xs ${isUp ? "text-emerald-400" : "text-red-500"}`}>
                      <div className="flex items-center justify-end gap-1">
                        {isUp ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                        {isUp ? "+" : "-"}{liveChange}
                      </div>
                    </td>
                    <td className="py-4 text-right text-gray-400 font-mono text-xs">{liveVol}</td>
                    
                    {/* STATIC COLUMNS */}
                    <td className="py-4 text-right text-gray-400 font-mono text-xs">{coin.mcap}</td>
                    <td className="py-4 text-right text-gray-300 font-mono text-xs">{coin.rsi}</td>
                    <td className={`py-4 text-right font-bold text-xs ${trendColor}`}>
                      {trendLabel}
                    </td>
                    <td className="py-4 text-center pr-2">
                      <button
                        onClick={(e) => openTradeModal(e, coin.asset)}
                        className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/30 px-6 py-2 rounded-md text-xs font-bold transition-all shadow-sm"
                      >
                        Trade {coin.asset}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ─── MOBILE VIEW KO REPLACE KARO ─── */}
        <div className="md:hidden flex flex-col gap-4 pb-4">
          {cryptoData.map((coin) => {
            // 🔴 LIVE DATA LOGIC (Same as Desktop)
            const ticker = liveTickers[`${coin.asset}USDT`];
            const livePrice = ticker ? parseFloat(ticker.c).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : coin.price;
            const changeVal = ticker ? parseFloat(ticker.P) : parseFloat(coin.change);
            const liveChange = ticker ? Math.abs(changeVal).toFixed(2) + "%" : coin.change.replace('+', '').replace('-', '');
            const isUp = changeVal >= 0;
            const liveVol = ticker ? parseFloat(ticker.v).toLocaleString('en-US', { maximumFractionDigits: 0 }) : coin.vol;

            // 🔴 DYNAMIC TREND LOGIC (RSI KE BASIS PAR)
            const rsiValue = parseFloat(coin.rsi);
            const trendLabel = rsiValue >= 60 ? "Bullish" : rsiValue <= 40 ? "Bearish" : "Neutral";
            const trendColor = rsiValue >= 60 ? "text-emerald-400" : rsiValue <= 40 ? "text-red-500" : "text-gray-400";

            return (
              <div
                key={coin.id}
                onClick={() => handleCoinSwitch(coin.asset)}
                className={`bg-[#0a0d11] border border-white/40 p-4 rounded-xl flex flex-col gap-3 shadow-lg relative overflow-hidden cursor-pointer ${activeCoin === coin.asset ? 'border-emerald-500' : ''}`}
              >
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
                    {/* LIVE COLUMNS */}
                    <span className="font-mono font-bold text-white text-sm">${livePrice}</span>
                    <span className={`font-mono text-[10px] font-bold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                      {isUp ? "+" : "-"}{liveChange}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-2 border-t border-white/30 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-gray-400 font-bold">Volume</span>
                    <span className="text-gray-300 font-mono text-xs">{liveVol}</span>
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
                    <span className={`font-bold text-xs ${trendColor}`}>{trendLabel}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => openTradeModal(e, coin.asset)}
                  className="w-full bg-emerald-400/10 hover:bg-emerald-500 active:scale-95 text-emerald-400 hover:text-white border border-green-600 py-2 rounded-lg text-xs font-bold transition-all mt-1"
                >
                  Trade {coin.asset}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trading;

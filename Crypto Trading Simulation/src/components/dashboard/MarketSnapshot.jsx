import React from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes shimmerLine {
    0%   { stroke-dashoffset: 300; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 0px rgba(16,185,129,0); }
    50%       { box-shadow: 0 0 12px rgba(16,185,129,0.18); }
  }

  .card-coin {
    animation: fadeUp 0.4s ease both;
  }
  .card-coin:nth-child(1) { animation-delay: 0.05s; }
  .card-coin:nth-child(2) { animation-delay: 0.1s;  }
  .card-coin:nth-child(3) { animation-delay: 0.15s; }
  .card-coin:nth-child(4) { animation-delay: 0.2s;  }

  .sparkline-path {
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    animation: shimmerLine 1.2s ease forwards;
    animation-delay: 0.4s;
  }

  .card-pos {
    border: 1px solid rgba(16, 185, 129, 0.28);
    background: linear-gradient(145deg, #080f10 0%, #091210 100%);
  }
  .card-pos:hover {
    border-color: rgba(16, 185, 129, 0.65);
    box-shadow: 0 0 22px rgba(16,185,129,0.12), 0 4px 24px rgba(0,0,0,0.5);
    animation: glowPulse 2s ease infinite;
  }
  .card-neg {
    border: 1px solid rgba(239, 68, 68, 0.22);
    background: linear-gradient(145deg, #0f0808 0%, #120909 100%);
  }
  .card-neg:hover {
    border-color: rgba(239, 68, 68, 0.55);
    box-shadow: 0 0 22px rgba(239,68,68,0.10), 0 4px 24px rgba(0,0,0,0.5);
  }

  .price-mono {
    font-family: 'DM Mono', monospace;
  }
`;

const cryptoData = [
  {
    id: 1,
    name: "BTC-USD",
    desc: "Bitcoin",
    price: "$45,581",
    change: "-10.05%",
    isPositive: true,
    vol: "2.4B",
  },
  {
    id: 2,
    name: "ETH-USD",
    desc: "Ethereum",
    price: "$3,125",
    change: "+7.85%",
    isPositive: true,
    vol: "1.1B",
  },
  {
    id: 3,
    name: "SOL-USD",
    desc: "Solana",
    price: "$181.85",
    change: "+4.76%",
    isPositive: false,
    vol: "540M",
  },
  {
    id: 4,
    name: "BSD-USD",
    desc: "USD Coin",
    price: "$821.85",
    change: "+1.50%",
    isPositive: true,
    vol: "890M",
  },
];

/* ─── Sparkline paths ─── */
const PATHS = {
  up: {
    line: "M2 22 C 18 18, 34 12, 50 14 C 66 16, 80 6, 98 2",
    fill: "M2 22 C 18 18, 34 12, 50 14 C 66 16, 80 6, 98 2 L98 28 L2 28Z",
  },
  down: {
    line: "M2 4  C 18 8,  34 20, 50 17 C 66 14, 80 22, 98 26",
    fill: "M2 4  C 18 8,  34 20, 50 17 C 66 14, 80 22, 98 26 L98 28 L2 28Z",
  },
};

const Sparkline = ({ isPositive }) => {
  const col = isPositive ? "#10b981" : "#ef4444";
  const path = isPositive ? PATHS.up : PATHS.down;
  const fillCol = isPositive ? "rgba(16,185,129,0.10)" : "rgba(239,68,68,0.10)";

  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Area fill */}
      <path d={path.fill} fill={fillCol} />
      <path
        className="sparkline-path"
        d={path.line}
        fill="none"
        stroke={col}
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${col})` }}
      />
      <circle
        cx={isPositive ? 98 : 98}
        cy={isPositive ? 2 : 26}
        r="2.5"
        fill={col}
        style={{ filter: `drop-shadow(0 0 4px ${col})` }}
      />
    </svg>
  );
};

/* ─── Coin card ─── */
const CoinCard = ({ coin }) => {
  const isPos = coin.isPositive;
  const bgBadge = isPos ? "rgba(16,185,129,0.10)" : "rgba(239,68,68,0.10)";
  const borderIcon = isPos ? "rgba(16,185,129,0.30)" : "rgba(239,68,68,0.30)";
  const textAccent = isPos ? "#34d399" : "#f87171";

  return (
    <div
      className={`card-coin relative rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer p-3 md:p-4 ${isPos ? "card-pos" : "card-neg"}`}
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Top row: icon + name + badge */}
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <div className="flex items-center gap-1.5 md:gap-2.5">
          <div
            className="flex items-center justify-center rounded-full font-bold flex-shrink-0 w-6 h-6 md:w-[34px] md:h-[34px] text-[8px] md:text-[11px]"
            style={{
              background: bgBadge,
              border: `2px solid ${borderIcon}`,
              color: textAccent,
              fontFamily: "DM Mono, monospace",
            }}
          >
            {coin.name.substring(0, 1)}
          </div>
          <div>
            <p
              className="text-white font-semibold leading-none text-[10px] md:text-xs tracking-wide"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              {coin.name}
            </p>
            <p className="text-gray-400 mt-0.5 md:mt-1 text-[8px] md:text-[10px] uppercase tracking-wider">
              {coin.desc}
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-0.5 md:gap-1 rounded-md px-1.5 py-0.5 md:px-2 flex-shrink-0 text-[8px] md:text-[10px]"
          style={{
            background: bgBadge,
            color: textAccent,
            fontFamily: "DM Mono, monospace",
          }}
        >
          {isPos ? (
            <FiArrowUpRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
          ) : (
            <FiArrowDownRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
          )}
          {coin.change}
        </div>
      </div>

      {/* Sparkline — Responsive height */}
      <div className="h-6 md:h-10 mb-2 md:mb-2.5">
        <Sparkline isPositive={isPos} />
      </div>

      {/* Bottom row: price + vol */}
      <div className="flex items-end justify-between">
        <p className="price-mono text-white font-medium leading-none text-xs md:text-base tracking-tight">
          {coin.price}
        </p>
        <p className="text-gray-400 text-[8px] md:text-[9px] uppercase">
          VOL {coin.vol}
        </p>
      </div>
    </div>
  );
};

/* ─── MarketSnapshot ─── */
const MarketSnapshot = () => (
  <>
    <style>{styles}</style>
    <div
      className="px-3 sm:px-5 lg:px-7 pt-3 sm:pt-5 lg:pt-0 pb-3 sm:pb-5 lg:pb-7 space-y-3 sm:space-y-4 md:space-y-5"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <div className="flex items-center justify-between">
        <p
          className="text-gray-400 uppercase text-[9px] md:text-[10px] tracking-widest"
          style={{ fontFamily: "DM Mono, monospace" }}
        >
          Market Snapshot
        </p>
        <p
          className="text-gray-400 text-[9px] md:text-[10px]"
          style={{ fontFamily: "DM Mono, monospace" }}
        >
          Updated just now
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
        {cryptoData.map((coin, i) => (
          <CoinCard key={coin.id} coin={coin} idx={i} />
        ))}
      </div>
    </div>
  </>
);

export default MarketSnapshot;

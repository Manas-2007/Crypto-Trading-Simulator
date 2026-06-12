import React from 'react';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

const tickerData = [
  { name: 'BTC', price: '45,581.50', change: '+2.4%', isUp: true },
  { name: 'ETH', price: '3,125.80', change: '-1.2%', isUp: false },
  { name: 'SOL', price: '181.85', change: '+5.1%', isUp: true },
  { name: 'BNB', price: '590.20', change: '+0.8%', isUp: true },
  { name: 'XRP', price: '0.5201', change: '-2.3%', isUp: false },
  { name: 'ADA', price: '0.455', change: '+1.9%', isUp: true },
  { name: 'DOGE', price: '0.151', change: '+4.2%', isUp: true },
];

const PriceRibbon = () => {
  return (
<div className="mx-4 w-[calc(100%-32px)] overflow-hidden bg-[#0d1015] border border-white/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] rounded-xl">
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-premium {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
        .premium-ticker-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          border-right: 1px solid rgba(73, 69, 69, 0.98);
          transition: all 0.3s ease;
        }
        .premium-ticker-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <div className="animate-marquee-premium">
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={index} className="premium-ticker-item">
            {/* Coin Name with subtle border */}
            <div className="flex items-center gap-1.5 border border-[#2a2f3d] px-2.5 py-1 rounded-md bg-[#0a0d11]">
              <span className="text-white font-extrabold text-sm tracking-tight">{item.name}</span>
            </div>
            
            {/* Price with Monospace font and subtle glow */}
            <span className="font-mono text-gray-100 text-sm font-medium tracking-wide drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
              ${item.price}
            </span>
            
            {/* Change Badge (Premium Green/Red) */}
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
              item.isUp 
                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-700 shadow-[0_0_8px_rgba(16,185,129,0.2)]' 
                : 'bg-red-950/40 text-red-400 border border-red-700 shadow-[0_0_8px_rgba(239,68,68,0.2)]'
            }`}>
              {item.isUp ? <FiArrowUpRight size={13} /> : <FiArrowDownRight size={13} />}
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRibbon;
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiChevronDown, 
  FiSettings, 
  FiRefreshCcw, 
  FiBriefcase
} from 'react-icons/fi';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const assetData = {
    pair: "BTC/USDT",
    price: "68,247.10",
    change: "+1.35%",
    high: "68,650.00",
    low: "66,950.20",
    volume: "23,456.78 BTC"
  };

  const currentBalance = "$10,234.56";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResetBalance = () => {
    alert("Balance reset to initial starting funds! (Simulation)");
    setIsDropdownOpen(false);
  };

  return (
<header 
  className="hidden md:flex items-center justify-between px-6 py-3 bg-[#05070a]/95 backdrop-blur-md border-b border-white/30 sticky top-0 z-50 shrink-0"
  style={{ fontFamily: 'DM Sans, sans-serif' }}
>
      
      {/* ─── LEFT SECTION: Currency Stats ─── */}
      <div className="flex items-center gap-6 lg:gap-8">
        
        {/* Pair & Price */}
        <div className="flex items-baseline gap-3">
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition-colors">
            <h2 className="text-white font-extrabold text-lg tracking-wide">{assetData.pair}</h2>
            <FiChevronDown className="text-gray-400 mt-1" size={14} />
          </div>
          <span className="text-emerald-400 font-mono font-bold text-lg">
            {assetData.price}
          </span>
          <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">
            {assetData.change}
          </span>
        </div>

        {/* 24h Stats */}
        <div className="flex items-center gap-5 lg:gap-8 border-l border-white/30 pl-6 lg:pl-8">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase font-semibold">24h High</span>
            <span className="text-white font-mono text-xs font-medium">{assetData.high}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase font-semibold">24h Low</span>
            <span className="text-white font-mono text-xs font-medium">{assetData.low}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase font-semibold">24h Volume</span>
            <span className="text-white font-mono text-xs font-medium">{assetData.volume}</span>
          </div>
        </div>
      </div>

      {/* ─── RIGHT SECTION: Balance & Settings ─── */}
      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* Demo Account Box with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/30 px-3 py-1.5 rounded-lg transition-colors group"
          >
            <div className="p-1.5 bg-white/5 rounded-md text-gray-400 group-hover:text-white transition-colors">
              <FiBriefcase size={16} />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-gray-200 text-[9px] font-bold uppercase tracking-widest leading-none mb-0.5">
                Demo Account
              </span>
              <span className="text-white font-mono font-bold text-sm leading-none">
                {currentBalance}
              </span>
            </div>
            <div className="ml-2 text-gray-400 group-hover:text-white transition-colors">
              <FiChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0a0d11] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in origin-top-right">
              <div className="p-3 border-b border-white/5">
                <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Available Funds</p>
                <p className="text-white font-mono font-bold">{currentBalance}</p>
              </div>
              <div className="p-1.5">
                <button 
                  onClick={handleResetBalance}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <FiRefreshCcw size={12} />
                  Reset Balance
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-white/30"></div>

        {/* Settings Icon (Links to /settings) */}
        <Link 
          to="/settings" 
          className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
          title="Platform Settings"
        >
          <FiSettings size={20} className="group-hover:rotate-45 transition-transform duration-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border border-[#05070a] shadow-[0_0_6px_#10b981]"></span>
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
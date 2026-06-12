import React from "react";
import {
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiShield,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#05070a] border-t border-white/30 pt-10 pb-6 px-4 md:px-6 mt-12">
      {/* Grid: 2 cols on mobile, 4 cols on desktop */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
        {/* 1. Brand Section: Spans full width (2 cols) on mobile, 1 col on desktop */}
        <div className="col-span-2 lg:col-span-1 space-y-3 md:space-y-4">
          <h2 className="text-white font-black text-base md:text-lg tracking-wider flex items-center gap-2">
            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 text-sm md:text-base">
              ₿
            </span>
            CRYPTO SIM
          </h2>
          <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed max-w-[90%] sm:max-w-[80%] lg:max-w-[200px]">
            The professional paper trading platform. Test your strategies in a
            risk-free environment.
          </p>
        </div>

        {/* 2. Links Column 1: Takes 1 col on mobile (Left side) */}
        <div className="col-span-1 space-y-3 md:space-y-4">
          <h4 className="text-white font-bold text-[11px] md:text-xs uppercase tracking-widest">
            Platform
          </h4>
          <ul className="space-y-2 md:space-y-2.5 text-gray-500 text-[11px] md:text-xs">
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Trade Simulator
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Performance
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Knowledge Hub
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Watchlist
            </li>
          </ul>
        </div>

        {/* 3. Links Column 2: Takes 1 col on mobile (Right side) */}
        <div className="col-span-1 space-y-3 md:space-y-4">
          <h4 className="text-white font-bold text-[11px] md:text-xs uppercase tracking-widest">
            Legal
          </h4>
          <ul className="space-y-2 md:space-y-2.5 text-gray-500 text-[11px] md:text-xs">
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Privacy Policy
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Terms of Service
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Security
            </li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">
              Help Center
            </li>
          </ul>
        </div>

        {/* 4. Newsletter / Social: Spans full width (2 cols) on mobile, 1 col on desktop */}
        <div className="col-span-2 lg:col-span-1 space-y-3 md:space-y-4 mt-2 lg:mt-0">
          <h4 className="text-white font-bold text-[11px] md:text-xs uppercase tracking-widest">
            Stay Updated
          </h4>
          <div className="flex bg-[#131722] rounded-lg border border-white/10 overflow-hidden">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-transparent w-full px-3 py-2 text-[11px] md:text-xs text-white outline-none placeholder-gray-500"
            />
            <button className="bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-500 transition-colors">
              <FiSend size={14} />
            </button>
          </div>
          <div className="flex gap-4 text-gray-500 pt-1">
            <FiTwitter
              className="hover:text-white cursor-pointer transition-colors"
              size={16}
            />
            <FiGithub
              className="hover:text-white cursor-pointer transition-colors"
              size={16}
            />
            <FiLinkedin
              className="hover:text-white cursor-pointer transition-colors"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar: Center aligned on mobile, space-between on desktop */}
      <div className="max-w-7xl mx-auto pt-5 md:pt-6 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
        <p className="text-[9px] md:text-[10px] text-gray-400 flex items-center justify-center md:justify-start gap-1.5">
          <FiShield size={12} className="text-emerald-500/70" /> Risk Warning:
          Trading cryptocurrencies involves significant risk.
        </p>
        <p className="text-[9px] md:text-[10px] text-gray-500">
          © {new Date().getFullYear()} Crypto Trading Simulator. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

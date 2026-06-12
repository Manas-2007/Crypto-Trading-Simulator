import React from 'react';
import { FiTwitter, FiGithub, FiLinkedin, FiSend, FiShield } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#05070a] border-t border-white/30 pt-12 pb-6 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-white font-black text-lg tracking-wider flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">₿</span>
            CRYPTO SIM
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
            The professional paper trading platform. Test your strategies in a risk-free environment.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Platform</h4>
          <ul className="space-y-2 text-gray-500 text-xs">
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Trade Simulator</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Performance</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Knowledge Hub</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Watchlist</li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Legal</h4>
          <ul className="space-y-2 text-gray-500 text-xs">
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Security</li>
            <li className="hover:text-emerald-500 cursor-pointer transition-colors">Help Center</li>
          </ul>
        </div>

        {/* Newsletter / Social */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Stay Updated</h4>
          <div className="flex bg-[#131722] rounded-lg border border-[#1a202c] overflow-hidden">
            <input 
              type="email" 
              placeholder="Enter email" 
              className="bg-transparent w-full px-3 py-2 text-xs text-white outline-none placeholder-gray-600"
            />
            <button className="bg-emerald-600 p-2 text-white hover:bg-emerald-500 transition-colors">
              <FiSend size={14} />
            </button>
          </div>
          <div className="flex gap-4 text-gray-500">
            <FiTwitter className="hover:text-white cursor-pointer transition-colors" size={16} />
            <FiGithub className="hover:text-white cursor-pointer transition-colors" size={16} />
            <FiLinkedin className="hover:text-white cursor-pointer transition-colors" size={16} />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-gray-300 flex items-center gap-2">
          <FiShield /> Risk Warning: Trading cryptocurrencies involves significant risk.
        </p>
        <p className="text-[10px] text-gray-300">
          © {new Date().getFullYear()} Crypto Trading Simulator. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
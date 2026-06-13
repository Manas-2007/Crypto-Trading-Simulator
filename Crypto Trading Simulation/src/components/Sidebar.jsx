import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; 
import {
  FiGrid,
  FiActivity,
  FiPieChart,
  FiBookOpen,
  FiBriefcase,
  FiRefreshCcw,
  FiStar,
  FiClock,
  FiSettings,
  FiMenu,
  FiX,
  FiTrendingUp,
} from "react-icons/fi";

const glowStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.6; transform: scale(1);   }
    50%       { opacity: 1;   transform: scale(1.08); }
  }
  @keyframes borderShine {
    0%   { box-shadow: 0 0 6px rgba(16,185,129,0.25), inset 0 0 6px rgba(16,185,129,0.05); }
    50%  { box-shadow: 0 0 18px rgba(16,185,129,0.55), inset 0 0 10px rgba(16,185,129,0.1); }
    100% { box-shadow: 0 0 6px rgba(16,185,129,0.25), inset 0 0 6px rgba(16,185,129,0.05); }
  }
  @keyframes slideDown {
    from { opacity:0; transform: translateY(-15px); }
    to   { opacity:1; transform: translateY(0);      }
  }

  .shimmer-text {
    background: linear-gradient(
      90deg,
      #6ee7b7 0%,
      #34d399 30%,
      #ffffff 50%,
      #34d399 70%,
      #6ee7b7 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .logo-ring {
    animation: borderShine 3s ease-in-out infinite;
  }
  .quote-card {
    animation: borderShine 4s ease-in-out infinite;
  }
  .mobile-menu-enter {
    animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .custom-scrollbar::-webkit-scrollbar        { width: 3px; }
  .custom-scrollbar::-webkit-scrollbar-track  { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb  { background: #10b981; border-radius: 99px; }
`;

const menuItems = [
  { name: "Dashboard", icon: <FiGrid /> },
  { name: "Trade Simulator", icon: <FiActivity /> },
  { name: "Performance", icon: <FiPieChart /> },
  { name: "Knowledge Hub", icon: <FiBookOpen /> },
  { name: "Watchlist", icon: <FiStar /> },
  { name: "History", icon: <FiClock /> },
  { name: "Settings", icon: <FiSettings /> },
];

const LogoFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900/60 to-[#0d1117]">
    <FiTrendingUp className="text-emerald-400" style={{ fontSize: "40%" }} />
  </div>
);

const LogoImage = ({ size = "full" }) => {
  const [err, setErr] = useState(false);
  return err ? (
    <LogoFallback />
  ) : (
    <img
      src="/cryptoLogo.jpg"
      alt="Crypto Trading Simulator"
      className={`w-${size} h-${size} object-cover`}
      onError={() => setErr(true)}
    />
  );
};

/* ─── Motivational card shared between mobile & desktop ─── */
const MotivationalCard = ({ compact = false }) => (
  <div
    className="quote-card relative rounded-xl overflow-hidden border border-emerald-500/40 bg-[#080d12]"
    style={{ padding: compact ? "14px 16px" : "18px 20px" }}
  >
    <div
      className="absolute -top-8 -right-8 rounded-full bg-emerald-600 pointer-events-none"
      style={{
        width: compact ? 80 : 100,
        height: compact ? 80 : 100,
        filter: "blur(40px)",
        opacity: 0.45,
        animation: "pulseGlow 4s ease-in-out infinite",
      }}
    />
    <div className="relative z-10 flex items-center gap-2 mb-2">
      <FiActivity
        className="text-emerald-300 flex-shrink-0"
        style={{
          animation: "pulseGlow 2s ease-in-out infinite",
          fontSize: compact ? 12 : 14,
        }}
      />
      <span
        className="uppercase tracking-widest font-semibold text-emerald-400"
        style={{ fontSize: compact ? 9 : 10 }}
      >
        Trader's Mindset
      </span>
    </div>
    <p
      className="relative z-10 text-gray-300 leading-relaxed italic border-l-2 border-emerald-500/40 pl-3"
      style={{ fontSize: compact ? 10 : 11 }}
    >
      "The stock market is a device for transferring money from the impatient to
      the patient."
    </p>
    <p
      className="relative z-10 mt-2 text-right text-emerald-600 font-semibold"
      style={{ fontSize: compact ? 9 : 10 }}
    >
      — Warren Buffett
    </p>
  </div>
);

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  // Helper function to generate route paths 
  const getPath = (name) => `/${name.toLowerCase().replace(" ", "-")}`;

  return (
    <>
      <style>{glowStyle}</style>

      {/*MOBILE TOP-BAR*/}
      <header className="md:hidden fixed top-0 left-0 right-0 z-[70] flex items-center justify-between px-4 py-3 bg-[#05070a]/95 backdrop-blur-xl border-b border-white/10 shadow-md">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div
            className="logo-ring flex-shrink-0 rounded-full overflow-hidden border border-emerald-500/50"
            style={{ width: 36, height: 36 }}
          >
            <LogoImage />
          </div>
          <div className="leading-tight mt-0.5">
            <p
              className="text-white font-bold text-[13px] tracking-wide"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Crypto Trading
            </p>
            <p
              className="shimmer-text text-[10px] font-semibold tracking-wider uppercase mt-0.5"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Simulator
            </p>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 -mr-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-500/10 transition-all duration-200 active:scale-95"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>


      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 z-[60] bg-[#05070a]/98 backdrop-blur-2xl flex flex-col mobile-menu-enter overflow-y-auto border-t border-white/5">
          <nav className="flex-1 px-4 pt-6 pb-2 space-y-2.5">

        {/* --- Mobile Balance Section with Reset --- */}
<div className="px-5 mt-2">
  <div className="flex items-center justify-between bg-[#0a0d11] border border-white/40 p-3 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="p-1.5 bg-white/5 rounded-md text-gray-300">
        <FiBriefcase size={16} />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Demo Account</span>
        <span className="text-white font-mono font-bold text-sm">$10,234.56</span>
      </div>
    </div>
    {/* Reset Icon Button */}
    <button 
      onClick={() => alert("Balance Reset!")} 
      className="p-2 text-gray-300 text-red-400 bg-red-500/10 rounded-lg transition-colors"
      title="Reset Balance"
    >
      <FiRefreshCcw size={16} />
    </button>
  </div>
</div>

            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={getPath(item.name)}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 text-left ${
                    isActive
                      ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      : "bg-transparent border border-white/5 text-gray-400 hover:text-white hover:border-white/20"
                  }`
                }
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="text-[18px] flex-shrink-0"
                      style={
                        isActive
                          ? {
                              filter:
                                "drop-shadow(0 0 8px rgba(16,185,129,0.8))",
                            }
                          : {}
                      }
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`text-[13px] ${
                        isActive ? "font-bold tracking-wide" : "font-medium"
                      }`}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <span
                        className="ml-auto w-2 h-2 rounded-full bg-emerald-400"
                        style={{ boxShadow: "0 0 8px #10b981" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="px-4 pb-8 pt-4">
            <MotivationalCard compact />
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR*/}
      <aside
        className="hidden md:flex flex-col h-screen flex-shrink-0 border-r border-white/10 overflow-hidden sticky top-0"
        style={{
          width: "clamp(220px, 18vw, 280px)",
          background:
            "linear-gradient(180deg, #05070a 0%, #080d12 60%, #0a0d11 100%)",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        {/* ── Logo block ── */}
        <div className="flex flex-col items-center pt-8 pb-6 px-5 border-b border-white/10 flex-shrink-0">
          <div
            className="logo-ring rounded-full overflow-hidden border border-emerald-500/50 mb-4 bg-[#0a0d11]"
            style={{
              width: "clamp(55px, 4.5vw, 70px)",
              height: "clamp(55px, 4.5vw, 70px)",
            }}
          >
            <LogoImage />
          </div>

          <h1
            className="font-bold text-white text-center leading-snug"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(13px, 1vw, 16px)",
            }}
          >
            Crypto Trading
          </h1>
          <h2
            className="shimmer-text font-bold text-center"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(13px, 1vw, 16px)",
            }}
          >
            Simulator
          </h2>
          <p
            className="text-gray-400 mt-1.5 text-center font-medium"
            style={{ fontSize: "clamp(9px, 0.75vw, 11px)" }}
          >
            Paper Trading Platform
          </p>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-5 px-4 space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={getPath(item.name)}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 rounded-xl transition-all duration-200 text-left group ${
                  isActive
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold"
                    : "border border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5 hover:border-white/10"
                }`
              }
              style={{ padding: "12px 14px" }}
            >
              {({ isActive }) => (
                <>
                  <span
                    className="flex-shrink-0"
                    style={{
                      fontSize: "clamp(15px, 1.1vw, 18px)",
                      filter: isActive
                        ? "drop-shadow(0 0 8px rgba(16,185,129,0.8))"
                        : "none",
                    }}
                  >
                    {item.icon}
                  </span>
                  <span style={{ fontSize: "clamp(12px, 0.85vw, 13px)" }}>
                    {item.name}
                  </span>
                  {isActive && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                      style={{ boxShadow: "0 0 6px #10b981" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Footer quote card ── */}
        <div className="p-4 flex-shrink-0 border-t border-white/30">
          <MotivationalCard />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import React, { useState } from "react";
import {
  FiGrid,
  FiActivity,
  FiPieChart,
  FiBookOpen,
  FiStar,
  FiClock,
  FiSettings,
  FiMenu,
  FiX,
  FiTrendingUp,
} from "react-icons/fi";

/* ─── Inline keyframes injected once ─── */
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
    from { opacity:0; transform: translateY(-12px); }
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
    animation: slideDown 0.35s ease forwards;
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

/* Fallback avatar when image can't load */
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
    {/* ambient glow blob */}
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

/* ══════════════════════════════════════════════════════════ */
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTab = (name) => {
    setActiveTab(name);
    setMobileOpen(false);
  };

  return (
    <>
      <style>{glowStyle}</style>

      {/* ════════════════════════════════════════════
          📱 MOBILE TOP-BAR  (< md)
      ════════════════════════════════════════════ */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-[70] flex items-center justify-between px-4 py-3 bg-[#080d12]/95 backdrop-blur-md border-b border-emerald-900/40">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div
            className="logo-ring flex-shrink-0 rounded-full overflow-hidden border border-emerald-500/50"
            style={{ width: 38, height: 38 }}
          >
            <LogoImage />
          </div>
          <div className="leading-tight">
            <p
              className="text-white font-bold text-sm tracking-wide"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Crypto Trading
            </p>
            <p
              className="shimmer-text text-xs font-semibold"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Simulator
            </p>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-500/10 transition-all duration-200 active:scale-95"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </header>

      {/* Spacer so page content isn't hidden under fixed bar */}
      <div className="md:hidden h-[58px]" />

      {/* ════════════════════════════════════════════
          📱 MOBILE DRAWER  (slides down)
      ════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[58px] left-0 right-0 bottom-0 z-[60] bg-[#080d12]/97 backdrop-blur-xl flex flex-col mobile-menu-enter overflow-y-auto">
          <nav className="flex-1 px-4 pt-5 pb-2 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-250 text-left ${
                  activeTab === item.name
                    ? "bg-emerald-500/12 border border-emerald-500/30 text-emerald-400 font-semibold"
                    : "bg-white/[0.03] border border-white/[0.05] text-gray-400 hover:text-white hover:border-emerald-900/60"
                }`}
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                <span
                  className="text-lg flex-shrink-0"
                  style={
                    activeTab === item.name
                      ? { filter: "drop-shadow(0 0 6px rgba(16,185,129,0.9))" }
                      : {}
                  }
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
                {activeTab === item.name && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ boxShadow: "0 0 6px #10b981" }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="px-4 pb-6 pt-2">
            <MotivationalCard compact />
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          💻 DESKTOP SIDEBAR  (md+)
      ════════════════════════════════════════════ */}
      <aside
        className="hidden md:flex flex-col h-screen flex-shrink-0 border-r border-emerald-900/30 overflow-hidden"
        style={{
          width: "clamp(220px, 18vw, 280px)",
          background:
            "linear-gradient(180deg, #080d12 0%, #0b1018 60%, #0d1420 100%)",
          fontFamily: "DM Sans, sans-serif",
        }}
      >
        {/* ── Logo block ── */}
        <div className="flex flex-col items-center pt-8 pb-6 px-5 border-b border-emerald-900/30 flex-shrink-0">
          <div
            className="logo-ring rounded-full overflow-hidden border-2 border-emerald-500/50 mb-4"
            style={{
              width: "clamp(60px, 5vw, 80px)",
              height: "clamp(60px, 5vw, 80px)",
            }}
          >
            <LogoImage />
          </div>

          <h1
            className="font-bold text-white text-center leading-snug"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(14px, 1.1vw, 17px)",
            }}
          >
            Crypto Trading
          </h1>
          <h2
            className="shimmer-text font-bold text-center"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(14px, 1.1vw, 17px)",
            }}
          >
            Simulator
          </h2>
          <p
            className="text-gray-300 mt-1.5 text-center"
            style={{ fontSize: "clamp(10px, 0.75vw, 12px)" }}
          >
            Paper Trading Platform
          </p>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-5 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 rounded-xl transition-all duration-250 text-left group ${
                activeTab === item.name
                  ? "bg-emerald-500/12 border border-emerald-300 text-emerald-400 font-semibold"
                  : "border border-transparent text-gray-300 hover:text-gray-200 hover:bg-white/[0.04] hover:border-emerald-900/40"
              }`}
              style={{ padding: "10px 14px" }}
            >
              {/* Left accent bar */}
              <span
                className="absolute left-0 rounded-r-full transition-all duration-250"
                style={{
                  width: 3,
                  height: activeTab === item.name ? 28 : 0,
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                  position: "relative",
                  flexShrink: 0,
                  display: "none",
                }}
              />
              <span
                className="flex-shrink-0"
                style={{
                  fontSize: "clamp(16px, 1.2vw, 20px)",
                  filter:
                    activeTab === item.name
                      ? "drop-shadow(0 0 7px rgba(16,185,129,0.85))"
                      : "none",
                }}
              >
                {item.icon}
              </span>
              <span style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}>
                {item.name}
              </span>
              {activeTab === item.name && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                  style={{ boxShadow: "0 0 6px #10b981" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* ── Footer quote card ── */}
        <div className="p-4 flex-shrink-0">
          <MotivationalCard />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

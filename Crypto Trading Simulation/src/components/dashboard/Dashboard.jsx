import React from 'react';
import MarketSnapshot from './MarketSnapshot';
import MarketChart from './MarketChart';
import PriceRibbon from './PriceRibbon';
import DashCoins from './DashCoins';
import DashCandle from './Dashcandle';
import Footer from './Footer';

const Dashboard = () => {
  return (
<div className="p-0 space-y-8 pb-10" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        <MarketSnapshot />
      <PriceRibbon />
      <MarketChart />
      <DashCoins />
      <DashCandle />
      <Footer />
    </div>
  );
};

export default Dashboard;
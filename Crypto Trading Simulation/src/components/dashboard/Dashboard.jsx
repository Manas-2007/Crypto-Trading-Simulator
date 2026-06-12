import React from 'react';
import MarketSnapshot from './MarketSnapshot';
import MarketChart from './MarketChart';
import PriceRibbon from './PriceRibbon';

const Dashboard = () => {
  return (
    <div className="p-0 space-y-0" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <MarketSnapshot />
      <PriceRibbon />
      <MarketChart />
    </div>
  );
};

export default Dashboard;
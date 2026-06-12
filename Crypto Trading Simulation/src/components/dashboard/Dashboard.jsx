import React from 'react';
import MarketSnapshot from './MarketSnapshot';
import MarketChart from './MarketChart';

const Dashboard = () => {
  return (
    <div className="p-0 space-y-0" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <MarketSnapshot />
      <MarketChart />
    </div>
  );
};

export default Dashboard;
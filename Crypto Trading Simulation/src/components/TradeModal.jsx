import React, { useState, useEffect } from 'react';
import { FiX, FiActivity, FiDollarSign, FiTarget, FiShield } from 'react-icons/fi';

const TradeModal = ({ isOpen, onClose, asset, onTrade, currentPrice, currentBalance }) => {
  const [orderType, setOrderType] = useState('Market'); 
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('0');
  const [leverage, setLeverage] = useState('1');
  
  // Naye States: Take Profit & Stop Loss
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOrderType('Market');
      setAmount('');
      setLimitPrice(currentPrice ? currentPrice.toString() : '0');
      setLeverage('1');
      setTakeProfit('');
      setStopLoss('');
      setError('');
    }
  }, [isOpen, currentPrice]);

  if (!isOpen) return null;

  // --- Auto Calculation (Amount to Coin Qty) ---
  const calculateQty = () => {
    if (!amount || isNaN(amount)) return '0.0000';
    const priceToUse = orderType === 'Market' ? currentPrice : Number(limitPrice);
    return ((Number(amount) * Number(leverage)) / priceToUse).toFixed(4);
  };

  const handleAction = (tradeType) => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid USDT amount.');
      return;
    }
    if (orderType === 'Limit' && (!limitPrice || isNaN(limitPrice) || Number(limitPrice) <= 0)) {
      setError('Please enter a valid limit price.');
      return;
    }
    
    // Basic TP/SL Validation
    const entry = orderType === 'Market' ? currentPrice : Number(limitPrice);
    if (takeProfit && tradeType === 'Buy' && Number(takeProfit) <= entry) return setError('Take Profit must be higher than Entry Price for BUY.');
    if (stopLoss && tradeType === 'Buy' && Number(stopLoss) >= entry) return setError('Stop Loss must be lower than Entry Price for BUY.');
    if (takeProfit && tradeType === 'Sell' && Number(takeProfit) >= entry) return setError('Take Profit must be lower than Entry Price for SELL.');
    if (stopLoss && tradeType === 'Sell' && Number(stopLoss) <= entry) return setError('Stop Loss must be higher than Entry Price for SELL.');

    setError('');
    
    // Naya Trade Data Package
    const tradeData = { 
      asset, 
      orderType,
      targetPrice: entry,
      amount: Number(amount), // Direct amount in USDT
      leverage: Number(leverage), 
      tp: takeProfit ? Number(takeProfit) : null,
      sl: stopLoss ? Number(stopLoss) : null,
      type: tradeType 
    };
    
    onTrade(tradeData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/80 backdrop-blur-md p-4 transition-all">
      <div className="bg-[#0a0d11] border border-white/50 w-full md:max-w-[400px] rounded-t-2xl md:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-slide-up md:animate-fade-in pb-6 md:pb-0">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/30 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/10 rounded-md text-emerald-400">
              <FiActivity size={18} />
            </div>
            <h2 className="text-white font-bold tracking-wide">
              Trade <span className="text-emerald-400">{asset}</span>
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <FiX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          
          {/* Market / Limit Tabs */}
          <div className="flex bg-[#05070a] p-1 rounded-lg border border-white/20">
            {['Market', 'Limit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setOrderType(tab)}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${orderType === tab ? 'bg-white/30 text-white shadow-sm' : 'text-gray-300 hover:text-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Limit Price Input  */}
          <div className={`transition-all duration-300 ${orderType === 'Market' ? 'opacity-50' : 'opacity-100'}`}>
            <label className="text-gray-100 text-[10px] uppercase tracking-wider font-bold mb-1 block">
              {orderType === 'Market' ? 'Market Price' : 'Limit Price'}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-100"><FiDollarSign size={14} /></div>
              <input 
                type="number" 
                value={orderType === 'Market' ? currentPrice : limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                disabled={orderType === 'Market'}
                className="w-full bg-[#05070a] border border-white/40 rounded-lg py-2 pl-8 pr-12 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 disabled:cursor-not-allowed transition-colors"
              />
              <div className="absolute right-3 text-gray-100 font-bold text-[10px]">USDT</div>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1 block">
               <label className="text-gray-100 text-[10px] uppercase tracking-wider font-bold block">Investment (Amount)</label>
               <span className="text-gray-200 text-[10px]">Avail: ${currentBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-100"><FiDollarSign size={14} /></div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(''); }}
                className={`w-full bg-[#05070a] border ${error && !amount ? 'border-red-500/50' : 'border-white/40'} rounded-lg py-2 pl-8 pr-12 text-white font-mono text-base focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="0.00"
              />
              <div className="absolute right-3 text-gray-100 font-bold text-[10px]">USDT</div>
            </div>
            <p className="text-gray-400 text-[10px] mt-1 font-mono ml-1">
              Quantity: ≈ {calculateQty()} {asset}
            </p>
          </div>

          {/* TP & SL Inputs */}
          <div className="grid grid-cols-2 gap-3">
             <div>
                <label className="text-emerald-400 text-[10px] uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><FiTarget size={10}/> Take Profit</label>
                <input 
                  type="number" 
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  className="w-full bg-[#05070a] border border-white/20 rounded-lg py-1.5 px-3 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  placeholder="Optional"
                />
             </div>
             <div>
                <label className="text-red-400 text-[10px] uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><FiShield size={10}/> Stop Loss</label>
                <input 
                  type="number" 
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="w-full bg-[#05070a] border border-white/20 rounded-lg py-1.5 px-3 text-white font-mono text-xs focus:outline-none focus:border-red-500"
                  placeholder="Optional"
                />
             </div>
          </div>

          {/* Leverage Selector */}
          <div>
            <label className="text-gray-300 text-[10px] uppercase tracking-wider font-bold mb-1 flex justify-between">
              <span>Leverage (Margin)</span>
            </label>
            <div className="flex bg-[#05070a] p-1 rounded-lg border border-white/20">
              {['1', '5', '10', '20'].map((lev) => (
                <button
                  key={lev}
                  onClick={() => setLeverage(lev)}
                  className={`flex-1 py-1 rounded-md font-bold text-xs transition-all ${leverage === lev ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-[10px] font-semibold text-center">{error}</p>}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              onClick={() => handleAction('Buy')}
              className="flex-1 py-3 rounded-xl font-extrabold text-white text-sm bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              BUY / LONG
            </button>
            <button 
              onClick={() => handleAction('Sell')}
              className="flex-1 py-3 rounded-xl font-extrabold text-white text-sm bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              SELL / SHORT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TradeModal;
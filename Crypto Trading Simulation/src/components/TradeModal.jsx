import React, { useState, useEffect } from 'react';
import { FiX, FiActivity, FiDollarSign, FiClock } from 'react-icons/fi';

const TradeModal = ({ isOpen, onClose, asset, onTrade }) => {
  const currentPrice = 68247.90; 

  const [orderType, setOrderType] = useState('Market'); 
  const [inputType, setInputType] = useState('Amount');
  
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState(currentPrice.toString());
  const [leverage, setLeverage] = useState('1');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOrderType('Market');
      setInputType('Amount');
      setAmount('');
      setLimitPrice(currentPrice.toString());
      setLeverage('1');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // --- Auto Calculations ---
  const calculateEquiv = () => {
    if (!amount || isNaN(amount)) return '0.00';
    const priceToUse = orderType === 'Market' ? currentPrice : Number(limitPrice);
    
    if (inputType === 'Amount') {
      return (Number(amount) / priceToUse).toFixed(4);
    } else {
      return (Number(amount) * priceToUse).toFixed(2);
    }
  };

  const handleAction = (tradeType) => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError(`Please enter a valid ${inputType.toLowerCase()}.`);
      return;
    }
    if (orderType === 'Limit' && (!limitPrice || isNaN(limitPrice) || Number(limitPrice) <= 0)) {
      setError('Please enter a valid limit price.');
      return;
    }
    setError('');
    
    // Trade Data Package
    const tradeData = { 
      asset, 
      orderType,
      targetPrice: orderType === 'Market' ? currentPrice : Number(limitPrice),
      inputValue: Number(amount),
      inputType, // 'Amount' or 'Quantity'
      leverage: Number(leverage), 
      type: tradeType 
    };
    
    onTrade(tradeData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]/80 backdrop-blur-md p-4 transition-all">
      {/* Modal Container */}
      <div className="bg-[#0a0d11] border border-white/50 w-full md:max-w-[400px] rounded-t-2xl md:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-slide-up md:animate-fade-in pb-6 md:pb-0">
        
        {/* --- Header --- */}
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

        {/* --- Form Body --- */}
        <div className="p-5 space-y-5">
          
          {/* Order Type Tabs (Market / Limit) */}
          <div className="flex bg-[#05070a] p-1 rounded-lg border border-white/20">
            {['Market', 'Limit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setOrderType(tab)}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                  orderType === tab 
                  ? 'bg-white/30 text-white shadow-sm' 
                  : 'text-gray-300 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Limit Price Input  */}
          <div className={`transition-all duration-300 ${orderType === 'Market' ? 'opacity-50' : 'opacity-100'}`}>
            <label className="text-gray-100 text-[10px] uppercase tracking-wider font-bold mb-1.5 block">
              {orderType === 'Market' ? 'Market Price' : 'Limit Price'}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-100"><FiDollarSign size={14} /></div>
              <input 
                type="number" 
                value={orderType === 'Market' ? currentPrice : limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                disabled={orderType === 'Market'}
                className="w-full bg-[#05070a] border border-white/40 rounded-lg py-2.5 pl-8 pr-14 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 disabled:cursor-not-allowed transition-colors"
              />
              <div className="absolute right-3 text-gray-100 font-bold text-[10px]">USDT</div>
            </div>
          </div>

          {/* Amount / Quantity Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              {/* Toggle Input Type */}
              <div className="flex items-center gap-2">
                 <button 
                  onClick={() => setInputType('Amount')}
                  className={`text-[10px] uppercase font-bold tracking-wider ${inputType === 'Amount' ? 'text-white border-b border-emerald-400' : 'text-gray-400'}`}
                 >Amount</button>
                 <span className="text-gray-600 text-[10px]">|</span>
                 <button 
                  onClick={() => setInputType('Quantity')}
                  className={`text-[10px] uppercase font-bold tracking-wider ${inputType === 'Quantity' ? 'text-white border-b border-emerald-400' : 'text-gray-400'}`}
                 >Quantity</button>
              </div>
              <span className="text-gray-200 text-[10px]">Avail: $10,234.56</span>
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-100">
                {inputType === 'Amount' ? <FiDollarSign size={14} /> : <span className="font-bold text-xs">{asset.charAt(0)}</span>}
              </div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(''); }}
                className={`w-full bg-[#05070a] border ${error ? 'border-red-500/50' : 'border-white/40'} rounded-lg py-3 pl-8 pr-14 text-white font-mono text-base focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="0.00"
                autoComplete="off"
              />
              <div className="absolute right-3 text-gray-100 font-bold text-[10px]">
                {inputType === 'Amount' ? 'USDT' : asset}
              </div>
            </div>
            
            {/* Auto Conversion Helper Text */}
            <p className="text-gray-200 text-[10px] mt-1.5 font-mono ml-1">
              ≈ {calculateEquiv()} {inputType === 'Amount' ? asset : 'USDT'}
            </p>
            
            {error && <p className="text-red-400 text-[10px] mt-1 font-semibold ml-1">{error}</p>}
          </div>

          {/* Leverage Selector */}
          <div>
            <label className="text-gray-300 text-[10px] uppercase tracking-wider font-bold mb-1.5 flex justify-between">
              <span>Leverage (Margin)</span>
            </label>
            <div className="flex bg-[#05070a] p-1 rounded-lg border border-white/20">
              {['1', '5', '10', '20'].map((lev) => (
                <button
                  key={lev}
                  onClick={() => setLeverage(lev)}
                  className={`flex-1 py-1.5 rounded-md font-bold text-xs transition-all ${
                    leverage === lev 
                    ? 'bg-green-500/20 text-emerald-400' 
                    : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons (Buy & Sell) */}
          <div className="flex items-center gap-3 pt-2">
            <button 
    onClick={() => handleAction('Buy')}
    className="flex-1 py-3 rounded-xl font-extrabold text-white text-sm bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
  >
    BUY
  </button>
  <button 
    onClick={() => handleAction('Sell')}
    className="flex-1 py-3 rounded-xl font-extrabold text-white text-sm bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
  >
    SELL
  </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TradeModal;
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const useCryptoSocket = (symbol) => {
  const [data, setData] = useState({
    price: '0.00', priceChangePercent: '0.00', high: '0.00', low: '0.00', volume: '0.00'
  });

  useEffect(() => {
    const handleTickers = (allTickers) => {
      // Jo symbol pass kiya (e.g., 'BTC'), usey 'BTCUSDT' format mein badlo
      const formattedSymbol = symbol.toUpperCase() + 'USDT';
      const ticker = allTickers[formattedSymbol];

      if (ticker) {
        setData({
          price: parseFloat(ticker.c).toFixed(2),
          priceChangePercent: parseFloat(ticker.P).toFixed(2),
          high: parseFloat(ticker.h).toFixed(2),
          low: parseFloat(ticker.l).toFixed(2),
          volume: parseFloat(ticker.v).toFixed(2)
        });
      }
    };

    socket.on('all_tickers', handleTickers);
    return () => socket.off('all_tickers', handleTickers);
  }, [symbol]); // Jab bhi symbol badlega, ye update hoga

  return data;
};

export default useCryptoSocket;
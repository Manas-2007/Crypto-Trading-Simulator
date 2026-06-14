import { useState, useEffect } from 'react';

const useCryptoSocket = (symbol) => {
  const [data, setData] = useState({
    price: '0.00',
    priceChangePercent: '0.00',
    high: '0.00',
    low: '0.00',
    volume: '0.00'
  });

  useEffect(() => {
    // Binance WebSocket for 24hr ticker
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);

    ws.onmessage = (event) => {
      const ticker = JSON.parse(event.data);
      setData({
        price: parseFloat(ticker.c).toFixed(2), // Current price
        priceChangePercent: parseFloat(ticker.P).toFixed(2), // 24h change %
        high: parseFloat(ticker.h).toFixed(2), // 24h High
        low: parseFloat(ticker.l).toFixed(2), // 24h Low
        volume: parseFloat(ticker.v).toFixed(2) // 24h Volume
      });
    };

    return () => ws.close(); // Cleanup on unmount
  }, [symbol]);

  return data;
};

export default useCryptoSocket;
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Tere top 10 coins ki list
const coins = ['btcusdt', 'ethusdt', 'solusdt', 'bnbusdt', 'xrpusdt', 'adausdt', 'dogeusdt', 'avaxusdt', 'dotusdt', 'maticusdt'];
const streamUrl = 'wss://stream.binance.com:9443/stream?streams=' + coins.map(c => c + '@ticker').join('/');

let latestData = {};

function connectBinance() {
    const binanceWS = new WebSocket(streamUrl);

    binanceWS.on('message', (payload) => {
        const parsed = JSON.parse(payload);
        // Binance multiplexing mein data 'parsed.data' ke andar aata hai
        if (parsed.data) {
            latestData[parsed.data.s] = parsed.data; // .s matlab symbol (e.g. BTCUSDT)
        }
    });

    binanceWS.on('error', (err) => console.error('Binance WS Error:', err.message));
    binanceWS.on('close', () => {
        console.log('Reconnecting...');
        setTimeout(connectBinance, 3000);
    });
}

connectBinance();

// Har 250ms mein saare 10 coins ka data frontend ko bhejo
setInterval(() => {
    if (Object.keys(latestData).length > 0) {
        io.emit('all_tickers', latestData);
    }
}, 250);

server.listen(5000, '0.0.0.0', () => console.log('Backend relay server running on port 5000'));
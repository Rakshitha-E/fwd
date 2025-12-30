import express from "express";
import axios from "axios";

const router = express.Router();

// Function to get USD to INR exchange rate
async function getExchangeRate() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates.INR || 83; // Fallback to 83 if API fails
  } catch (error) {
    console.log('Exchange rate API failed, using fallback rate');
    return 83; // Fallback rate
  }
}

// Common stocks for search suggestions (Indian and International)
const STOCKS = [
  // Indian Stocks
  { symbol: 'TCS', name: 'Tata Consultancy Services Ltd', exchange: 'NSE' },
  { symbol: 'INFY', name: 'Infosys Ltd', exchange: 'NSE' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', exchange: 'NSE' },
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', exchange: 'NSE' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', exchange: 'NSE' },
  { symbol: 'ITC', name: 'ITC Ltd', exchange: 'NSE' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd', exchange: 'NSE' },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd', exchange: 'NSE' },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', exchange: 'NSE' },
  { symbol: 'WIPRO', name: 'Wipro Ltd', exchange: 'NSE' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', exchange: 'NSE' },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd', exchange: 'NSE' },
  { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Ltd', exchange: 'NSE' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', exchange: 'NSE' },
  { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd', exchange: 'NSE' },
  { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Ltd', exchange: 'NSE' },
  { symbol: 'CIPLA', name: 'Cipla Ltd', exchange: 'NSE' },
  { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd', exchange: 'NSE' },
  { symbol: 'GRASIM', name: 'Grasim Industries Ltd', exchange: 'NSE' },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd', exchange: 'NSE' },
  { symbol: 'JSWSTEEL', name: 'JSW Steel Ltd', exchange: 'NSE' },
  { symbol: 'NESTLEIND', name: 'Nestle India Ltd', exchange: 'NSE' },
  { symbol: 'NTPC', name: 'NTPC Ltd', exchange: 'NSE' },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Ltd', exchange: 'NSE' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd', exchange: 'NSE' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', exchange: 'NSE' },
  { symbol: 'TATAPOWER', name: 'Tata Power Company Ltd', exchange: 'NSE' },
  { symbol: 'TECHM', name: 'Tech Mahindra Ltd', exchange: 'NSE' },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', exchange: 'NSE' },

  // International Stocks (US Markets)
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ' },
  { symbol: 'NFLX', name: 'Netflix Inc.', exchange: 'NASDAQ' },
  { symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NASDAQ' },
  { symbol: 'CRM', name: 'Salesforce Inc.', exchange: 'NASDAQ' },
  { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NASDAQ' },
  { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', exchange: 'NASDAQ' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.', exchange: 'NASDAQ' },
  { symbol: 'UBER', name: 'Uber Technologies Inc.', exchange: 'NYSE' },
  { symbol: 'SPOT', name: 'Spotify Technology S.A.', exchange: 'NYSE' },
  { symbol: 'ZOOM', name: 'Zoom Video Communications Inc.', exchange: 'NASDAQ' },
  { symbol: 'SHOP', name: 'Shopify Inc.', exchange: 'NYSE' },
  { symbol: 'SQ', name: 'Block Inc.', exchange: 'NYSE' },
  { symbol: 'COIN', name: 'Coinbase Global Inc.', exchange: 'NASDAQ' },
  { symbol: 'PLTR', name: 'Palantir Technologies Inc.', exchange: 'NYSE' },
  { symbol: 'RIVN', name: 'Rivian Automotive Inc.', exchange: 'NASDAQ' },
  { symbol: 'LCID', name: 'Lucid Group Inc.', exchange: 'NASDAQ' },
  { symbol: 'NIO', name: 'NIO Inc.', exchange: 'NYSE' },
  { symbol: 'XPEV', name: 'XPeng Inc.', exchange: 'NYSE' },
  { symbol: 'LI', name: 'Li Auto Inc.', exchange: 'NASDAQ' },
  { symbol: 'BABA', name: 'Alibaba Group Holding Limited', exchange: 'NYSE' },
  { symbol: 'JD', name: 'JD.com Inc.', exchange: 'NASDAQ' },
  { symbol: 'BIDU', name: 'Baidu Inc.', exchange: 'NASDAQ' },
  { symbol: 'TCEHY', name: 'Tencent Holdings Limited', exchange: 'OTCMKTS' },
  { symbol: 'NVO', name: 'Novo Nordisk A/S', exchange: 'NYSE' },
  { symbol: 'ASML', name: 'ASML Holding N.V.', exchange: 'NASDAQ' },
  { symbol: 'SAP', name: 'SAP SE', exchange: 'NYSE' },
  { symbol: 'SONY', name: 'Sony Group Corporation', exchange: 'NYSE' },
  { symbol: 'TM', name: 'Toyota Motor Corporation', exchange: 'NYSE' },
  { symbol: 'HMC', name: 'Honda Motor Co. Ltd.', exchange: 'NYSE' },
  { symbol: 'SBUX', name: 'Starbucks Corporation', exchange: 'NASDAQ' },
  { symbol: 'MCD', name: 'McDonald\'s Corporation', exchange: 'NYSE' },
  { symbol: 'KO', name: 'The Coca-Cola Company', exchange: 'NYSE' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', exchange: 'NASDAQ' },
  { symbol: 'WMT', name: 'Walmart Inc.', exchange: 'NYSE' },
  { symbol: 'COST', name: 'Costco Wholesale Corporation', exchange: 'NASDAQ' },
  { symbol: 'HD', name: 'The Home Depot Inc.', exchange: 'NYSE' },
  { symbol: 'LOW', name: 'Lowe\'s Companies Inc.', exchange: 'NYSE' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE' },
  { symbol: 'BAC', name: 'Bank of America Corporation', exchange: 'NYSE' },
  { symbol: 'WFC', name: 'Wells Fargo & Company', exchange: 'NYSE' },
  { symbol: 'GS', name: 'The Goldman Sachs Group Inc.', exchange: 'NYSE' },
  { symbol: 'MS', name: 'Morgan Stanley', exchange: 'NYSE' },
  { symbol: 'V', name: 'Visa Inc.', exchange: 'NYSE' },
];

// GET stock search suggestions
// Example: GET /search?q=TCS
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    // Filter local stock list based on query
    const query = q.toUpperCase();
    const suggestions = STOCKS
      .filter(stock =>
        stock.symbol.toUpperCase().includes(query) ||
        stock.name.toUpperCase().includes(query)
      )
      .slice(0, 8)
      .map(stock => ({
        symbol: stock.symbol,
        name: stock.name,
        exchange: stock.exchange
      }));

    res.json(suggestions);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Failed to search stocks" });
  }
});

// GET live stock price using Yahoo Finance
// Example: GET /price?symbol=TCS
router.get("/price", async (req, res) => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "Symbol is required" });
    }

    const upperSymbol = symbol.toUpperCase();

    // Determine if it's an Indian stock
    const stockData = STOCKS.find(s => s.symbol === upperSymbol);
    const isIndianStock = stockData && stockData.exchange === 'NSE';

    // Use appropriate Yahoo Finance symbol
    let yahooSymbol = upperSymbol;
    if (isIndianStock) {
      yahooSymbol = `${upperSymbol}.NS`; // Add .NS for NSE
    }

    // Try Yahoo Finance API (no API key required)
    try {
      const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`, {
        params: {
          period1: Math.floor(Date.now() / 1000) - 86400, // 24 hours ago
          period2: Math.floor(Date.now() / 1000),
          interval: '1d',
          includePrePost: false,
          events: 'div,splits'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const chart = response.data.chart;
      if (chart.result && chart.result[0]) {
        const meta = chart.result[0].meta;
        const price = meta.regularMarketPrice;

        if (price && price > 0) {
          // Convert to INR for international stocks
          let finalPrice = price;
          if (!isIndianStock) {
            const exchangeRate = await getExchangeRate();
            finalPrice = price * exchangeRate;
          }
          return res.json({
            symbol: upperSymbol,
            price: parseFloat(finalPrice.toFixed(2)),
            currency: 'INR'
          });
        }
      }
    } catch (yahooErr) {
      console.log(`Yahoo Finance chart failed for ${yahooSymbol}:`, yahooErr.message);
    }

    // Fallback: Try Yahoo Finance quoteSummary endpoint
    try {
      const response = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${yahooSymbol}`, {
        params: {
          modules: 'price'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const result = response.data.quoteSummary.result;
      if (result && result[0] && result[0].price && result[0].price.regularMarketPrice) {
        const price = result[0].price.regularMarketPrice.raw;
        // Convert to INR for international stocks
        let finalPrice = price;
        if (!isIndianStock) {
          const exchangeRate = await getExchangeRate();
          finalPrice = price * exchangeRate;
        }
        return res.json({
          symbol: upperSymbol,
          price: parseFloat(finalPrice.toFixed(2)),
          currency: 'INR'
        });
      }
    } catch (quoteErr) {
      console.log(`Yahoo Finance quote failed for ${yahooSymbol}:`, quoteErr.message);
    }

    // Final fallback: Mock prices for demo
    const mockPrices = {
      // Indian Stocks
      'TCS': 3450.50, 'INFY': 1450.75, 'HDFCBANK': 1650.25, 'ICICIBANK': 950.80,
      'RELIANCE': 2850.90, 'BAJFINANCE': 7200.00, 'HINDUNILVR': 2450.60, 'ITC': 430.25,
      'KOTAKBANK': 1850.90, 'LT': 3650.75, 'MARUTI': 12500.50, 'WIPRO': 450.80,
      'BHARTIARTL': 1450.25, 'AXISBANK': 1150.90, 'ADANIPORTS': 1450.75,

      // International Stocks (US Markets)
      'AAPL': 175.25, 'MSFT': 335.50, 'GOOGL': 140.80, 'AMZN': 145.30,
      'TSLA': 248.50, 'META': 485.75, 'NVDA': 875.25, 'NFLX': 485.90,
      'ADBE': 485.25, 'CRM': 325.75, 'INTC': 21.50, 'AMD': 165.90,
      'PYPL': 58.25, 'UBER': 65.80, 'SPOT': 385.50, 'ZOOM': 68.90,
      'SHOP': 75.25, 'SQ': 65.40, 'COIN': 275.80, 'PLTR': 21.50,
      'RIVN': 16.80, 'LCID': 3.25, 'NIO': 5.90, 'XPEV': 8.75,
      'BABA': 88.50, 'JD': 27.80, 'BIDU': 98.25, 'TCEHY': 42.90,
      'NVO': 125.75, 'ASML': 875.50, 'SAP': 185.25, 'SONY': 85.90,
      'TM': 195.50, 'HMC': 32.75, 'SBUX': 95.25, 'MCD': 295.80,
      'KO': 58.90, 'PEP': 175.25, 'WMT': 175.50, 'COST': 850.25,
      'HD': 375.90, 'LOW': 235.75, 'JPM': 195.25, 'BAC': 37.50,
      'WFC': 55.80, 'GS': 415.25, 'MS': 95.75, 'V': 275.50
    };

    const mockPrice = mockPrices[upperSymbol];
    if (mockPrice) {
      // Convert to INR for international stocks
      let finalPrice = mockPrice;
      if (!isIndianStock) {
        const exchangeRate = await getExchangeRate();
        finalPrice = mockPrice * exchangeRate;
      }
      return res.json({
        symbol: upperSymbol,
        price: parseFloat(finalPrice.toFixed(2)),
        currency: 'INR'
      });
    }

    res.status(404).json({ error: `Price not found for symbol: ${upperSymbol}` });
  } catch (err) {
    console.error("Price error:", err.message);
    res.status(500).json({ error: "Failed to fetch stock price" });
  }
});

// GET historical stock data for graphs
// Example: GET /history?symbol=TCS
router.get("/history", async (req, res) => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "Symbol is required" });
    }

    const upperSymbol = symbol.toUpperCase();

    // Determine if it's an Indian stock
    const stockData = STOCKS.find(s => s.symbol === upperSymbol);
    const isIndianStock = stockData && stockData.exchange === 'NSE';

    // Use appropriate Yahoo Finance symbol
    let yahooSymbol = upperSymbol;
    if (isIndianStock) {
      yahooSymbol = `${upperSymbol}.NS`; // Add .NS for NSE
    }

    // Use Yahoo Finance API for historical data (last 30 days)
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - (30 * 24 * 60 * 60); // 30 days ago

    try {
      const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`, {
        params: {
          period1: startDate,
          period2: endDate,
          interval: '1d',
          includePrePost: false,
          events: 'div,splits'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 15000
      });

      const chart = response.data.chart;
      if (chart.result && chart.result[0]) {
        const result = chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];

        if (timestamps && quotes && quotes.close) {
          const historicalData = timestamps.map((timestamp, index) => ({
            date: new Date(timestamp * 1000).toISOString().split('T')[0], // YYYY-MM-DD
            open: quotes.open ? parseFloat(quotes.open[index]?.toFixed(2)) : null,
            high: quotes.high ? parseFloat(quotes.high[index]?.toFixed(2)) : null,
            low: quotes.low ? parseFloat(quotes.low[index]?.toFixed(2)) : null,
            close: quotes.close ? parseFloat(quotes.close[index]?.toFixed(2)) : null,
            volume: quotes.volume ? quotes.volume[index] : null
          })).filter(data => data.close !== null); // Filter out null closes

          return res.json({
            symbol: upperSymbol,
            data: historicalData
          });
        }
      }
    } catch (yahooErr) {
      console.log(`Yahoo Finance history failed for ${yahooSymbol}:`, yahooErr.message);
    }

    // Fallback: Mock historical data for demo
    const mockPrices = {
      // Indian Stocks
      'TCS': 3450.50, 'INFY': 1450.75, 'HDFCBANK': 1650.25, 'ICICIBANK': 950.80,
      'RELIANCE': 2850.90, 'BAJFINANCE': 7200.00, 'HINDUNILVR': 2450.60, 'ITC': 430.25,
      'KOTAKBANK': 1850.90, 'LT': 3650.75, 'MARUTI': 12500.50, 'WIPRO': 450.80,

      // International Stocks
      'AAPL': 175.25, 'MSFT': 335.50, 'GOOGL': 140.80, 'AMZN': 145.30,
      'TSLA': 248.50, 'META': 485.75, 'NVDA': 875.25, 'NFLX': 485.90
    };

    const mockData = [];
    const basePrice = mockPrices[upperSymbol] || 1000;
    let currentPrice = basePrice;

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const change = (Math.random() - 0.5) * 0.1; // Random change between -5% and +5%
      currentPrice = currentPrice * (1 + change);
      mockData.push({
        date: date.toISOString().split('T')[0],
        open: parseFloat((currentPrice * 0.99).toFixed(2)),
        high: parseFloat((currentPrice * 1.02).toFixed(2)),
        low: parseFloat((currentPrice * 0.98).toFixed(2)),
        close: parseFloat(currentPrice.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000
      });
    }

    res.json({ symbol: upperSymbol, data: mockData });
  } catch (err) {
    console.error("History error:", err.message);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

export default router;

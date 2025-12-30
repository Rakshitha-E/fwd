import express from "express";
import axios from "axios";

const router = express.Router();

// Function to get USD to INR exchange rate
const getExchangeRate = async () => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates.INR;
  } catch (error) {
    console.error('Exchange rate fetch error:', error.message);
    return 83; // fallback rate
  }
};

// Common stocks for search suggestions (Indian and International)
const STOCKS = [
  // Indian Stocks (Nifty 50 and other major stocks)
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
  { symbol: 'HDFC', name: 'Housing Development Finance Corporation Ltd', exchange: 'NSE' },
  { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE' },
  { symbol: 'ONGC', name: 'Oil and Natural Gas Corporation Ltd', exchange: 'NSE' },
  { symbol: 'COALINDIA', name: 'Coal India Ltd', exchange: 'NSE' },
  { symbol: 'INDUSINDBK', name: 'IndusInd Bank Ltd', exchange: 'NSE' },
  { symbol: 'ZEEL', name: 'Zee Entertainment Enterprises Ltd', exchange: 'NSE' },
  { symbol: 'UPL', name: 'UPL Ltd', exchange: 'NSE' },
  { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd', exchange: 'NSE' },
  { symbol: 'SHREECEM', name: 'Shree Cement Ltd', exchange: 'NSE' },
  { symbol: 'BRITANNIA', name: 'Britannia Industries Ltd', exchange: 'NSE' },
  { symbol: 'PIDILITIND', name: 'Pidilite Industries Ltd', exchange: 'NSE' },
  { symbol: 'DABUR', name: 'Dabur India Ltd', exchange: 'NSE' },
  { symbol: 'GODREJCP', name: 'Godrej Consumer Products Ltd', exchange: 'NSE' },
  { symbol: 'HAVELLS', name: 'Havells India Ltd', exchange: 'NSE' },
  { symbol: 'BERGEPAINT', name: 'Berger Paints India Ltd', exchange: 'NSE' },
  { symbol: 'M&M', name: 'Mahindra & Mahindra Ltd', exchange: 'NSE' },
  { symbol: 'EICHERMOT', name: 'Eicher Motors Ltd', exchange: 'NSE' },
  { symbol: 'BOSCHLTD', name: 'Bosch Ltd', exchange: 'NSE' },
  { symbol: 'COLPAL', name: 'Colgate Palmolive (India) Ltd', exchange: 'NSE' },
  { symbol: 'MARICO', name: 'Marico Ltd', exchange: 'NSE' },
  { symbol: 'NMDC', name: 'NMDC Ltd', exchange: 'NSE' },
  { symbol: 'GAIL', name: 'GAIL (India) Ltd', exchange: 'NSE' },
  { symbol: 'IOC', name: 'Indian Oil Corporation Ltd', exchange: 'NSE' },
  { symbol: 'VEDL', name: 'Vedanta Ltd', exchange: 'NSE' },
  { symbol: 'AMBUJACEM', name: 'Ambuja Cements Ltd', exchange: 'NSE' },
  { symbol: 'ACC', name: 'ACC Ltd', exchange: 'NSE' },
  { symbol: 'DLF', name: 'DLF Ltd', exchange: 'NSE' },
  { symbol: 'JINDALSTEL', name: 'Jindal Steel & Power Ltd', exchange: 'NSE' },
  { symbol: 'POCL', name: 'Pondy Oxides & Chemicals Ltd', exchange: 'NSE' },
  { symbol: 'SILVER', name: 'Silver Touch Technologies Ltd', exchange: 'NSE' },

  // International Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ' },
  { symbol: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ' },
  { symbol: 'NFLX', name: 'Netflix Inc.', exchange: 'NASDAQ' },
  { symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NASDAQ' },
  { symbol: 'CRM', name: 'Salesforce Inc.', exchange: 'NYSE' },
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
  { symbol: 'BABA', name: 'Alibaba Group Holdings Inc.', exchange: 'NYSE' },
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

    const query = q.toUpperCase();

    // Try Yahoo Finance search first for comprehensive results
    try {
      const yahooSearchUrl = `https://query1.finance.yahoo.com/v1/finance/search`;
      const response = await axios.get(yahooSearchUrl, {
        params: {
          q: query,
          quotesCount: 20, // Get more results for better coverage
          newsCount: 0
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 5000
      });

      if (response.data && response.data.quotes) {
        const yahooSuggestions = response.data.quotes
          .filter(quote => quote.symbol && quote.shortname)
          .slice(0, 8)
          .map(quote => ({
            symbol: quote.symbol,
            name: quote.shortname || quote.longname || quote.symbol,
            exchange: quote.exchange || 'Unknown'
          }));

        if (yahooSuggestions.length > 0) {
          return res.json(yahooSuggestions);
        }
      }
    } catch (yahooError) {
      console.log('Yahoo Finance search failed, falling back to local suggestions');
    }

    // Fallback: Filter local stock list based on query
    const localSuggestions = STOCKS
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

    res.json(localSuggestions);
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Failed to search stocks" });
  }
});

// GET live stock price using Yahoo Finance (with fallback to mock data)
// Example: GET /price?symbol=TCS
router.get("/price", async (req, res) => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "Stock symbol is required" });
    }

    const stockData = STOCKS.find(s => s.symbol === symbol.toUpperCase());

    // Format symbol for Yahoo Finance (add .NS for NSE if not present)
    let yahooSymbol = symbol;
    if (!symbol.includes('.')) {
      if (stockData && stockData.exchange === 'NSE') {
        yahooSymbol = `${symbol}.NS`; // NSE stocks
      }
    }

    // Try Yahoo Finance API first
    try {
      // Primary: Try Yahoo Finance v10 endpoint
      const yahooUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${yahooSymbol}`;
      const response = await axios.get(yahooUrl, {
        params: {
          modules: 'price'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 5000
      });

      if (response.data.quoteSummary.result && response.data.quoteSummary.result[0]) {
        const priceData = response.data.quoteSummary.result[0].price;
        const currentPrice = priceData.regularMarketPrice?.raw;

        if (currentPrice) {
          // Format response with INR currency for all stocks
          const isIndianStock = yahooSymbol.endsWith('.NS');
          let finalPrice = currentPrice;
          if (!isIndianStock) {
            // Convert USD to INR for international stocks
            const exchangeRate = await getExchangeRate();
            finalPrice = currentPrice * exchangeRate;
          }
          return res.json({
            price: parseFloat(finalPrice.toFixed(2)),
            currency: 'INR',
            symbol: yahooSymbol,
            companyName: priceData.shortName || (stockData ? stockData.name : yahooSymbol)
          });
        }
      }
    } catch (apiError) {
      console.log('Yahoo Finance API failed for symbol:', yahooSymbol);
    }

    // Try alternative Yahoo Finance endpoint for better coverage
    try {
      // Alternative: Try Yahoo Finance v8 endpoint
      const yahooUrlAlt = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`;
      const responseAlt = await axios.get(yahooUrlAlt, {
        params: {
          period1: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
          period2: Math.floor(Date.now() / 1000),
          interval: '1d'
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 5000
      });

      if (responseAlt.data && responseAlt.data.chart && responseAlt.data.chart.result && responseAlt.data.chart.result[0]) {
        const meta = responseAlt.data.chart.result[0].meta;
        const currentPrice = meta.regularMarketPrice;

        if (currentPrice) {
          // Format response with INR currency for all stocks
          const isIndianStock = yahooSymbol.endsWith('.NS');
          let finalPrice = currentPrice;
          if (!isIndianStock) {
            // Convert USD to INR for international stocks
            const exchangeRate = await getExchangeRate();
            finalPrice = currentPrice * exchangeRate;
          }
          return res.json({
            price: parseFloat(finalPrice.toFixed(2)),
            currency: 'INR',
            symbol: yahooSymbol,
            companyName: meta.symbolName || (stockData ? stockData.name : yahooSymbol)
          });
        }
      }
    } catch (altApiError) {
      console.log('Alternative Yahoo Finance API also failed for symbol:', yahooSymbol);
    }

    // If both APIs fail, return error - no mock data fallback for unlimited stock access
    res.status(404).json({ error: "Stock symbol not found or price unavailable. Please check the symbol and try again." });

  } catch (error) {
    console.error('Price fetch error:', error.message);
    res.status(500).json({ error: "Failed to fetch stock price" });
  }
});

// GET stock chart data for live graphs
// Example: GET /chart?symbol=TCS&period=1mo&interval=1d
router.get("/chart", async (req, res) => {
  try {
    const { symbol, period = '1mo', interval = '1d' } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "Stock symbol is required" });
    }

    const stockData = STOCKS.find(s => s.symbol === symbol.toUpperCase());

    // Format symbol for Yahoo Finance (add .NS for NSE if not present)
    let yahooSymbol = symbol;
    if (!symbol.includes('.')) {
      if (stockData && stockData.exchange === 'NSE') {
        yahooSymbol = `${symbol}.NS`; // NSE stocks
      }
    }

    // Calculate period timestamps
    const now = Math.floor(Date.now() / 1000);
    let period1;

    switch (period) {
      case '1d':
        period1 = now - 86400; // 1 day
        break;
      case '5d':
        period1 = now - (5 * 86400); // 5 days
        break;
      case '1mo':
        period1 = now - (30 * 86400); // 30 days
        break;
      case '3mo':
        period1 = now - (90 * 86400); // 90 days
        break;
      case '6mo':
        period1 = now - (180 * 86400); // 180 days
        break;
      case '1y':
        period1 = now - (365 * 86400); // 1 year
        break;
      case '2y':
        period1 = now - (2 * 365 * 86400); // 2 years
        break;
      case '5y':
        period1 = now - (5 * 365 * 86400); // 5 years
        break;
      default:
        period1 = now - (30 * 86400); // default to 1 month
    }

    // Fetch chart data from Yahoo Finance
    const chartUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`;
    const response = await axios.get(chartUrl, {
      params: {
        period1: period1,
        period2: now,
        interval: interval,
        includePrePost: false,
        events: 'div,splits'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    if (response.data && response.data.chart && response.data.chart.result && response.data.chart.result[0]) {
      const chartData = response.data.chart.result[0];
      const timestamps = chartData.timestamp || [];
      const quotes = chartData.indicators.quote[0] || {};

      // Extract OHLC data
      const ohlc = timestamps.map((timestamp, index) => ({
        timestamp: timestamp * 1000, // Convert to milliseconds
        open: quotes.open ? quotes.open[index] : null,
        high: quotes.high ? quotes.high[index] : null,
        low: quotes.low ? quotes.low[index] : null,
        close: quotes.close ? quotes.close[index] : null,
        volume: quotes.volume ? quotes.volume[index] : null
      })).filter(item => item.close !== null); // Filter out null values

      // Convert prices to INR for international stocks
      const isIndianStock = yahooSymbol.endsWith('.NS');
      let convertedData = ohlc;

      if (!isIndianStock) {
        const exchangeRate = await getExchangeRate();
        convertedData = ohlc.map(item => ({
          ...item,
          open: item.open ? parseFloat((item.open * exchangeRate).toFixed(2)) : null,
          high: item.high ? parseFloat((item.high * exchangeRate).toFixed(2)) : null,
          low: item.low ? parseFloat((item.low * exchangeRate).toFixed(2)) : null,
          close: item.close ? parseFloat((item.close * exchangeRate).toFixed(2)) : null
        }));
      }

      return res.json({
        symbol: yahooSymbol,
        companyName: chartData.meta.symbolName || (stockData ? stockData.name : yahooSymbol),
        currency: 'INR',
        period: period,
        interval: interval,
        data: convertedData
      });
    }

    res.status(404).json({ error: "Chart data not available for this stock symbol" });

  } catch (error) {
    console.error('Chart fetch error:', error.message);
    res.status(500).json({ error: "Failed to fetch chart data" });
  }
});

export default router;

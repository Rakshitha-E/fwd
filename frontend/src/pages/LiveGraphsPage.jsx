
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './LiveGraphsPage.css';

const LiveGraphsPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('TCS');
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [theme, setTheme] = useState('light');

  // Stock options
  const stocks = [
    'TCS', 'INFY', 'HDFCBANK', 'RELIANCE', 'BAJFINANCE', 'ITC', 'WIPRO', 'KOTAKBANK',
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'
  ];

  // Fetch historical data
  const fetchHistoricalData = async (symbol) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/chart?symbol=${symbol}&period=1mo&interval=1d`);
      const data = await response.json();

      if (data.chart && data.chart.result && data.chart.result[0]) {
        const result = data.chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];
        const closePrices = quotes.close;

        const formattedData = timestamps.map((timestamp, index) => ({
          date: new Date(timestamp * 1000).toLocaleDateString(),
          price: closePrices[index] ? parseFloat(closePrices[index].toFixed(2)) : null
        })).filter(item => item.price !== null);

        setHistoricalData(formattedData);
      } else {
        setError('No historical data available');
      }
    } catch (err) {
      console.error('Error fetching historical data:', err);
      setError('Failed to fetch historical data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch current price
  const fetchCurrentPrice = async (symbol) => {
    try {
      const response = await fetch(`http://localhost:5000/price?symbol=${symbol}`);
      const data = await response.json();

      if (data.price) {
        setCurrentPrice(data.price);
      }
    } catch (err) {
      console.error('Error fetching current price:', err);
    }
  };

  // Auto-refresh price every 30 seconds
  useEffect(() => {
    if (selectedSymbol) {
      fetchCurrentPrice(selectedSymbol);
      const interval = setInterval(() => {
        fetchCurrentPrice(selectedSymbol);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [selectedSymbol]);

  // Fetch data when symbol changes
  useEffect(() => {
    if (selectedSymbol) {
      fetchHistoricalData(selectedSymbol);
    }
  }, [selectedSymbol]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`live-graphs-page ${theme}`}>
      <div className="container">
        <div className="header">
          <h1>📈 Live Stock Charts</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="stock-selector">
          <label>Select Stock:</label>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
          >
            {stocks.map(symbol => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
        </div>

        {currentPrice && (
          <div className="current-price">
            <h2>Current Price: ₹{currentPrice}</h2>
          </div>
        )}

        <div className="chart-container">
          {loading && <div className="loading">Loading chart data...</div>}
          {error && <div className="error">{error}</div>}

          {!loading && !error && historicalData.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="info">
          <p>💡 Chart shows 30-day historical data with live price updates every 30 seconds</p>
          <p>🌍 International stocks are converted to INR for consistency</p>
        </div>
      </div>
    </div>
  );
};

export default LiveGraphsPage;

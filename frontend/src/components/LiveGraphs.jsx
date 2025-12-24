import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../axios';

const LiveGraphs = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('TCS');
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  const popularStocks = [
    'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'RELIANCE',
    'BAJFINANCE', 'HINDUNILVR', 'ITC', 'KOTAKBANK', 'LT'
  ];

  const fetchHistoricalData = async (symbol) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/history/${symbol}`);
      setHistoricalData(response.data.data);
    } catch (err) {
      console.error('Error fetching historical data:', err);
      setError('Failed to fetch historical data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPrice = async (symbol) => {
    try {
      const response = await axios.get(`/price?symbol=${symbol}`);
      setCurrentPrice(response.data.price);
    } catch (err) {
      console.error('Error fetching current price:', err);
    }
  };

  useEffect(() => {
    fetchHistoricalData(selectedSymbol);
    fetchCurrentPrice(selectedSymbol);

    // Set up polling for live updates every 30 seconds
    const interval = setInterval(() => {
      fetchCurrentPrice(selectedSymbol);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedSymbol]);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const formatTooltip = (value, name) => {
    if (name === 'close') {
      return [`₹${value}`, 'Close Price'];
    }
    return [value, name];
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Live Stock Charts</h2>

      {/* Stock Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Stock Symbol:
        </label>
        <div className="flex flex-wrap gap-2">
          {popularStocks.map((stock) => (
            <button
              key={stock}
              onClick={() => handleSymbolChange(stock)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedSymbol === stock
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {stock}
            </button>
          ))}
        </div>
      </div>

      {/* Current Price Display */}
      {currentPrice && (
        <div className="mb-4 text-center">
          <p className="text-lg font-semibold">
            {selectedSymbol}: ₹{currentPrice}
          </p>
        </div>
      )}

      {/* Chart */}
      <div className="h-96 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                domain={['dataMin - 50', 'dataMax + 50']}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                formatter={formatTooltip}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Info */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Historical data for the last 30 days • Updates every 30 seconds</p>
      </div>
    </div>
  );
};

export default LiveGraphs;

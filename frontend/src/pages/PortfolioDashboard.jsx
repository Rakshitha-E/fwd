import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, BarChart3, Percent } from 'lucide-react';

const PortfolioDashboard = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPrices, setCurrentPrices] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHolding, setNewHolding] = useState({ symbol: '', exchange: '', quantity: '', buyPrice: '' });
  const [stockSuggestions, setStockSuggestions] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Please login to view your portfolio');
      setLoading(false);
      return;
    }
    fetchPortfolio();
  }, [token]);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get('/api/portfolio', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPortfolio(response.data.portfolio);
      await fetchCurrentPrices(response.data.portfolio);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPrices = async (holdings) => {
    const prices = {};
    for (const holding of holdings) {
      try {
        const response = await axios.get(`/price?symbol=${holding.symbol}`);
        prices[holding.symbol] = response.data.price;
      } catch (err) {
        console.error(`Error fetching price for ${holding.symbol}:`, err);
        prices[holding.symbol] = holding.buyPrice; // Fallback to buy price
      }
    }
    setCurrentPrices(prices);
  };

  const handleAddHolding = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/portfolio', newHolding, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewHolding({ symbol: '', exchange: '', quantity: '', buyPrice: '' });
      setShowAddForm(false);
      fetchPortfolio();
    } catch (err) {
      console.error('Error adding holding:', err);
      setError('Failed to add holding');
    }
  };

  const handleRemoveHolding = async (symbol, quantity = null) => {
    try {
      const params = quantity ? { quantity } : {};
      await axios.delete(`/api/portfolio/${symbol}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: params
      });
      fetchPortfolio();
    } catch (err) {
      console.error('Error removing holding:', err);
      setError('Failed to remove holding');
    }
  };

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, holding) => {
      const currentPrice = currentPrices[holding.symbol] || holding.buyPrice;
      return total + (holding.quantity * currentPrice);
    }, 0);
  };

  const calculateTotalInvestment = () => {
    return portfolio.reduce((total, holding) => {
      return total + (holding.quantity * holding.buyPrice);
    }, 0);
  };

  const calculateTotalPnL = () => {
    return calculatePortfolioValue() - calculateTotalInvestment();
  };

  const calculateOverallReturnPercentage = () => {
    const totalInvestment = calculateTotalInvestment();
    if (totalInvestment === 0) return 0;
    return ((calculatePortfolioValue() - totalInvestment) / totalInvestment) * 100;
  };

  const prepareHoldingsData = () => {
    return portfolio.map(holding => {
      const currentPrice = currentPrices[holding.symbol] || holding.buyPrice;
      const currentValue = holding.quantity * currentPrice;
      return {
        name: holding.symbol,
        value: currentValue,
        percentage: ((currentValue / calculatePortfolioValue()) * 100).toFixed(1)
      };
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="mb-16">
          <h1 className="text-center mb-12">Portfolio Dashboard</h1>
          <p className="text-center text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Track your investment performance and manage your portfolio holdings
          </p>

          {/* Professional Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="card text-center fade-in" style={{animationDelay: '0.1s'}}>
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white mb-3">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Total Value</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  ₹{calculatePortfolioValue().toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="card text-center fade-in" style={{animationDelay: '0.2s'}}>
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-3">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Total Invested</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  ₹{calculateTotalInvestment().toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="card text-center fade-in" style={{animationDelay: '0.3s'}}>
              <div className="mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white mb-3 ${
                  calculateTotalPnL() >= 0
                    ? 'bg-gradient-to-br from-green-500 to-green-600'
                    : 'bg-gradient-to-br from-red-500 to-red-600'
                }`}>
                  {calculateTotalPnL() >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">Overall P&L</h3>
                <p className={`text-3xl font-bold ${calculateTotalPnL() >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {calculateTotalPnL() >= 0 ? '+' : ''}₹{calculateTotalPnL().toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="card text-center fade-in" style={{animationDelay: '0.4s'}}>
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-3">
                  <Percent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Overall Return</h3>
                <p className={`text-3xl font-bold ${calculateOverallReturnPercentage() >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {calculateOverallReturnPercentage() >= 0 ? '+' : ''}{calculateOverallReturnPercentage().toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Holdings Breakdown Chart */}
          {portfolio.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <PieChartIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Holdings Breakdown</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={prepareHoldingsData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {prepareHoldingsData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Number of Holdings</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{portfolio.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Top Performer</span>
                    <span className="font-semibold text-green-600">
                      {portfolio.length > 0 ? portfolio.reduce((max, holding) => {
                        const currentPrice = currentPrices[holding.symbol] || holding.buyPrice;
                        const pnlPercent = ((currentPrice - holding.buyPrice) / holding.buyPrice) * 100;
                        return pnlPercent > (max.pnl || -Infinity) ? { symbol: holding.symbol, pnl: pnlPercent } : max;
                      }, {}).symbol : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Daily P&L</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹0.00 (0.00%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Portfolio Health</span>
                    <span className={`font-semibold ${calculateOverallReturnPercentage() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {calculateOverallReturnPercentage() >= 0 ? 'Healthy' : 'Underperforming'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Holding Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAddForm ? 'Cancel' : 'Add Holding'}
            </button>
          </div>

          {/* Add Holding Form */}
          {showAddForm && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add New Holding</h2>
              <form onSubmit={handleAddHolding} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Symbol (e.g., TCS)"
                  value={newHolding.symbol}
                  onChange={(e) => setNewHolding({...newHolding, symbol: e.target.value.toUpperCase()})}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
                <select
                  value={newHolding.exchange}
                  onChange={(e) => setNewHolding({...newHolding, exchange: e.target.value})}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Exchange</option>
                  <option value="NSE">NSE (India)</option>
                  <option value="NASDAQ">NASDAQ (US)</option>
                  <option value="NYSE">NYSE (US)</option>
                  <option value="OTCMKTS">OTC (US)</option>
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newHolding.quantity}
                  onChange={(e) => setNewHolding({...newHolding, quantity: e.target.value})}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.01"
                  required
                />
                <input
                  type="number"
                  placeholder="Buy Price"
                  value={newHolding.buyPrice}
                  onChange={(e) => setNewHolding({...newHolding, buyPrice: e.target.value})}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.01"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Holding
                </button>
              </form>
            </div>
          )}

          {/* Holdings Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Holdings</h2>
            </div>
            {portfolio.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No holdings found. Add your first stock holding above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exchange</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Buy Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Current Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">P&L</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {portfolio.map((holding) => {
                      const currentPrice = currentPrices[holding.symbol] || holding.buyPrice;
                      const currentValue = holding.quantity * currentPrice;
                      const investment = holding.quantity * holding.buyPrice;
                      const pnl = currentValue - investment;
                      const pnlPercentage = ((currentPrice - holding.buyPrice) / holding.buyPrice) * 100;

                      return (
                        <tr key={holding.symbol}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {holding.symbol}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {holding.exchange}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {holding.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            ₹{holding.buyPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            ₹{currentPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)} ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleRemoveHolding(holding.symbol)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-2"
                            >
                              Remove All
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;

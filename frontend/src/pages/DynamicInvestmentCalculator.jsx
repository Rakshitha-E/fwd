import React, { useState, useEffect } from "react";
import StockSearchInput from "../components/StockSearchInput";
import CalculationResults from "../components/CalculationResults";
import StockChart from "../components/StockChart";
import PopularStocks from "../components/PopularStocks";
import "./DynamicInvestmentCalculator.css";

function DynamicInvestmentCalculator() {
  // State management
  const [amount, setAmount] = useState("");
  const [stockQuery, setStockQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [historicalData, setHistoricalData] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);

  // Theme handling
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Stock search functionality
  const handleInputChange = async (e) => {
    const query = e.target.value.toUpperCase();
    setStockQuery(query);
    resetResults();

    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/search?q=${query}`);
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data.slice(0, 8) : []);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (symbol) => {
    setSelectedSymbol(symbol);
    setStockQuery(symbol);
    setSuggestions([]);
  };

  const handlePopularStockClick = (symbol) => {
    setStockQuery(symbol);
    setSelectedSymbol(symbol);
  };

  const resetResults = () => {
    setSelectedSymbol("");
    setStockInfo(null);
    setHistoricalData([]);
    setResult(null);
    setError("");
  };

  // Fetch historical data for charts
  const fetchHistoricalData = async (symbol) => {
    try {
      const res = await fetch(`http://localhost:5000/history?symbol=${symbol}`);
      const data = await res.json();
      if (data.data) {
        setHistoricalData(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch historical data:", err);
    }
  };

  // Main calculation logic
  const handleCalculate = async () => {
    setError("");
    setResult(null);
    setHistoricalData([]);
    setStockInfo(null);

    const symbolToUse = selectedSymbol || stockQuery;

    if (!amount || !symbolToUse) {
      setError("Please enter amount and stock symbol.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/price?symbol=${symbolToUse}`);
      const data = await res.json();

      if (!data.price) throw new Error("Price not available");

      const shares = (amount / data.price).toFixed(4);
      const totalValue = (parseFloat(shares) * data.price).toFixed(2);
      const currency = data.symbol.includes('.NS') ? '₹' : '$';

      setResult({
        symbol: data.symbol,
        price: parseFloat(data.price).toFixed(2),
        shares: parseFloat(shares),
        totalValue,
        currency
      });

      setStockInfo({
        symbol: data.symbol,
        price: parseFloat(data.price).toFixed(2),
        currency,
        market: data.symbol.includes('.NS') ? 'NSE (India)' : 'US Markets'
      });

      await fetchHistoricalData(symbolToUse);

    } catch (err) {
      console.error("Calculation error:", err);
      setError("Invalid stock symbol or price not available. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-page">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

      <div className="container">
        <h1>InvestMate Stock Calculator</h1>
        <p className="subtitle">Calculate investments in Indian & International stocks</p>

        <div className="calculator-section">
          <div className="input-section">
            <label>Investment Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (e.g., 10000)"
            />

            <label>Search Stock / ETF (Indian & International)</label>
            <StockSearchInput
              value={stockQuery}
              onChange={handleInputChange}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              placeholder="TCS, INFY, AAPL, MSFT, GOOGL"
            />

            <button onClick={handleCalculate} disabled={loading}>
              {loading ? "Calculating..." : "Calculate Investment"}
            </button>
          </div>

          <CalculationResults
            stockInfo={stockInfo}
            result={result}
            loading={loading}
            error={error}
          />
        </div>

        <StockChart
          historicalData={historicalData}
          theme={theme}
          currency={result?.currency || '₹'}
        />

        <PopularStocks onStockSelect={handlePopularStockClick} />
      </div>
    </div>
  );
}

export default DynamicInvestmentCalculator;

import React, { useState, useEffect } from "react";
import "./DynamicInvestmentCalculator.css";

function DynamicInvestmentCalculator() {
  const [amount, setAmount] = useState("");
  const [stockQuery, setStockQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  // 🌗 Theme handling
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

  // 🔍 Stock search
  const handleInputChange = async (e) => {
    const query = e.target.value.toUpperCase();
    setStockQuery(query);
    setSelectedSymbol(""); // reset selected stock

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

  // 🧮 CALCULATE (FIXED)
  const handleCalculate = async () => {
    setError("");
    setResult(null);

    // ✅ allow both typed OR selected stock
    const symbolToUse = selectedSymbol || stockQuery;

    if (!amount || !symbolToUse) {
      setError("Please enter amount and stock symbol.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/price?symbol=${symbolToUse}`
      );
      const data = await res.json();

      if (!data.price) throw new Error();

      const shares = (amount / data.price).toFixed(2);

      setResult({
        symbol: data.symbol,
        price: data.price.toFixed(2),
        shares,
      });
    } catch {
      setError("Invalid stock symbol or price not available.");
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
        <h1>InvestMate</h1>

        <label>Investment Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <label>Search Stock / ETF</label>
        <div className="suggestions">
          <input
            type="text"
            value={stockQuery}
            onChange={handleInputChange}
            placeholder="TCS, INFY, HDFCBANK"
            autoComplete="off"
          />

          {suggestions.length > 0 && (
            <div className="suggestion-box">
              {suggestions.map((s) => (
                <div
                  key={s.symbol}
                  className="suggestion-item"
                  onClick={() => {
                    setSelectedSymbol(s.symbol);
                    setStockQuery(s.symbol);
                    setSuggestions([]);
                  }}
                >
                  <span className="symbol">{s.symbol}</span>
                  <span className="name">{s.name}</span>
                  <span className="exchange">{s.exchange}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleCalculate}>Calculate</button>

        {loading && <div id="loader">⏳ Fetching data...</div>}
        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result">
            <b>{result.symbol}</b>
            <br />
            Price: ₹{result.price}
            <br />
            Shares you can buy: {result.shares}
          </div>
        )}
      </div>
    </div>
  );
}

export default DynamicInvestmentCalculator;

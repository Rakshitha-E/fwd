import React, { useState } from "react";

const StockCalculator = () => {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

  // Fetch stock price from backend
  const fetchStockPrice = async (symbol) => {
    try {
      // Updated URL to match your backend route
      const response = await fetch(`http://localhost:5000/api/stock/price/${symbol}`);
      if (!response.ok) throw new Error("Stock not found");
      const data = await response.json();
      return parseFloat(data.price); // ensure it's a number
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleCalculate = async () => {
    setError("");
    setPrice(null);

    // Validate inputs
    if (!symbol || !amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid symbol and positive amount");
      return;
    }

    const stockPrice = await fetchStockPrice(symbol.toUpperCase());

    if (stockPrice === null || isNaN(stockPrice)) {
      setError("Invalid stock symbol or price not found");
      return;
    }

    const totalValue = stockPrice * parseFloat(amount);
    setPrice(totalValue.toFixed(2));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Stock Calculator</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Company Symbol:</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="e.g. TCS"
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Number of shares"
          min="1"
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <button
        onClick={handleCalculate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Calculate
      </button>

      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}

      {price !== null && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>
          Total Value: ₹ {price}
        </p>
      )}
    </div>
  );
};

export default StockCalculator;

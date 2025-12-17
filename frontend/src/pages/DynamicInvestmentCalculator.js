import React, { useState, useEffect } from "react";

export default function DynamicInvestmentCalculator() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState({ symbol: "", name: "" });
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState(null);
  const [shares, setShares] = useState(null);

  const API_KEY = process.env.REACT_APP_FINNHUB_KEY;

  // Fetch company suggestions as user types
  useEffect(() => {
    if (!query) return setSuggestions([]);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${API_KEY}`
        );
        const data = await res.json();
        if (data.result) {
          setSuggestions(
            data.result.slice(0, 10).map((item) => ({
              symbol: item.symbol,
              name: item.description,
            }))
          );
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, 300); // debounce
    return () => clearTimeout(timer);
  }, [query, API_KEY]);

  // Fetch live price when a company is selected
  const handleSelect = async (symbol, name) => {
    setSelected({ symbol, name });
    setQuery(`${name} (${symbol})`);
    setSuggestions([]);
    setShares(null);
    setAmount("");

    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
      );
      const data = await res.json();
      if (data.c) {
        setPrice(data.c);
      } else {
        alert("Price not found for this symbol.");
        setPrice(null);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching stock price.");
      setPrice(null);
    }
  };

  const calculateShares = () => {
    if (!price || !amount) return;
    const numShares = Math.floor(amount / price);
    setShares(numShares);
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-xl shadow-lg relative bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Dynamic Investment Calculator</h2>

      {/* Search Input */}
      <label className="block mb-2 font-semibold">Search Company or Symbol:</label>
      <input
        type="text"
        className="w-full mb-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type company name or symbol..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected({ symbol: "", name: "" });
          setPrice(null);
          setShares(null);
          setAmount("");
        }}
      />

      {/* Autocomplete dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg max-h-52 overflow-y-auto z-50 shadow-lg">
          {suggestions.map((s, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(s.symbol, s.name)}
            >
              {s.name} ({s.symbol})
            </li>
          ))}
        </ul>
      )}

      {/* Investment Amount */}
      {price && (
        <>
          <label className="block mt-4 mb-2 font-semibold">Investment Amount ($):</label>
          <input
            type="number"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount to invest..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={calculateShares}
            disabled={!amount}
          >
            Calculate Shares
          </button>
        </>
      )}

      {/* Display Results */}
      {price && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold">
            Live Price of {selected.symbol}: <span className="text-blue-600">${price.toFixed(2)}</span>
          </p>
          {shares !== null && (
            <>
              <p className="mt-2">Shares You Can Buy: <span className="font-bold">{shares}</span></p>
              <p>Total Investment Value: <span className="font-bold">${(shares * price).toFixed(2)}</span></p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

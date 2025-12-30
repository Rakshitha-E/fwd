import React from 'react';

const PopularStocks = ({ onStockSelect }) => {
  const indianStocks = ['TCS', 'INFY', 'HDFCBANK', 'RELIANCE', 'BAJFINANCE', 'POCL', 'SILVER', 'ITC', 'WIPRO', 'KOTAKBANK'];
  const internationalStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];

  return (
    <div className="popular-stocks">
      <h3>🔥 Popular Stocks to Try</h3>
      <div className="stocks-grid">
        <div className="stock-category">
          <h4>🇮🇳 Indian Stocks</h4>
          <div className="stock-buttons">
            {indianStocks.map(symbol => (
              <button
                key={symbol}
                className="stock-btn"
                onClick={() => onStockSelect(symbol)}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
        <div className="stock-category">
          <h4>🌍 International Stocks</h4>
          <div className="stock-buttons">
            {internationalStocks.map(symbol => (
              <button
                key={symbol}
                className="stock-btn"
                onClick={() => onStockSelect(symbol)}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularStocks;

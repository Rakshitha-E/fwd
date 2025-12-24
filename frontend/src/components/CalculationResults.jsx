import React from 'react';

const CalculationResults = ({ stockInfo, result, loading, error }) => {
  if (loading) {
    return <div id="loader">⏳ Fetching live stock data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="results-section">
      {stockInfo && (
        <div className="stock-info">
          <h3>📊 Stock Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Symbol:</span>
              <span className="value">{stockInfo.symbol}</span>
            </div>
            <div className="info-item">
              <span className="label">Current Price:</span>
              <span className="value">{stockInfo.currency}{stockInfo.price}</span>
            </div>
            <div className="info-item">
              <span className="label">Market:</span>
              <span className="value">{stockInfo.market}</span>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="calculation-result">
          <h3>💰 Investment Calculation</h3>
          <div className="result-grid">
            <div className="result-item">
              <span className="label">Stock Symbol:</span>
              <span className="value">{result.symbol}</span>
            </div>
            <div className="result-item">
              <span className="label">Current Price:</span>
              <span className="value">{result.currency}{result.price}</span>
            </div>
            <div className="result-item">
              <span className="label">Shares You Can Buy:</span>
              <span className="value">{result.shares.toFixed(4)}</span>
            </div>
            <div className="result-item">
              <span className="label">Total Investment:</span>
              <span className="value">{result.currency}{result.totalValue}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculationResults;

import React, { useState } from 'react';

const StockSearchInput = ({ value, onChange, suggestions, onSuggestionClick, placeholder }) => {
  return (
    <div className="suggestions">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
      />

      {suggestions.length > 0 && (
        <div className="suggestion-box">
          {suggestions.map((s) => (
            <div
              key={s.symbol}
              className="suggestion-item"
              onClick={() => onSuggestionClick(s.symbol)}
            >
              <span className="symbol">{s.symbol}</span>
              <span className="name">{s.name}</span>
              <span className="exchange">{s.exchange}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSearchInput;

import React, { useState } from "react";
import "./Glossary.css";

export default function Glossary() {
  const [search, setSearch] = useState("");

  const glossaryTerms = [
    { term: "Stock", definition: "A type of security that signifies ownership in a corporation and represents a claim on part of the corporation’s assets and earnings." },
    { term: "Mutual Fund", definition: "An investment vehicle made up of a pool of money collected from many investors to invest in securities like stocks, bonds, and other assets." },
    { term: "ETF (Exchange Traded Fund)", definition: "A type of investment fund that is traded on stock exchanges, much like stocks." },
    { term: "IPO (Initial Public Offering)", definition: "The process by which a private company offers shares to the public for the first time." },
    { term: "Market Capitalization", definition: "The total market value of a company's outstanding shares of stock." },
    { term: "Dividend", definition: "A payment made by a corporation to its shareholders, usually as a distribution of profits." },
    { term: "Bull Market", definition: "A market condition in which prices are rising or are expected to rise." },
    { term: "Bear Market", definition: "A market condition in which prices are falling or are expected to fall." },
    { term: "Portfolio", definition: "A collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents." },
    { term: "Risk Management", definition: "The process of identifying, assessing, and controlling financial risks." },
  ];

  const filteredTerms = glossaryTerms.filter((item) =>
    item.term.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    if (filteredTerms.length === 0 && search.trim() !== "") {
      // Redirect to Google search
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(search)}`;
      window.open(googleSearchUrl, "_blank"); // open in new tab
    }
  };

  return (
    <div className="glossary-container-wrapper">
      <h1>📘 Investment Glossary</h1>
      <p>Understand key terms and concepts in finance and investing</p>

      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          placeholder="Search any term..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button id="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="glossary-container">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, index) => (
            <div key={index} className="glossary-item">
              <div className="term">{item.term}</div>
              <div className="definition">{item.definition}</div>
            </div>
          ))
        ) : (
          <p>No terms found matching your search.</p>
        )}
      </div>
    </div>
  );
}

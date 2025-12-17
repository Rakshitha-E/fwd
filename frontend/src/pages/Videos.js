import React from "react";
import "./Videos.css";

const Videos = () => {
  const searchYouTube = () => {
    const query = document.getElementById("youtubeSearch").value.trim();
    if (query) {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`;
      window.open(url, "_blank");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchYouTube();
    }
  };

  return (
    <div className="videos-page">
      <h1>InvestMate: Tracking Value, Building Wealth</h1>

      <div className="search-section">
        <input
          type="text"
          id="youtubeSearch"
          placeholder="Search any video on YouTube"
          onKeyPress={handleKeyPress}
        />
        <button id="searchButton" onClick={searchYouTube}>
          Search
        </button>
      </div>

      {/* Beginner Section */}
      <section>
        <h2>Beginner Level Videos</h2>
        <p>Beginner-friendly investment learning videos</p>
        <div className="video-grid">
          <iframe
            src="https://www.youtube.com/embed/Xn7KWR9EOGQ"
            title="Beginner video 1"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/p7HKvqRI_Bo"
            title="Beginner video 2"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/x0G4WtO0LCQ"
            title="Beginner video 3"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Intermediate Section */}
      <section>
        <h2>Intermediate Level Videos</h2>
        <p>Learn more advanced stock market concepts</p>
        <div className="video-grid">
          <iframe
            src="https://www.youtube.com/embed/ZCFkWDdmXG8"
            title="Intermediate video 1"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/A7fZp9dwELo?start=2"
            title="Intermediate video 2"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/bLl_VRQ7pBs"
            title="Intermediate video 3"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Advanced Section */}
      <section>
        <h2>Advanced Level Videos</h2>
        <p>Advanced investment strategies and market analysis</p>
        <div className="video-grid">
          <iframe
            src="https://www.youtube.com/embed/hBKqk5oYexw"
            title="Advanced video 1"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/1kvknZoU--M"
            title="Advanced video 2"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/8ThpjylLj3Y"
            title="Advanced video 3"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Videos;

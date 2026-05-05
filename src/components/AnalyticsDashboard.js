import { useEffect, useState } from "react";
import "../styles/AnalyticsDashboard.css";

export default function AnalyticsDashboard() {
  // State to store recently searched words
  const [recent, setRecent] = useState([]);

  // State to store favourite words
  const [favourites, setFavourites] = useState([]);

  // Runs once when the component mounts
  useEffect(() => {
    // Get recent searches from localStorage (or fallback to empty array)
    const storedRecent =
      JSON.parse(localStorage.getItem("recentWords")) || [];

    // Get favourite words from localStorage (or fallback to empty array)
    const storedFavs =
      JSON.parse(localStorage.getItem("favourites")) || [];

    // Update state with stored values
    setRecent(storedRecent);
    setFavourites(storedFavs);
  }, []);

  return (
    <div className="analytics">
      {/* Page title */}
      <h2>📊 Analytics Dashboard</h2>

      {/* Recent searches section */}
      <section className="analytics-card">
        <h3>🔥 Most Recent Searches</h3>

        {/* If there are recent searches, display them */}
        {recent.length ? (
          <div className="word-grid">
            {recent.map((word, index) => (
              <span key={index} className="word-pill">
                {word}
              </span>
            ))}
          </div>
        ) : (
          // Fallback if no recent searches exist
          <p>No searches yet.</p>
        )}
      </section>

      {/* Favourite words section */}
      <section className="analytics-card">
        <h3>⭐ Favourite Words</h3>

        {/* If there are favourites, display them */}
        {favourites.length ? (
          <div className="word-grid">
            {favourites.map((word, index) => (
              <span key={index} className="word-pill">
                {word}
              </span>
            ))}
          </div>
        ) : (
          // Fallback if no favourites exist
          <p>No favourites yet.</p>
        )}
      </section>

      {/* Summary section */}
      <section className="analytics-card">
        <h3>📈 Summary</h3>

        {/* Simple stats based on array lengths */}
        <p>Total searches: {recent.length}</p>
        <p>Total favourites: {favourites.length}</p>
      </section>
    </div>
  );
}
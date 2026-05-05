import { useEffect, useState } from "react";
import "../styles/AnalyticsDashboard.css";

export default function AnalyticsDashboard() {
  const [recent, setRecent] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedRecent =
      JSON.parse(localStorage.getItem("recentWords")) || [];

    const storedFavs =
      JSON.parse(localStorage.getItem("favourites")) || [];

    setRecent(storedRecent);
    setFavourites(storedFavs);
  }, []);

  return (
    <div className="analytics">
      <h2>📊 Analytics Dashboard</h2>

      <section className="analytics-card">
        <h3>🔥 Most Recent Searches</h3>

        {recent.length ? (
          <div className="word-grid">
            {recent.map((word, index) => (
              <span key={index} className="word-pill">
                {word}
              </span>
            ))}
          </div>
        ) : (
          <p>No searches yet.</p>
        )}
      </section>

      <section className="analytics-card">
        <h3>⭐ Favourite Words</h3>

        {favourites.length ? (
          <div className="word-grid">
            {favourites.map((word, index) => (
              <span key={index} className="word-pill">
                {word}
              </span>
            ))}
          </div>
        ) : (
          <p>No favourites yet.</p>
        )}
      </section>

      <section className="analytics-card">
        <h3>📈 Summary</h3>
        <p>Total searches: {recent.length}</p>
        <p>Total favourites: {favourites.length}</p>
      </section>
    </div>
  );
}
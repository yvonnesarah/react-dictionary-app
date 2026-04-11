import "../styles/RecentlySearched.css";

export default function RecentlySearched({ items, onClick }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="RecentlySearched">
      <h2>📌 Recently Searched</h2>
      <div className="recent-list">
        {items.map((word, index) => (
          <button
            key={index}
            className="recent-item"
            onClick={() => onClick(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
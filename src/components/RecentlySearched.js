import "../styles/RecentlySearched.css";

export default function RecentlySearched({ items, onClick, onClear }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="RecentlySearched">
      <div className="recent-header">
        <h2>📌 Recently Searched</h2>

        <button className="clear-btn" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="recent-list">
        {items.slice(0, 9).map((word, index) => (
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
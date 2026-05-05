export default function Favourites({ items, onClick }) {
  return (
    <div className="RecentlySearched">
      <h2>⭐ Favourites</h2>

      {!items || items.length === 0 ? (
        <p style={{ fontSize: "13px", opacity: 0.6 }}>
          No favourites yet. Click ⭐ on a word to save it.
        </p>
      ) : (
        <div className="recent-list">
          {items.map((word, i) => (
            <button
              key={i}
              className="recent-item"
              onClick={() => onClick(word)}
            >
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
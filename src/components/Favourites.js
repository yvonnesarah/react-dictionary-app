// Exporting a React functional component called Favourites
// It receives two props:
// - items: an array of saved favourite words
// - onClick: a function to handle clicking a favourite item
export default function Favourites({ items, onClick }) {
  return (
    // Main container for the favourites section
    <div className="RecentlySearched">
      
      {/* Section title */}
      <h2>⭐ Favourites</h2>

      {/* 
        Conditional rendering:
        If items is empty, null, or undefined → show fallback message
        Otherwise → render list of favourites
      */}
      {!items || items.length === 0 ? (
        // Message shown when there are no favourites saved
        <p style={{ fontSize: "13px", opacity: 0.6 }}>
          No favourites yet. Click ⭐ on a word to save it.
        </p>
      ) : (
        // Container for the list of favourite items
        <div className="recent-list">
          
          {/* Loop through each favourite word */}
          {items.map((word, i) => (
            <button
              // Using index as key (works, but a unique id would be better if available)
              key={i}
              
              // Styling class for each clickable item
              className="recent-item"
              
              // When clicked, pass the word back to parent handler
              onClick={() => onClick(word)}
            >
              {/* Display the word itself */}
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
// Importing CSS styles for the RecentlySearched component
import "../styles/RecentlySearched.css";

// Functional component that displays a list of recently searched items
export default function RecentlySearched({ items, onClick, onClear }) {
  
  // If there are no items or the array is empty, render nothing
  if (!items || items.length === 0) return null;

  return (
    <div className="RecentlySearched">
      
      {/* Header section containing title and clear button */}
      <div className="recent-header">
        <h2>📌 Recently Searched</h2>

        {/* Button to clear all recent search items */}
        <button className="clear-btn" onClick={onClear}>
          Clear
        </button>
      </div>

      {/* List of recently searched items */}
      <div className="recent-list">
        
        {/* Show only the first 9 items from the list */}
        {items.slice(0, 9).map((word, index) => (
          
          // Each item is rendered as a clickable button
          <button
            key={index}
            className="recent-item"
            
            // When clicked, trigger onClick with the selected word
            onClick={() => onClick(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
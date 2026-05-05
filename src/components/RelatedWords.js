// Import the CSS file for styling this component
import "../styles/RelatedWords.css";

// Functional component that displays groups of related words
export default function RelatedWords(props) {

  // Helper function to render a list of words under a given title
  function renderList(title, words) {
    // If there are no words or the array is empty, render nothing
    if (!words || words.length === 0) return null;

    return (
      <div className="related-group">
        {/* Section title (e.g., Antonyms, Similar Words, etc.) */}
        <h4>{title}</h4>

        {/* Container for word pills */}
        <div className="word-list">
          {
            // Only display up to 8 words to avoid overcrowding the UI
            words.slice(0, 8).map((word, index) => (
              <span key={index} className="word-pill">
                {word}
              </span>
            ))
          }
        </div>
      </div>
    );
  }

  return (
    <div className="RelatedWords">
      {/* Main heading for the component */}
      <h3>📚 Related Words</h3>

      {/* Render different categories of related words */}
      {renderList("Antonyms", props.relatedWords.antonyms)}
      {renderList("Similar Words", props.relatedWords.similar)}
      {renderList("Word Family", props.relatedWords.family)}
    </div>
  );
}
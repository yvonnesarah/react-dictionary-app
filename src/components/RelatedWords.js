import "../styles/RelatedWords.css";

export default function RelatedWords(props) {
  function renderList(title, words) {
    if (!words || words.length === 0) return null;

    return (
      <div className="related-group">
        <h4>{title}</h4>
        <div className="word-list">
          {words.slice(0, 8).map((word, index) => (
            <span key={index} className="word-pill">
              {word}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="RelatedWords">
      <h3>📚 Related Words</h3>
      {renderList("Antonyms", props.relatedWords.antonyms)}
      {renderList("Similar Words", props.relatedWords.similar)}
      {renderList("Word Family", props.relatedWords.family)}
    </div>
  );
}
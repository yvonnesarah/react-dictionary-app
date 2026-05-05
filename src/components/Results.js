import "../styles/Results.css";
import Meaning from "./Meaning";
import RelatedWords from "./RelatedWords";

export default function Results(props) {
  // Debug: log incoming results to console
  console.log(props.results);

  // Function to pronounce a word using the browser's Speech Synthesis API
  function speakWord(word) {
    if (!word) return; // guard clause: do nothing if no word is provided

    const utterance = new SpeechSynthesisUtterance(word);

    // Set pronunciation settings
    utterance.lang = "en-GB"; // British English accent
    utterance.rate = 0.9;     // slightly slower speech for clarity

    // Speak the word aloud
    window.speechSynthesis.speak(utterance);
  }

  // Only render results if they exist
  if (props.results) {
    return (
      <div className="Results">

        {/* Word header section */}
        <section className="Word">

          {/* Display searched word */}
          <h2>{props.results.word}</h2>

          {/* Display phonetic spelling */}
          <div className="Phonetic">
            {props.results.phonetic}
          </div>

          {/* Button to play pronunciation audio */}
          <button
            className="audio-btn"
            onClick={() => speakWord(props.results.word)}
            title="Hear pronunciation"
          >
            🔊 Listen
          </button>

          {/* Button to add word to favourites */}
          <button
            className="audio-btn"
            onClick={() => props.onFavourite(props.results.word)}
          >
            ⭐ Favourite
          </button>

        </section>

        {/* Render meanings if available */}
        {!!props.results.meanings &&
          props.results.meanings.map(function (meaning, index) {
            return (
              <section key={index}>
                <Meaning meaning={meaning} />
              </section>
            );
          })}

        {/* Show related words (synonyms/related terms) */}
        <RelatedWords relatedWords={props.relatedWords} />

        {/* Display API status/message if present */}
        {props.results.status && <>{props.results.message}</>}

      </div>
    );
  } else {
    // If no results, render nothing
    return null;
  }
}
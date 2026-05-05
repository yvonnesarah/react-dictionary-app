import "../styles/Results.css";
import Meaning from "./Meaning";
import RelatedWords from "./RelatedWords";

export default function Results(props) {
  console.log(props.results);

  function speakWord(word) {
    if (!word) return;

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  if (props.results) {
    return (
      <div className="Results">
        <section className="Word">
          <h2>{props.results.word}</h2>

          <div className="Phonetic">
            {props.results.phonetic}
          </div>

          {/* 🔊 Button BELOW phonetic */}
          <button
            className="audio-btn"
            onClick={() => speakWord(props.results.word)}
            title="Hear pronunciation"
          >
            🔊 Listen
          </button>
          <button
           className="audio-btn"
           onClick={() => props.onFavourite(props.results.word)}
           >
            ⭐ Favourite
            </button>
        </section>

        {!!props.results.meanings &&
          props.results.meanings.map(function (meaning, index) {
            return (
              <section key={index}>
                <Meaning meaning={meaning} />
              </section>
            );
          })}

          <RelatedWords relatedWords={props.relatedWords} />

        {props.results.status && <>{props.results.message}</>}
      </div>
    );
  } else {
    return null;
  }
}
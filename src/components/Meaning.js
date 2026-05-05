// Import the Synonyms component to display related words
import Synonyms from "./Synonyms";

// Import CSS styles for this component
import "../styles/Meaning.css";

// Functional component that displays a meaning of a word
export default function Meaning(props) {
  // props.meaning contains data like part of speech, definition, example, synonyms

  return (
    <div className="Meaning">
      
      {/* Display the part of speech (e.g., noun, verb, adjective) */}
      <h3>
        {props.meaning.partOfSpeech} 
        
        {/* Static label/tag for styling or categorization */}
        <span className="tag">grammar</span>
      </h3>

      {/* Display the definition of the word */}
      <div className="Definition">
        {props.meaning.definition}
      </div>

      {/* Display an example sentence using the word */}
      <div className="Example">
        {props.meaning.example}
      </div>

      {/* Render synonyms using a separate component */}
      <Synonyms synonyms={props.meaning.synonyms} />
      
    </div>
  );
}
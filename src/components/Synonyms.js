// Importing CSS styles for the Synonyms component
import "../styles/Synonyms.css";

// Functional React component that receives props (expects a 'synonyms' array)
export default function Synonyms(props) {
  // Check if synonyms exist and if the array has at least one item
  if (props.synonyms && props.synonyms.length > 0) {
    
    // If synonyms exist, render them inside a container div
    return (
      <div className="Synonyms">
        
        {/* Loop through each synonym in the array */}
        {props.synonyms.map((synonym, index) => (
          
          // Each synonym is wrapped in a span for styling
          // key is required by React for list rendering optimization
          <span className="Each-synonym" key={index}>
            {synonym}
          </span>
        ))}
      </div>
    );

  } else {
    // If no synonyms are provided, render nothing
    return null;
  }
}
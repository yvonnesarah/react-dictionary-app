import "../styles/Synonyms.css";

export default function Synonyms(props) {
  if (props.synonyms && props.synonyms.length > 0) {
    return (
      <div className="Synonyms">
        {props.synonyms.map((synonym, index) => (
          <span className="Each-synonym" key={index}>
            {synonym}
          </span>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

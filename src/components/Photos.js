import "../styles/Photos.css";

export default function Photos(props) {
  if (props.photos) {
    return (
      <section className="Photos">
        <h1>Images</h1>
        <div className="row">
          {props.photos.map((photo) => (
            <div className="col-4" key={photo.id}>
              <a
                href={photo.src.original}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={photo.src.landscape}
                  alt={photo.alt}
                  className="img-fluid"
                />
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return null;
  }
}

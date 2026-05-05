import { useState } from "react";
import "../styles/Photos.css";

export default function Photos(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!props.photos || props.photos.length === 0) return null;

  // ✅ Stronger dedupe using ONLY original image URL
  const seen = new Set();

  const photos = props.photos
    .filter((photo) => {
      const key = (photo.src.original || "").split("?")[0];

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    })
    .slice(0, 9);

  return (
    <section className="Photos">
      <h1>Images</h1>

      <div className="photo-grid">
        {photos.map((photo) => (
          <div className="photo-card" key={photo.src.original}>
            <img
              src={photo.src.landscape}
              alt={photo.alt || "Image"}
              onClick={() => setSelectedImage(photo)}
            />

            {photo.alt && (
              <p className="photo-description">{photo.alt}</p>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            <img
              src={selectedImage.src.original}
              alt={selectedImage.alt || "Image"}
            />

            {selectedImage.alt && (
              <p className="lightbox-description">
                {selectedImage.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
import { useState } from "react";
import "../styles/Photos.css";

export default function Photos(props) {
  // State to track which image is currently selected for the lightbox view
  const [selectedImage, setSelectedImage] = useState(null);

  // If no photos are passed in, render nothing
  if (!props.photos || props.photos.length === 0) return null;

  // Set used to remove duplicate images based on their original URL
  const seen = new Set();

  // Filter and limit photos:
  // 1. Remove duplicates using base image URL (without query params)
  // 2. Limit to max 9 images
  const photos = props.photos
    .filter((photo) => {
      // Normalize URL by stripping query parameters for reliable deduplication
      const key = (photo.src.original || "").split("?")[0];

      // Skip if we've already seen this image
      if (seen.has(key)) return false;

      // Mark image as seen
      seen.add(key);
      return true;
    })
    .slice(0, 9);

  return (
    <section className="Photos">
      {/* Section heading */}
      <h1>Images</h1>

      {/* Grid layout for displaying images */}
      <div className="photo-grid">
        {photos.map((photo) => (
          <div className="photo-card" key={photo.src.original}>
            {/* Click image to open lightbox */}
            <img
              src={photo.src.landscape}
              alt={photo.alt || "Image"}
              onClick={() => setSelectedImage(photo)}
            />

            {/* Optional image description */}
            {photo.alt && (
              <p className="photo-description">{photo.alt}</p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox overlay (only shown when an image is selected) */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)} // clicking backdrop closes lightbox
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside content
          >
            {/* Close button */}
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            {/* Full-size selected image */}
            <img
              src={selectedImage.src.original}
              alt={selectedImage.alt || "Image"}
            />

            {/* Optional description in lightbox */}
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
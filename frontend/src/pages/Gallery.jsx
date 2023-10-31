import React, { useState, useEffect } from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PhotoGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const openLightbox = (event, obj) => {
    setCurrentImage(obj.index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    const unsplashApiUrl = 'https://api.unsplash.com/photos/random';
    const clientId = 'J81Mtj8Cuiwo0GyAxzbPXh2pZYxJPmUfRXuMbHY9iP8';
    const numberOfImages = 30;
    const cat = 'railway-sri-lanka';

    fetch(`${unsplashApiUrl}?count=${numberOfImages}&client_id=${clientId}&query=${cat}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const newPhotos = data.map(image => ({
            original: image.urls.regular,
            thumbnail: image.urls.thumb,
            // description: image.alt_description, 
          }));
          setPhotos(newPhotos);
        } else {
          console.error('Error: Unable to fetch images from Unsplash.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <Gallery items={photos} />
    </div>
  );
};

export default PhotoGallery;

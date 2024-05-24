import React, { useState } from 'react';
import '../App.css'; 
const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const nextImage = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  return ( 
    <div className="carousel">
      <button onClick={previousImage} className="carousel-button">
        Previous
      </button>
      <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} className="carousel-image" />
      <button onClick={nextImage} className="carousel-button">
        Next
      </button>
    </div>
  );
};

export default Carousel;
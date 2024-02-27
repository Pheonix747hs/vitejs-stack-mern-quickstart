import React, { useState, useEffect } from "react";
import '../App.css';

const EventSlider = ({ totalSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideDuration = 7000; // Set the duration for each slide in milliseconds

  useEffect(() => {
    // Automatically transition to the next slide after a specified duration
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, slideDuration);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [totalSlides, slideDuration]);

  const handleThumbnailClick = (index) => {
    // Handle thumbnail click to navigate to the corresponding slide
    setCurrentSlide(index);
  };

  return (
    <div className="slider2">
      {/* Display the current slide */}
      <img
        src={`event${currentSlide + 1}.png`}
        alt={`Event ${currentSlide + 1}`}
      />
    </div>
  );
};

export default EventSlider;

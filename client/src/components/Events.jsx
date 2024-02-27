// Events.js
import React, { useState, useEffect, useRef } from "react";
import "./Events.css"; // Create a CSS file for styling
import Footer from "./Footer";

const Events = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Set the total number of slides
  const slideDuration = 7000; // Set the duration for each slide in milliseconds

  // Maintain an array of registration links corresponding to each event
  const registrationLinks = [
    "https://forms.gle/BciDjdNB5iiCUEMN7",
    "#"
  ];

  const previousEventRef = useRef(null); // Create a ref for the previous events section

  useEffect(() => {
    // Automatically transition to the next slide after a specified duration
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, slideDuration);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentSlide, totalSlides, slideDuration]);

  const handleThumbnailClick = (index) => {
    // Handle thumbnail click to navigate to the corresponding slide
    setCurrentSlide(index);
  };

  const handlePreviousEventsClick = () => {
    // Handle button click to navigate to the previous events section
    if (previousEventRef.current) {
      previousEventRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="eventbody">
      <div className="events-container">
        <div className="slider">
          {/* Display the current slide */}
          <img
            src={`event${currentSlide + 1}.png`}
            alt={`Event ${currentSlide + 1}`}
          />
          <div className="gradient-overlay"></div>
          {/* Thumbnails at the bottom */}
          <div className="thumbnails">
            {Array.from({ length: totalSlides }, (_, index) => (
              <img
                key={index}
                src={`event${index + 1}.png`}
                alt={`Event ${index + 1}`}
                className={index === currentSlide ? "active" : ""}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          {/* Buttons below the slider */}
          <div className="buttons">
            <button
              className="register-btn"
              onClick={() =>
                window.open(registrationLinks[currentSlide], "_blank")
              }
            >
              Register Now
            </button>
            <button
              className="go-to-previous-events"
              onClick={handlePreviousEventsClick}
            >
              PREVIOUS EVENTS
              <span className="down-arrow">
                <img src="down-arrow.png" alt="Down Arrow"></img>
              </span>
            </button>
          </div>
        </div>

        {/* Previous events section */}
        <div ref={previousEventRef} className="previous-events-section">
          <h2 className="prev-event-title">Previous Events</h2>
          <div className="prevEvent">
            <img
              src="higher-edu.png"
              className="event-img"
              alt="previouseventimages"
            />
          </div>
          {/* <div class="prevEvent">
          <img
            src="prev-event.png"
            class="event-img"
            alt="previouseventimages"
          />
        </div>
        <div class="prevEvent">
          <img
            src="prev-event.png"
            class="event-img"
            alt="previouseventimages"
          />
        </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;

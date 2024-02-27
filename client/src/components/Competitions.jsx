// Events.js
import React, { useState, useEffect, useRef } from "react";
import "./Events.css";
import Footer from "./Footer";

const Events = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // Set the total number of slides
  const slideDuration = 5000; // Set the duration for each slide in milliseconds

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

  const handleRegisterClick = () => {
    // Open the Google Form in a new tab
    window.open("https://your-google-form-url", "_blank");
  };

  const handlePreviousEventsClick = () => {
    // Handle button click to navigate to the previous events section
    if (previousEventRef.current) {
      previousEventRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="competitionsbody">
      <div className="competitions-container">
        <div className="slider">
          {/* Display the current slide */}
          <img
            src={`competition${currentSlide + 1}.png`}
            alt={`Competition ${currentSlide + 1}`}
          />
          <div className="gradient-overlay"></div>
          {/* Thumbnails at the bottom */}
          <div className="thumbnails">
            {Array.from({ length: totalSlides }, (_, index) => (
              <img
                key={index}
                src={`competition${index + 1}.png`}
                alt={`Competition ${index + 1}`}
                className={index === currentSlide ? "active" : ""}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          {/* Buttons below the slider */}
          <div className="buttons">
            <button className="register-btn" onClick={handleRegisterClick}>
              Register Now
            </button>
            <button
              className="go-to-previous-competitions"
              onClick={handlePreviousEventsClick}
            >
              PREVIOUS COMPETITIONS
              <span className="down-arrow">
                <img src="down-arrow.png" alt="Down Arrow"></img>
              </span>
            </button>
          </div>
        </div>

        {/* Previous events section */}
        <div ref={previousEventRef} className="previous-events-section previous-competitions-section">
          <h2 class="prev-event-title prev-competition-title">Previous Competitions</h2>
          <div class="prevEvent prevCompetition">
            <img
              src="prev-competition.png"
              class="event-img competitions-img"
              alt="previouscompetitionimages"
            />
          </div>
          {/* <div class="prevEvent prevCompetition">
          <img
            src="prev-competition.png"
            class="event-img competitions-img"
            alt="previouscompetitionimages"
          />
        </div>
        <div class="prevEvent prevCompetition">
          <img
            src="prev-competition.png"
            class="event-img competitions-img"
            alt="previouscompetitionimages"
          />
        </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;

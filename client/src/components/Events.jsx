// Events.js
import React, { useState, useEffect, useRef } from "react";
import "./Events.css"; // Create a CSS file for styling
import Footer from "./Footer";
import axios from 'axios'; // Assuming you have axios installed

const Events = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Set the total number of slides
  const slideDuration = 7000; // Set the duration for each slide in milliseconds

  // Maintain an array of registration links corresponding to each event
  const registrationLinks = [
    "https://forms.gle/BciDjdNB5iiCUEMN7",
    "#",
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

  const [formData, setFormData] = useState({
    title: '',
    timestamp: new Date().toISOString().slice(0, 10), // Auto-generate timestamp
    venue: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitRegistration = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log("datasend:",formData)
    try {
      const response = await axios.post('/api/events', formData); // Replace with your actual POST API endpoint
      console.log('Registration response:', response.data);
      // Handle successful registration (e.g., display a success message)
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle registration errors (e.g., display an error message)
    } finally {
      // Clear the form data after successful or failed submission
      setFormData({ title: '', venue: '' });
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        console.log('Retrieved events:', response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);
  


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

         {/* Registration form */}
         <div className="registration-form">
          <h2>Register for Event</h2>
          <form onSubmit={handleSubmitRegistration}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="timestamp">Timestamp:</label>
            <input
              type="text"
              id="timestamp"
              name="timestamp"
              value={formData.timestamp}
              readOnly // Disable user editing of timestamp
            />
            <br />
            <label htmlFor="venue">Venue:</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              required
            />
            <br />
            <button type="submit">Submit Registration</button>
          </form>
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
           <div class="prevEvent">
          <img
            src="code-launch.png"
            class="event-img"
            alt="previouseventimages"
          />
        </div>
        {/*<div class="prevEvent">
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

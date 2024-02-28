// Events.js
import React, { useState, useEffect, useRef } from "react";
import "./Events.css"; // Create a CSS file for styling
import Footer from "./Footer";
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


const Events = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Set the total number of slides
  const slideDuration = 7000; // Set the duration for each slide in milliseconds
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());


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
    timestamp: '',
    venue: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Data = e.target.result.split(',')[1]; // Extract base64 data
      setSelectedImage(base64Data);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmitRegistration = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!selectedImage) {
      console.error("Please select an image to upload");
      return;
    }

    const data = {
      ...formData, // Existing form data from state
      image: selectedImage, // Add the base64 encoded image data
    };

    try {
      const response = await axios.post('/api/events', data);
      console.log('Registration response:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setFormData({ title: '', venue: '' });
      setSelectedImage(null); // Clear selected image after submission
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
            <label htmlFor="timestamp">Event Date:</label>
            <DatePicker
              id="timestamp"
              name="timestamp"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                handleInputChange({ target: { name: "timestamp", value: date.toISOString() } }); // Update form data
              }}
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
            <div className="image-upload">
              <label htmlFor="image">Select Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
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

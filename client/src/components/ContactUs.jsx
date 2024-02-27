import "./ContactUs.css";
import React, { useState } from 'react';
import { useForm, ValidationError } from "@formspree/react";
import Footer from "./Footer";

const ContactUs = () => {
  const [state, handleSubmit] = useForm("mdoqalay");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Submit the form
    const submission = await handleSubmit(e);

    // Check if the form submission was successful
    if (submission?.data?.succeeded) {
      // Clear the form inputs and reset state
      setEmail("");
      setMessage("");
      e.target.reset();

      // Show success dialog
      setDialogOpen(true);
    } else {
      // Handle error if needed
      console.error("Error submitting the form:", submission?.data);
    }
  };

  return (
    <div className="contactus-body">
      <div className="contactus-title">
        <h1>Contact Us</h1>
      </div>
      <div className="contactus-page">
        <p>Feel free to reach out to the ciphers using the form below:</p>
        <div className="contactcardarea">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Your Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <ValidationError prefix="Email" field="email" />

            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <ValidationError prefix="Message" field="message" />

            <button type="submit" disabled={state.submitting}>
              Send Message
            </button>
          </form>

          {/* Success Dialog */}
          {isDialogOpen && (
            <div className="success-dialog">
              <p>
                Thank you for reaching out! Your message has been sent
                successfully.
              </p>
              <button onClick={handleDialogClose}>Close</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;


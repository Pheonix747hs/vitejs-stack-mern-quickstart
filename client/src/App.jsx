import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Events from "./components/Events";
import Competitions from "./components/Competitions";
import Resources from "./components/Resources";
import Startups from "./components/Startups";
import ContactUs from "./components/ContactUs";
import Preloader from "./components/Preloader";
import "./App.css";
import ReactGA from 'react-ga'; // Import react-ga

const App = () => {
  useEffect(() => {
    // Track page view
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <Preloader />
      <div style={{ height: "100vh", overflowX: "hidden" }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;

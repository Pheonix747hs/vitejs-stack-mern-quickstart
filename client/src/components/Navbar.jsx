// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className="navbar"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}
      >
        <div className="logo">
          <img
            src="cipher-logo-removebg.png"
            className="logo-img"
            alt="Ciphers Logo"
          />
        </div>
        <div className="navigation-btn">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/competitions">Competitions</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/startups">Startups</Link>
          <Link to="/contactus">
            <nobr>Contact Us</nobr>
          </Link>
        </div>
        <div
          className={`burger-menu${menuOpen ? " open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
        </div>
      </div>
      <div className={`overlay${menuOpen ? " open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/events" onClick={toggleMenu}>
          Events
        </Link>
        <Link to="/competitions" onClick={toggleMenu}>
          Competitions
        </Link>
        <Link to="/resources" onClick={toggleMenu}>
          Resources
        </Link>
        <Link to="/startups" onClick={toggleMenu}>
          Startups
        </Link>
        <Link to="/contactus" onClick={toggleMenu}>
          <nobr>Contact Us</nobr>
        </Link>
      </div>
    </>
  );
};

export default Navbar;

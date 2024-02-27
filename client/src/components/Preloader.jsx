// Preloader.js

import React, { useEffect, useState } from "react";

import "./Preloader.css";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the duration as needed (in milliseconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${loading ? "visible" : "hidden"}`}>
      {/* Content to display when not loading */}
      <div className="preloader-content">
        {/* Add any additional content or styling as needed */}
      </div>
    </div>
  );
};

export default Preloader;


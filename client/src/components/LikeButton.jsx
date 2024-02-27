// src/components/LikeButton.js

import React, { useState, useEffect } from "react";
import thumbsUpIcon from "../assets/thumbs-up.png"; // Import the thumbs-up image
import "./LikeButton.css";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    const hasLiked = localStorage.getItem("hasLiked");

    if (storedLikes) {
      setLikes(Number(storedLikes));
    }

    if (hasLiked) {
      setIsLiked(true);
    }
  }, []);

  const handleLikeClick = () => {
    if (!isLiked) {
      setLikes((prevLikes) => prevLikes + 1);
      localStorage.setItem("likes", likes + 1);
      localStorage.setItem("hasLiked", "true");
      setIsLiked(true);
    }
  };

  return (
    <div className={`like-container ${isLiked ? "liked" : ""}`}>
      <button className="like-button" onClick={handleLikeClick}>
        <img src={thumbsUpIcon} alt="Thumbs Up" className="thumbs-up-icon" />
        {likes} {likes === 1 ? "Like" : "Likes"}
      </button>
      <p className="like-text">Please like if you find this helpful</p>
    </div>
  );
};

export default LikeButton;

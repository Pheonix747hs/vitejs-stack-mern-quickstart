import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Resources.css";
import Footer from "./Footer";

const Resources = () => {
  const resourceData = [
    {
      name: "C",
      image: "c.png",
      link: "https://www.learn-c.org/",
    },
    {
      name: "C++",
      image: "cpp.png",
      link: "https://www.cplusplus.com/",
    },
    {
      name: "Data Structures and Algorithms",
      image: "dsa.png",
      link: "https://www.geeksforgeeks.org/data-structures/",
    },
    {
      name: "Java",
      image: "java.png",
      link: "https://www.java.org/",
    },
    {
      name: "Python",
      image: "python.png",
      link: "https://www.python.org/",
    },
    {
      name: "Artificial Intelligence",
      image: "ai.png",
      link: "https://www.analyticsvidhya.com/blog/2018/11/what-is-ai-tutorial/",
    },
    {
      name: "Machine Learning",
      image: "ml-image.png",
      link: "https://www.coursera.org/learn/machine-learning",
    },
    {
      name: "Data Science",
      image: "data-science.png",
      link: "https://www.kaggle.com/learn/data-science",
    },
    {
      name: "Academic Practicals",
      image: "practicals.png",
      link: "https://github.com/Ciphers-hub/Academic-Codes/",
    },
    // Add more resources as needed
  ];

  return (
    <div className="resources-body">
      <div className="resources-title">
        <h1>RESOURCES</h1>
      </div>
      <div className="resources-page">
        <div className="resource-header">
          <img src="resourcesbg.png" alt="resourcesbg" />
        </div>

        <div className="resource-grid">
          {resourceData.map((resource, index) => (
            <div key={index} className="resource-item">
              <img
                src={resource.image}
                alt={resource.name}
                className="resource-image"
              />
              <h3>{resource.name}</h3>
              <Link
                to={resource.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;

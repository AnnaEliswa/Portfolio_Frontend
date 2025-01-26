import React from 'react';
import './ProjectDetails.css';
import UUVImage from '../assets/UUV.jpg'; // Update the path to your image

const UUVProject = () => {
  return (
    <div className="project-details-container">
      <h1 className="project-title">Unmanned Underwater Vehicle (UUV)</h1>
      <div className="project-image-wrapper">
        <img src={UUVImage} alt="Unmanned Underwater Vehicle" className="project-image" />
      </div>
      <p className="project-description">
        This project focuses on designing and developing an Unmanned Underwater Vehicle for surveillance and
        object retrieval in underwater environments. The system is equipped with Arduino Nano, BLDC motors,
        and electronic speed controllers to ensure precise control and navigation.
      </p>
      <div className="project-highlights">
        <h2 className="highlights-title">Features</h2>
        <ul className="highlights-list">
          <li>Powered by Arduino Nano for efficient control.</li>
          <li>BLDC motors and ESCs for smooth navigation.</li>
          <li>Optimized for surveillance and object retrieval.</li>
          <li>Lightweight and cost-effective design.</li>
        </ul>
      </div>
    </div>
  );
};

export default UUVProject;


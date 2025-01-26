import React from 'react';
import './ProjectDetails.css';

const SignLanguageProject = () => {
  return (
    <div className="project-details-container">
      <h1 className="project-title">Sign Language to Speech Converter</h1>
      <div className="project-image-wrapper">
        <img 
          src="https://assets.rbl.ms/25583540/origin.jpg" 
          alt="Sign Language to Speech Converter" 
          className="project-image" 
        />
      </div>
      <p className="project-description">
        This project addresses the communication barriers faced by sign language users by developing a 
        sign language to speech converter. The system captures hand gestures and translates them into 
        audible speech.
      </p>
      <div className="project-highlights">
        <h2 className="highlights-title">Features</h2>
        <ul className="highlights-list">
          <li>Arduino microcontroller for gesture detection</li>
          <li>Flex sensors to capture finger movements</li>
          <li>Audio module for speech synthesis</li>
        </ul>
      </div>
      <p className="project-description">
        The project involved designing a glove with embedded flex sensors. The sensors detect hand 
        movements and send data to the Arduino, which processes the input and generates speech output. 
        This prototype helps bridge the communication gap for people with hearing and speech impairments.
      </p>
      
    </div>
  );
};

export default SignLanguageProject;

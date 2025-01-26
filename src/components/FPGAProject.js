import React from 'react';
import './ProjectDetails.css';
import FPGAImage from '../assets/FPGA.jpg'; 

const FPGAProject = () => {
  return (
    <div className="project-details-container">
      <h1 className="project-title">FPGA Car Parking System</h1>
      <div className="project-image-wrapper">
        <img 
          src={FPGAImage} 
          alt="FPGA Car Parking System" 
          className="project-image" 
        />
      </div>
      <p className="project-description">
        This project focuses on designing and implementing a car parking system using FPGA technology.
        The system is capable of monitoring parking slots and displaying the availability of spaces to visitors.
      </p>
      <div className="project-highlights">
        <h2 className="highlights-title">Features</h2>
        <ul className="highlights-list">
          <li>Real-time monitoring of parking slots</li>
          <li>LED indicators to guide visitors</li>
          <li>FPGA-based logic for high-speed and reliable performance</li>
        </ul>
      </div>
      <p className="project-description">
        The FPGA parking system updates the availability status on a LED display. The project was implemented using VHDL and tested using simulation tools like Xilinx.
      </p>
      <p className="project-description">
        This project demonstrates the integration of hardware design principles to solve real-world challenges.
      </p>
    </div>
  );
};

export default FPGAProject;

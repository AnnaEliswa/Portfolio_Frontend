import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import FPGAImage from '../assets/FPGA.jpg';
import UUV from '../assets/UUV.jpg';

const Projects = () => {
  return (
    <div className="projects-container py-5">
      <h2 className="projects-title text-center">My Projects</h2>
      <div className="row">
        {/* Project 1 */}
        <div className="col-md-4">
          <div className="card">
            <img src={UUV} className="card-img-top" alt="UUV Project" />
            <div className="card-body">
              <h5 className="card-title">Unmanned Underwater Vehicle</h5>
              
              <Link to="/projects/uuv" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="col-md-4">
          <div className="card">
            <img src={FPGAImage} className="card-img-top" alt="FPGA Project" />
            <div className="card-body">
              <h5 className="card-title">Smart FPGA Car Parking System</h5>
              
              <Link to="/projects/fpga" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://assets.rbl.ms/25583540/origin.jpg"
              className="card-img-top"
              alt="Sign Language Project"
            />
            <div className="card-body">
              <h5 className="card-title">Sign Language to Speech Converter</h5>
              
              <Link to="/projects/sign-language" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

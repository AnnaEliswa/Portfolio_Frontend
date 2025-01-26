import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import UUVProject from './components/UUVProject'; // Import for UUV Project
import FPGAProject from './components/FPGAProject'; // Import for FPGA Project
import SignLanguageProject from './components/SignLanguageProject'; // Import for Sign Language Project
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="bg-custom min-vh-100 d-flex flex-column">
        <div className="container py-5 d-flex justify-content-center align-items-center flex-grow-1">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <div className="home-page"> {/* Add the home-page class here */}
                  <h1 className="display-3 fw-bold text-main">
                    Welcome to My Portfolio
                  </h1>
                </div>
              }
            />
            
            {/* Other Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />

            {/* Project-Specific Routes */}
            <Route path="/projects/uuv" element={<UUVProject />} />
            <Route path="/projects/fpga" element={<FPGAProject />} />
            <Route path="/projects/sign-language" element={<SignLanguageProject />} />
          </Routes>
        </div>
        <footer className="mt-auto py-3 bg-dark text-white text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} My Portfolio. All Rights Reserved.
          </p>
          <p>
            <a href="/contact" className="text-decoration-none text-light">
              Get in Touch
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;

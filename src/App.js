import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ProjectDetails from './components/ProjectDetails';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Cookies from 'js-cookie';
import './App.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated from cookies
    setAuthenticated(Cookies.get("auth") === "true");
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="bg-custom min-vh-100 d-flex flex-column">
        <div className="container py-5 d-flex flex-column justify-content-center align-items-center flex-grow-1">
          <Routes>
            {/* Home Page with animation */}
            <Route
              path="/"
              element={
                <div className="home-page">
                  <div className="welcome-container">
                    <div className="left-side">
                      <h1 className="welcome-text">Welcome to My Portfolio</h1>
                    </div>
                    <div className="right-side">
                      <p className="description">
                        I am Anna Mariya Benny, currently working as an Associate Software Engineer Trainee at Tarento Technologies Private Ltd.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
            
            {/* Other Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Dynamic Project Route */}
            <Route path="/projects/:projectId" element={<ProjectDetails />} />

            {/* Admin Panel - Protected Route */}
            <Route
              path="/admin"
              element={
                authenticated ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            
            {/* Login Route - Pass setAuthenticated */}
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          </Routes>
        </div>
        <footer className="mt-auto py-3 bg-dark text-white text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} My Portfolio. All Rights Reserved.</p>
          <p><a href="/contact" className="text-decoration-none text-light">Get in Touch</a></p>
        </footer>
      </div>
    </Router>
  );
};

export default App;

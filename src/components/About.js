import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css'; // Link to the CSS file

const About = () => {
  const [aboutMe, setAboutMe] = useState({});
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  // Fetch data from backend APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch "About Me" details
        const aboutResponse = await axios.get('http://localhost:8080/api/about');
        setAboutMe(aboutResponse.data[0]); // Assuming the backend returns an array

        // Fetch Education details
        const educationResponse = await axios.get('http://localhost:8080/api/education');
        setEducation(educationResponse.data);

        // Fetch Skills details
        const skillsResponse = await axios.get('http://localhost:8080/api/skills');
        setSkills(skillsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="about-container">
      <h2 className="about-title">About Me</h2>
      <p className="about-description">{aboutMe?.description || "Loading..."}</p>

      <div className="education">
        <h3 className="section-title">Education</h3>
        <ul className="education-list">
          {education.map((edu) => (
            <li key={edu.id} className="education-item">
              <h5>{edu.degree}</h5>
              <p className="education-details">
                {edu.institution}, {edu.year}, CGPA: {edu.cgpa}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="skills">
        <h3 className="section-title">Skills</h3>
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill.id} className="skills-item">{skill.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;

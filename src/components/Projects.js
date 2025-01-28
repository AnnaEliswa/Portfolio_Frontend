import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/projects'); // Replace with your backend endpoint
      setProjects(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="projects-container py-5">
      <h2 className="projects-title text-center">My Projects</h2>
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4">
            <div className="card">
              <img
                src={`data:image/jpeg;base64,${project.image}`}
                className="card-img-top"
                alt={project.title}
              />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <Link to={`/projects/${project.id}`} className="btn btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

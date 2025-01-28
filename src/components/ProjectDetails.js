import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
        setProject(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div className="loading">Loading project details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!project) {
    return <div className="project-not-found">Project Not Found</div>;
  }

  return (
    <div className="project-details-container">
      <h1 className="project-title">{project.title}</h1>
      <div className="project-image-wrapper">
        <img
          src={`data:image/jpeg;base64,${project.image}`}
          alt={project.title}
          className="project-image"
        />
      </div>
      <p className="project-description">{project.description}</p>
      {project.highlights && (
        <div className="project-highlights">
          <h2 className="highlights-title">Features</h2>
          <ul className="highlights-list">
            {project.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;

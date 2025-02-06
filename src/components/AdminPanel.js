import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./AdminPanel.css";



const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState("users");
  const [data, setData] = useState([]);
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [skillFormData, setSkillFormData] = useState({ name: "" });
  const [educationFormData, setEducationFormData] = useState({
    degree: "",
    institution: "",
    year: "",
    cgpa: "",
  });
  const [projectFormData, setProjectFormData] = useState({title:"",description:"",highlights:"",image:null});
  const [editingUser, setEditingUser] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showAddEducationForm, setShowAddEducationForm] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const navigate = useNavigate();

  // Check for authentication cookie
  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (!authCookie || authCookie !== "true") {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);
  


 

const fetchData = useCallback(async () => {
  try {
    const url = `http://localhost:8080/api/${selectedCategory}`;
    const response = await axios.get(url, { withCredentials: true });
    setData(response.data);
    setError("");
  } catch (error) {
    console.error("Error fetching data", error);
    setError("Failed to fetch data. Please try again later.");
  }
}, [selectedCategory]); // Add dependencies to ensure correct behavior

useEffect(() => {
  if (isAuthenticated) {
    fetchData();
  }
}, [isAuthenticated, fetchData]); // Now fetchData is stable and doesn't change on every render



  const handleDelete = async (id) => {
    try {
    await axios.delete(`http://localhost:8080/api/${selectedCategory}/${id}`, { withCredentials: true });
    alert("Item deleted successfully");
    fetchData();
    } catch (error) {
    alert("Error deleting item");
    }
  };

  const handleProjectInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProjectFormData((prevState) => ({
        ...prevState,
        image: files[0], // Store the file object for image
      }));
    } else {
      setProjectFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", projectFormData.title);
    formData.append("description", projectFormData.description);
    formData.append("highlights", projectFormData.highlights);
    formData.append("image", projectFormData.image); // Append the image file

    try {
      await axios.post("http://localhost:8080/api/projects", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure it's sent as multipart/form-data
        },
      });
      alert("Project added successfully");
      fetchData();
      setProjectFormData({ title: "", description: "", highlights: "", image: null });
      setShowAddProjectForm(false);
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project");
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description,
      highlights: project.highlights,
      image: project.image,
    });
  };


  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", projectFormData.title);
    formData.append("description", projectFormData.description);
    formData.append("highlights", projectFormData.highlights);
    if (projectFormData.image) {
      formData.append("image", projectFormData.image); // Append the new image file if provided
    }

    try {
      await axios.put(
        `http://localhost:8080/api/projects/${editingProject.id}`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Project updated successfully");
      fetchData();
      setEditingProject(null);
      setProjectFormData({ title: "", description: "", highlights: "", image: null });
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project");
    }
  };
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }


  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillInputChange = (e) => {
    const { name, value } = e.target;
    setSkillFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEducationInputChange = (e) => {
    const { name, value } = e.target;
    setEducationFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", userFormData, {
        withCredentials: true,
      });

      alert("User added successfully");
      fetchData(); // Refresh the user list
      setUserFormData({ email: "", password: "" }); // Reset form
      setShowAddUserForm(false); // Hide Add form after submit
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/skills", skillFormData, {
        withCredentials: true,
      });

      alert("Skill added successfully");
      fetchData(); // Refresh the skill list
      setSkillFormData({ name: "" }); // Reset form
      setShowAddSkillForm(false); // Hide Add form after submit
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Error adding skill");
    }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/education", educationFormData, {
        withCredentials: true,
      });

      alert("Education added successfully");
      fetchData(); // Refresh the education list
      setEducationFormData({
        degree: "",
        institution: "",
        year: "",
        cgpa: "",
      }); // Reset form
      setShowAddEducationForm(false); // Hide Add form after submit
    } catch (error) {
      console.error("Error adding education:", error);
      alert("Error adding education");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user); // Set user to edit
    setUserFormData({ email: user.email, password: "" }); // Prefill form
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/users/${editingUser.id}`,
        userFormData,
        {
          withCredentials: true,
        }
      );

      alert("User updated successfully");
      fetchData(); // Refresh user list
      setEditingUser(null); // Clear editing state
      setUserFormData({ email: "", password: "" }); // Reset form
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill); // Set skill to edit
    setSkillFormData({ name: skill.name }); // Prefill form
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/skills/${editingSkill.id}`,
        skillFormData,
        {
          withCredentials: true,
        }
      );

      alert("Skill updated successfully");
      fetchData(); // Refresh skill list
      setEditingSkill(null); // Clear editing state
      setSkillFormData({ name: "" }); // Reset form
    } catch (error) {
      console.error("Error updating skill:", error);
      alert("Error updating skill");
    }
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education); // Set education to edit
    setEducationFormData({
      degree: education.degree,
      institution: education.institution,
      year: education.year,
      cgpa: education.cgpa,
    }); // Prefill form
  };

  const handleUpdateEducation = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/education/${editingEducation.id}`,
        educationFormData,
        {
          withCredentials: true,
        }
      );

      alert("Education updated successfully");
      fetchData(); // Refresh education list
      setEditingEducation(null); // Clear editing state
      setEducationFormData({
        degree: "",
        institution: "",
        year: "",
        cgpa: "",
      }); // Reset form
    } catch (error) {
      console.error("Error updating education:", error);
      alert("Error updating education");
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-panel">
      {error && <div className="error-message">{error}</div>}
      <Sidebar onCategoryChange={setSelectedCategory} selectedCategory={selectedCategory} />
      {/* <ContentArea category={selectedCategory} data={data} fetchData={fetchData} /> */}


      {selectedCategory === "projects" && (
        <div className="project-management">
          {showAddProjectForm ? (
            <>
              <h3>Add Project</h3>
              <form onSubmit={handleAddProject}>
                <label>
                  Title:
                  <input type="text" name="title" value={projectFormData.title} onChange={handleProjectInputChange} required />
                </label>
                <label>
                  Description:
                  <input type="text" name="description" value={projectFormData.description} onChange={handleProjectInputChange} required />
                </label>
                <label>
                  Highlights:
                  <input type="text" name="highlights" value={projectFormData.highlights} onChange={handleProjectInputChange} required />
                </label>
                <label>
                  Image:
                  <input type="file" name="image" onChange={handleProjectInputChange} />
                </label>
                <button type="submit">Add Project</button>
                <button type="button" onClick={() => setShowAddProjectForm(false)}className="cancel-button">Cancel</button>
              </form>
            </>
          ) : (
            <button onClick={() => setShowAddProjectForm(true)}className="add-button">Add Project</button>
          )}



         {/* Project List (Display as Table) */}
    <div className="project-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Highlights</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.highlights}</td>
              <td>
                {project.image && (
                  <img
                    src={`data:image/jpeg;base64,${project.image}`}
                    alt={project.title}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleEditProject(project)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>




          {editingProject && (
            <div className="edit-form">
              <h3>Edit Project</h3>
              <form onSubmit={handleUpdateProject}>
                <label>
                  Title:
                  <input type="text" name="title" value={projectFormData.title} onChange={handleProjectInputChange} required />
                </label>
                <label>
                  Description:
                  <input type="text" name="description" value={projectFormData.description} onChange={handleProjectInputChange} required />
                </label>
                <label>
                  Highlights:
                  <input type="text" name="highlights" value={projectFormData.highlights} onChange={handleProjectInputChange} required />
                </label>
                <label>
                  Image:
                  <input type="file" name="image" onChange={handleProjectInputChange} />
                </label>
                <button type="submit">Update Project</button>
                <button type="button" onClick={() => setEditingProject(null)}className="cancel-button">Cancel</button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* User Management */}
      {selectedCategory === "users" && (
        <div className="user-management">
          {showAddUserForm ? (
            <>
              <h3>Add User</h3>
              <form onSubmit={handleAddUser}>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={userFormData.email}
                    onChange={handleUserInputChange}
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleUserInputChange}
                    required
                  />
                </label>
                <button type="submit">Add User</button>
                <button type="button" onClick={() => setShowAddUserForm(false)}className="cancel-button">Cancel</button>
              </form>
            </>
          ) : (
            <button onClick={() => setShowAddUserForm(true)}className="add-button">Add User</button>
          )}

          {/* User List (Display as Table) */}
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEditUser(user)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


          {/* Editing User Form */}
          {editingUser && (
            <div className="edit-form">
              <h3>Edit User</h3>
              <form onSubmit={handleUpdateUser}>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={userFormData.email}
                    onChange={handleUserInputChange}
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleUserInputChange}
                    required
                  />
                </label>
                <button type="submit">Update User</button>
                <button type="button" onClick={() => setEditingUser(null)}className="cancel-button">Cancel</button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Skill Management */}
      {selectedCategory === "skills" && (
        <div className="skill-management">
          {showAddSkillForm ? (
            <>
              <h3>Add Skill</h3>
              <form onSubmit={handleAddSkill}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={skillFormData.name}
                    onChange={handleSkillInputChange}
                    required
                  />
                </label>
                <button type="submit">Add Skill</button>
                <button type="button" onClick={() => setShowAddSkillForm(false)}className="cancel-button">Cancel</button>
              </form>
            </>
          ) : (
            <button onClick={() => setShowAddSkillForm(true)}className="add-button">Add Skill</button>
          )}

          {/* Skill List (Display as Table) */}
    <div className="skill-list">
      <table>
        <thead>
          <tr>
            <th>Skill Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.name}</td>
              <td>
                <button onClick={() => handleEditSkill(skill)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(skill.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

          {/* Editing Skill Form */}
          {editingSkill && (
            <div className="edit-form">
              <h3>Edit Skill</h3>
              <form onSubmit={handleUpdateSkill}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={skillFormData.name}
                    onChange={handleSkillInputChange}
                    required
                  />
                </label>
                <button type="submit">Update Skill</button>
                <button type="button" onClick={() => setEditingSkill(null)}className="cancel-button">Cancel</button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Education Management */}
      {selectedCategory === "education" && (
        <div className="education-management">
          {showAddEducationForm ? (
            <>
              <h3>Add Education</h3>
              <form onSubmit={handleAddEducation}>
                <label>
                  Degree:
                  <input
                    type="text"
                    name="degree"
                    value={educationFormData.degree}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <label>
                  Institution:
                  <input
                    type="text"
                    name="institution"
                    value={educationFormData.institution}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <label>
                  Year:
                  <input
                    type="text"
                    name="year"
                    value={educationFormData.year}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <label>
                  CGPA:
                  <input
                    type="text"
                    name="cgpa"
                    value={educationFormData.cgpa}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <button type="submit">Add Education</button>
                <button type="button" onClick={() => setShowAddEducationForm(false)}className="cancel-button">Cancel</button>
              </form>
            </>
          ) : (
            <button onClick={() => setShowAddEducationForm(true)}className="add-button">Add Education</button>
          )}

          {/* Education List (Display as Table) */}
    <div className="education-list">
      <table>
        <thead>
          <tr>
            <th>Degree</th>
            <th>Institution</th>
            <th>Year</th>
            <th>CGPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((education) => (
            <tr key={education.id}>
              <td>{education.degree}</td>
              <td>{education.institution}</td>
              <td>{education.year}</td>
              <td>{education.cgpa}</td>
              <td>
                <button onClick={() => handleEditEducation(education)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(education.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

          {/* Editing Education Form */}
          {editingEducation && (
            <div className="edit-form">
              <h3>Edit Education</h3>
              <form onSubmit={handleUpdateEducation}>
                <label>
                  Degree:
                  <input
                    type="text"
                    name="degree"
                    value={educationFormData.degree}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <label>
                  Institution:
                  <input
                    type="text"
                    name="institution"
                    value={educationFormData.institution}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <label>
                  Year:
                  <input
                    type="text"
                    name="year"
                    value={educationFormData.year}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <label>
                  CGPA:
                  <input
                    type="text"
                    name="cgpa"
                    value={educationFormData.cgpa}
                    onChange={handleEducationInputChange}
                    required
                  />
                </label>
                <button type="submit">Update Education</button>
                <button type="button" onClick={() => setEditingEducation(null)}className="cancel-button">Cancel</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

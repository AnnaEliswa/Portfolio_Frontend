import { useState } from "react";
import axios from "axios";
import "./ContentArea.css";

const ContentArea = ({ category, data, fetchData }) => {
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    password: "",
    degree: "",
    institution: "",
    year: "",
    cgpa: "",
    name: "",
    title: "",
    description: "",
    image: ""
  });

  const handleAdd = () => {
    setEditMode("add");
    setEditData({
      username: "",
      password: "",
      degree: "",
      institution: "",
      year: "",
      cgpa: "",
      name: "",
      title: "",
      description: "",
      image: ""
    }); // ✅ Initialize empty form
  };

  const handleEdit = (item) => {
    setEditMode("edit");
    setEditData(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${category}/${id}`, { withCredentials: true });
      alert("Item deleted successfully");
      fetchData();
    } catch (error) {
      alert("Error deleting item");
    }
  };

  const handleSave = async () => {
    try {
      if (editMode === "add") {
        await axios.post(`http://localhost:8080/api/${category}`, editData, { withCredentials: true });
      } else if (editMode === "edit") {
        await axios.put(`http://localhost:8080/api/${category}/${editData.id}`, editData, { withCredentials: true });
      }
      alert("Data saved successfully");
      fetchData();
      setEditMode(null);
    } catch (error) {
      alert("Error saving data");
    }
  };

  const renderContent = () => (
    <div>
      <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <button onClick={handleAdd}>Add {category}</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {category === "users" ? item.username : category === "projects" ? item.title : item.name || item.degree}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="content-area">
      {renderContent()}
      {editMode && (
        <div>
          <h3>{editMode === "add" ? `Add ${category}` : `Edit ${category}`}</h3>
          <form>
            {category === "users" && (
              <>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  placeholder="Enter username"
                />
                <input
                  type="password"
                  value={editData.password}
                  onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                  placeholder="Enter password"
                />
              </>
            )}
            {category === "education" && (
              <>
                <input
                  type="text"
                  value={editData.degree}
                  onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                  placeholder="Enter degree"
                />
                <input
                  type="text"
                  value={editData.institution}
                  onChange={(e) => setEditData({ ...editData, institution: e.target.value })}
                  placeholder="Enter institution"
                />
                <input
                  type="text"
                  value={editData.year}
                  onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                  placeholder="Enter year"
                />
                <input
                  type="text"
                  value={editData.cgpa}
                  onChange={(e) => setEditData({ ...editData, cgpa: e.target.value })}
                  placeholder="Enter CGPA"
                />
              </>
            )}
            {category === "skills" && (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Enter skill"
                />
              </>
            )}
            {category === "projects" && (
              <>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Enter project title"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Enter project description"
                />
                <input
                  type="file"
                  onChange={(e) => setEditData({ ...editData, image: e.target.files[0] })}
                />
              </>
            )}
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContentArea;

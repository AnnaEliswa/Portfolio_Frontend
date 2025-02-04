import { useState, useEffect } from "react";
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
highlights: "", // Add highlights here
image: null,
});
// Handle Adding a New Item
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
highlights: "", // Initialize highlights as well
image: null,
});
};

// Handle Editing an Item
const handleEdit = (item) => {
setEditMode("edit");
setEditData(item);
};

// Handle Delete Request
const handleDelete = async (id) => {
try {
await axios.delete(`http://localhost:8080/api/${category}/${id}`, { withCredentials: true });
alert("Item deleted successfully");
fetchData();
} catch (error) {
alert("Error deleting item");
}
};

// Handle Save Request
const handleSave = async () => {
try {
if (category === "projects") {
// Send project data including highlights
const formData = new FormData();
formData.append("title", editData.title);
formData.append("description", editData.description);
formData.append("highlights", editData.highlights); // Send highlights
if (editData.image) {
formData.append("image", editData.image);
}

if (editMode === "add") {
await axios.post(`http://localhost:8080/api/projects`, formData, { 
withCredentials: true, 
headers: { "Content-Type": "multipart/form-data" } 
});
} else if (editMode === "edit") {
await axios.put(`http://localhost:8080/api/projects/${editData.id}`, formData, { 
withCredentials: true, 
headers: { "Content-Type": "multipart/form-data" } 
});
}
} else {
if (editMode === "add") {
await axios.post(`http://localhost:8080/api/${category}`, editData, { withCredentials: true });
} else if (editMode === "edit") {
await axios.put(`http://localhost:8080/api/${category}/${editData.id}`, editData, { withCredentials: true });
}
}

alert("Data saved successfully");
fetchData();
setEditMode(null);
} catch (error) {
alert("Error saving data");
}
};

// Render Table-like Data
const renderContent = () => (
<div>
<h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
<button onClick={handleAdd}>Add {category}</button>
<table border="1">
<thead>
<tr>
{category === "users" && <th>Username</th>}
{category === "education" && <><th>Degree</th><th>Institution</th><th>Year</th><th>CGPA</th></>}
{category === "skills" && <th>Skill</th>}
{category === "projects" && <><th>Title</th><th>Description</th><th>Highlights</th><th>Image</th></>}
<th>Actions</th>
</tr>
</thead>
<tbody>
{data.map((item) => (
<tr key={item.id}>
{category === "users" && <td>{item.username}</td>}
{category === "education" && <>
<td>{item.degree}</td>
<td>{item.institution}</td>
<td>{item.year}</td>
<td>{item.cgpa}</td>
</>}
{category === "skills" && <td>{item.name}</td>}
{category === "projects" && <>
<td>{item.title}</td>
<td>{item.description}</td>
<td>{item.highlights}</td> {/* Display highlights under description */}
<td>
{item.image && <img src={`data:image/png;base64,${item.image}`} alt="Project" width="50" />}
</td>
</>}
<td>
<button onClick={() => handleEdit(item)}>Edit</button>
<button onClick={() => handleDelete(item.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);

return (
<div className="content-area">
{renderContent()}
{editMode && (
<div>
<h3>{editMode === "add" ? `Add ${category}` : `Edit ${category}`}</h3>
<form>
{category === "projects" && (
<>
<input type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Enter project title" />
<textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} placeholder="Enter project description" />
<textarea value={editData.highlights} onChange={(e) => setEditData({ ...editData, highlights: e.target.value })} placeholder="Enter project highlights" /> {/* Added highlights input */}
<input type="file" onChange={(e) => setEditData({ ...editData, image: e.target.files[0] })} />
</>
)}
<button type="button" onClick={handleSave}>Save</button>
</form>
</div>
)}
</div>
);
};

export default ContentArea;


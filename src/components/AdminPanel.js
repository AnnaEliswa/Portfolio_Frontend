import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState("users");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for auth cookie when the component mounts
  useEffect(() => {
    const authCookie = Cookies.get("auth");

    if (!authCookie || authCookie !== "true") {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data whenever category or authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, selectedCategory]);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8080/api/${selectedCategory}`;
      const response = await axios.get(url, { withCredentials: true });
      setData(response.data); 
      setError(""); 
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  // Handle form input change for add user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", formData, {
        withCredentials: true,
      });

      // Handle success
      alert("User added successfully");
      fetchData(); // Update the list of users
      setFormData({ email: "", password: "" }); // Reset form data
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  // Show a loading message or spinner if still checking authentication
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Once authenticated, render the actual admin panel
  return (
    <div className="admin-panel">
      {error && <div className="error-message">{error}</div>}
      <Sidebar onCategoryChange={setSelectedCategory} selectedCategory={selectedCategory} />
      <ContentArea category={selectedCategory} data={data} fetchData={fetchData} />

      {/* User Management Section */}
      {selectedCategory === "users" && (
        <div className="user-management">
          <h3>Add User</h3>
          <form onSubmit={handleAddUser}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Add User</button>
          </form>

          <h3>Existing Users</h3>
          <ul>
            {data.map((user) => (
              <li key={user.id}>
                {user.email} 
                {/* Add edit and delete buttons here */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

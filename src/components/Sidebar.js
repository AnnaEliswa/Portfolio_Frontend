import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./Sidebar.css";

const Sidebar = ({ onCategoryChange, selectedCategory }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth cookie
    Cookies.remove("auth");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <ul>
        {["users", "projects", "skills", "education", "logout"].map((category) => (
          <li
            key={category}
            onClick={() => {
              if (category === "logout") {
                handleLogout(); // Call handleLogout when "logout" is clicked
              } else {
                onCategoryChange(category); // Handle category change for other items
              }
            }}
            className={selectedCategory === category ? "active" : ""}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

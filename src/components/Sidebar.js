import "./Sidebar.css";

const Sidebar = ({ onCategoryChange, selectedCategory }) => {
  return (
    <div className="sidebar">
      <ul>
        {["users", "projects", "skills", "education"].map((category) => (
          <li 
            key={category}
            onClick={() => onCategoryChange(category)}
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

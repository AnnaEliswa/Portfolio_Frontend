import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; 
import './Login.css';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();  

    setError(""); // Clear previous error message

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login", 
        { email, password }, 
        { withCredentials: true }
      );

      console.log("Login Response:", response.data);  // Log the full response data

      if (response.status === 200 && response.data.authenticated) {
        // Set the auth cookie with path and expiration
      // Cookies.set("auth", "true", { expires: 1 });
        console.log("Cookies after setting:", document.cookie); // Log cookies after setting

        //Cookies.set("auth", "true", { expires: 1, path: "/", SameSite: "None", Secure: true });
        Cookies.set("auth", "true", { expires: 1, path: "/" }); // Use this during local development


        console.log("Cookie Set: auth = true");

        setAuthenticated(true);

        // Check if the state was set and then navigate
        console.log("State set to authenticated:", true);
        navigate("/admin");  // Redirect to admin page
      } else {
        setError("Invalid Credentials");
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>  
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}  
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { setCurrentUser } from "../../api/auth";
import "./css/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Endpoint updated to remove duplicate /api
      const { data } = await API.post("/auth/login", formData);

      if (data.success) {
        setCurrentUser(data.user);

        // Redirect based on role
        if (data.user.role === "admin") navigate("/admin");
        else if (data.user.role === "provider") navigate("/provider");
        else navigate("/user");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Could not connect to the server.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login to ServiceHub</h1>

        {error && <div className="error-message" role="alert">{error}</div>}

        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <label htmlFor="role">Select Portal Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="provider">Service Provider</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { setCurrentUser } from "../../api/auth";
import "./css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password, role });

      if (data.success) {
        setCurrentUser(data.user);
        alert(`Welcome back, ${data.user.name}!`);

        if (data.user.role === "admin") navigate("/admin");
        else if (data.user.role === "provider") navigate("/provider");
        else navigate("/user");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Could not connect to the server.";
      alert(message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login to ServiceHub</h1>
        <form onSubmit={handleLoginSubmit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>Select Portal Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="provider">Service Provider</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

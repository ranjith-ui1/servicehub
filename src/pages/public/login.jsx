import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });
      
      const resData = await response.json();
      
      if (resData.success) {
        localStorage.setItem("currentUser", JSON.stringify(resData.user));
        alert(`Welcome back, ${resData.user.name}!`);
        
        if (resData.user.role === "admin") navigate("/admin");
        else if (resData.user.role === "provider") navigate("/provider");
        else navigate("/user");
      } else {
        alert(resData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Authentication backend down:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login to ServiceHub</h1>
        <form onSubmit={handleLoginSubmit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Select Portal Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {/* <option value="" disabled>Select Role</option> */}
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
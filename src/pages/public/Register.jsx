import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });
      
      const resData = await response.json();
      
      if (resData.success) {
        alert("Registration successful! Proceeding to Login.");
        navigate("/login");
      } else {
        alert(resData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Authentication backend down:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h1>Create Account</h1>
        <form onSubmit={handleRegisterSubmit}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Select Your Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {/* <option value="" disabled>Select Role</option> */}
            <option value="user">User</option>
            <option value="provider">Service Provider</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
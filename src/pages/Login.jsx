import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required Field Validation
    if (email === "" || password === "") {
      setError("Please fill all fields.");
      return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    // Loading State
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Dummy Login
      if (
        email === "admin@servicehub.com" &&
        password === "Admin@123"
      ) {
        // Save Login Status
        localStorage.setItem("isLoggedIn", "true");

        setSuccess("Welcome to ServiceHub!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError("Invalid Email or Password.");
      }
    }, 2000);
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");

    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="login">

      <h1>ServiceHub Login</h1>

      <form onSubmit={handleLogin}>

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        {error && (
          <p className="error">{error}</p>
        )}

        {success && (
          <p className="success">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>

        <br />
        <br />

        <Link to="#">Forgot Password?</Link>

        <br />
        <br />

        <p>
          New User?{" "}
          <Link to="/register">
            Register Here
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>ServiceHub</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
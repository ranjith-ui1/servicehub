import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>ServiceHub</h2>

      <ul>
        <li>Home</li>
        <li>Services</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <button>Login</button>
    </nav>
  );
}

export default Navbar;
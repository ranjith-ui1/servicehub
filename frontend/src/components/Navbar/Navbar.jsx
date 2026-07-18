import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/" className="logo" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
        ServiceHub
      </Link>
      <div className="nav-links" style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff' }}>Home</Link>
        <Link to="/about" style={{ color: '#fff' }}>About</Link>
        <Link to="/services" style={{ color: '#fff' }}>Services</Link>
        <Link to="/contact" style={{ color: '#fff' }}>Contact</Link>
        
        {/* Conditional Role-Based Rendering */}
        {user?.role === "user" && (
          <Link to="/user" style={{ color: '#61dafb' }}>User Dashboard</Link>
        )}
        {user?.role === "provider" && (
          <Link to="/provider" style={{ color: '#4caf50' }}>Provider Dashboard</Link>
        )}
        {user?.role === "admin" && (
          <Link to="/admin" style={{ color: '#ff9800', fontWeight: 'bold' }}>Admin Panel</Link>
        )}
        
        {!user ? (
          <>
            <Link to="/login" style={{ color: '#fff' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>Register</Link>
          </>
        ) : (
          <button onClick={logout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>
            Logout ({user.role})
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
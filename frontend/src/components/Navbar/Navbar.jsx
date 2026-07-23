import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, clearCurrentUser } from "../../api/auth";

// --- SUB-COMPONENTS BY ROLE ---

function NavUser() {
  return (
    <>
      <Link to="/user" className="nav-link-accent">User Dashboard</Link>
    </>
  );
}

function NavProvider() {
  return (
    <>
      <Link to="/provider" className="nav-link-provider">Provider Dashboard</Link>
    </>
  );
}

function NavAdmin() {
  return (
    <>
      <Link to="/admin" className="nav-link-admin">Admin Panel</Link>
    </>
  );
}

function NavGuest() {
  return (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );
}

// --- MAIN NAVBAR ---

function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const logout = () => {
    clearCurrentUser();
    navigate("/login");
  };

  // Check if current user is an Admin or Provider
  const isDashboardRole = user?.role === "admin" || user?.role === "provider";

  // Determine logo redirect based on role
  const getLogoRedirect = () => {
    if (user?.role === "admin") return "/admin";
    if (user?.role === "provider") return "/provider";
    return "/";
  };

  return (
    <nav className="navbar">
      <Link to={getLogoRedirect()} className="logo">
        ServiceHub
      </Link>

      <div className="nav-links">
        {/* PUBLIC LINKS: Hidden for both Provider and Admin */}
        {!isDashboardRole && (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </>
        )}

        {/* ROLE-BASED NAV */}
        {user?.role === "user" && <NavUser />}
        {user?.role === "provider" && <NavProvider />}
        {user?.role === "admin" && <NavAdmin />}

        {/* AUTH ACTION */}
        {!user ? (
          <NavGuest />
        ) : (
          <button className="btn-danger" onClick={logout}>
            Logout ({user.role})
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
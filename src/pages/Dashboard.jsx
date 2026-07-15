import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logout Successful");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      <h1>ServiceHub Dashboard</h1>

      <p>
        Welcome to the ServiceHub Dashboard. Manage your profile,
        services, and account settings from here.
      </p>

      <div className="dashboard-links">

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Settings
        </NavLink>

      </div>

      <hr />

      {/* Nested Route Pages */}

      <Outlet />

      <br />

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default Dashboard;
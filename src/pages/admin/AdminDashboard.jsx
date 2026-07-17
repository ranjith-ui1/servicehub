import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>ServiceHub Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="admin-welcome">
        <h2>Welcome, Admin</h2>
        <p>Email: {currentUser?.email}</p>
      </div>
      <div className="admin-cards">
        <Link to="/admin/users">
          <div className="admin-card">
            <h2>Users</h2>
            <p>Manage ServiceHub users</p>
          </div>
        </Link>
        <Link to="/admin/providers">
          <div className="admin-card">
            <h2>Service Providers</h2>
            <p>Manage service providers</p>
          </div>
        </Link>
        <Link to="/admin/services">
          <div className="admin-card">
            <h2>Services</h2>
            <p>Manage available services</p>
          </div>
        </Link>
        <Link to="/admin/bookings">
          <div className="admin-card">
            <h2>Bookings</h2>
            <p>Manage service bookings</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
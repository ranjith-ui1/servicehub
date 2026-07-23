import { Link } from "react-router-dom";
import { getCurrentUser } from "../../api/auth";

function UserDashboard() {
  const user = getCurrentUser();

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <h2>Welcome, {user?.name}</h2>
      <div className="dashboard-cards">
        <Link to="/services">Browse Services</Link>
        <Link to="/user/bookings">My Bookings</Link>
        <Link to="/user/favorites">Favorites</Link>
        <Link to="/user/profile">My Profile</Link>
      </div>
    </div>
  );
}

export default UserDashboard;

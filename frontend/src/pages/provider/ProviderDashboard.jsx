import { Link } from "react-router-dom";

function ProviderDashboard() {
  return (
    <div className="dashboard">
      <h1>Service Provider Dashboard</h1>
      <div className="dashboard-cards">
        <Link to="/provider/profile">My Profile</Link>
        <Link to="/provider/services">My Services</Link>
        <Link to="/provider/requests">Service Requests</Link>
        <Link to="/provider/bookings">My Bookings</Link>
      </div>
    </div>
  );
}

export default ProviderDashboard;

import { useState, useEffect } from "react";
import API from "../../api/axios";
import { getCurrentUser } from "../../api/auth";

function ProviderBookings() {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [activeSchedules, setActiveSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeProvider = getCurrentUser() || { name: "" };

  const fetchProviderBookings = () => {
    if (!activeProvider.name) return setLoading(false);

    API.get(`/bookings/provider/${activeProvider.name}`)
      .then(({ data }) => {
        if (data.success) {
          setIncomingRequests(data.data.filter((b) => b.status === "Pending"));
          setActiveSchedules(data.data.filter((b) => b.status === "Approved"));
        }
      })
      .catch((err) => console.error("Error fetching provider bookings:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProviderBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProvider.name]);

  const handleStatusChange = async (bookingId, nextStatus) => {
    try {
      const { data } = await API.put(`/bookings/${bookingId}/status`, { status: nextStatus });
      if (data.success) {
        alert(`Job has been ${nextStatus.toLowerCase()}.`);
        fetchProviderBookings();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h3>Loading your schedule...</h3>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Provider Bookings</h1>
      <p>Welcome back, <strong>{activeProvider.name}</strong></p>
      <hr />

      <h2 className="section-title-warning">New Job Requests ({incomingRequests.length})</h2>
      <div className="service-cards">
        {incomingRequests.map((req) => (
          <div className="request-card pending" key={req._id}>
            <h3>{req.serviceName} Needed</h3>
            <p><strong>Location:</strong> {req.city}</p>
            <p><strong>Payout:</strong> ₹{req.price}</p>
            <div className="card-actions">
              <button className="btn-success btn-block" onClick={() => handleStatusChange(req._id, "Approved")}>Accept</button>
              <button className="btn-danger btn-block" onClick={() => handleStatusChange(req._id, "Rejected")}>Decline</button>
            </div>
          </div>
        ))}
        {incomingRequests.length === 0 && <p className="muted">No pending requests waiting for review.</p>}
      </div>

      <h2 className="section-title-success">My Active Schedules ({activeSchedules.length})</h2>
      <p className="muted">Your accepted and confirmed client jobs are listed below:</p>

      <div className="service-cards">
        {activeSchedules.map((job) => (
          <div className="request-card approved" key={job._id}>
            <h3>{job.serviceName} (Confirmed)</h3>
            <p><strong>Location:</strong> {job.city}</p>
            <p><strong>Payout:</strong> ₹{job.price}</p>
            <p><strong>Scheduled On:</strong> {new Date(job.updatedAt).toLocaleDateString()}</p>
            <button className="btn-secondary btn-block" onClick={() => handleStatusChange(job._id, "Cancelled")}>
              Cancel Appointment
            </button>
          </div>
        ))}
        {activeSchedules.length === 0 && <p className="muted">No approved bookings currently lined up.</p>}
      </div>
    </div>
  );
}

export default ProviderBookings;

import { useState, useEffect } from "react";
import API from "../../api/axios";
import { getCurrentUser } from "../../api/auth";

function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const activeProvider = getCurrentUser() || { name: "" };

  const fetchActiveRequests = () => {
    API.get(`/bookings/provider/${activeProvider.name}`)
      .then(({ data }) => {
        if (data.success) setRequests(data.data.filter((b) => b.status === "Pending"));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchActiveRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProvider.name]);

  const handleActionClick = async (bookingId, nextStatus) => {
    try {
      const { data } = await API.put(`/bookings/${bookingId}/status`, { status: nextStatus });
      if (data.success) {
        alert(data.message);
        fetchActiveRequests();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h1>Incoming Job Requests</h1>
      <div className="service-cards">
        {requests.map((req) => (
          <div className="booking-card" key={req._id}>
            <h3>Service Requested: {req.serviceName}</h3>
            <p><strong>Quoted Price:</strong> ₹{req.price}</p>
            <p><strong>City:</strong> {req.city}</p>
            <div className="card-actions">
              <button className="btn-success" onClick={() => handleActionClick(req._id, "Approved")}>Accept</button>
              <button className="btn-danger" onClick={() => handleActionClick(req._id, "Rejected")}>Decline</button>
            </div>
          </div>
        ))}
      </div>
      {requests.length === 0 && <p className="muted">No pending requests at this time.</p>}
    </div>
  );
}

export default ServiceRequests;

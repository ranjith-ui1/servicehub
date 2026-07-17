import React, { useState, useEffect } from "react";

function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const activeProvider = JSON.parse(localStorage.getItem("currentUser")) || { name: "" };

  const fetchActiveRequests = () => {
    fetch(`http://localhost:5000/api/bookings/provider/${activeProvider.name}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setRequests(resData.data.filter(b => b.status === "Pending"));
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchActiveRequests(); }, [activeProvider.name]);

  const handleActionClick = async (bookingId, nextStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchActiveRequests();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Incoming Contract Leads Matrix</h1>
      <div className="service-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "1rem" }}>
        {requests.map(req => (
          <div className="booking-card" key={req._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <h3>Service Ordered: {req.serviceName}</h3>
            <p><strong>Quoted Price Payout:</strong> ₹{req.price}</p>
            <p><strong>Operating City:</strong> {req.city}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={() => handleActionClick(req._id, "Approved")} style={{ background: '#10b981', color: 'white', border: "none", padding: "8px", cursor: "pointer", width: "100%", borderRadius: "4px" }}>Accept Contract</button>
              <button onClick={() => handleActionClick(req._id, "Rejected")} style={{ background: '#ef4444', color: 'white', border: "none", padding: "8px", cursor: "pointer", width: "100%", borderRadius: "4px" }}>Decline Request</button>
            </div>
          </div>
        ))}
      </div>
      {requests.length === 0 && <p style={{ marginTop: "1rem", color: "#666" }}>No current pending requests at this time.</p>}
    </div>
  );
}

export default ServiceRequests;
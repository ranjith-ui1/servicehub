import React, { useState, useEffect } from "react";

function ProviderDashboard() {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [activeSchedules, setActiveSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get the logged-in provider profile from storage session
  const activeProvider = JSON.parse(localStorage.getItem("currentUser")) || { name: "" };

  const fetchProviderBookings = () => {
    if (!activeProvider.name) return;

    // Fetch all bookings assigned to this provider's name from MongoDB
    fetch(`http://localhost:5000/api/bookings/provider/${activeProvider.name}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          // 1. Filter pending items for the request column
          setIncomingRequests(resData.data.filter(b => b.status === "Pending"));
          
          // 2. Filter approved items for the active schedules column
          setActiveSchedules(resData.data.filter(b => b.status === "Approved"));
        }
      })
      .catch((err) => console.error("Error fetching provider jobs:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProviderBookings();
  }, [activeProvider.name]);

  const handleStatusChange = async (bookingId, nextStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Job has been successfully ${nextStatus}!`);
        fetchProviderBookings(); // Refresh both lists instantly
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) return <div className="page-container" style={{ padding: "2rem" }}><h3>Updating schedule from Atlas...</h3></div>;

  return (
    <div className="page-container" style={{ padding: "2rem" }}>
      <h1>Provider Portal Dashboard</h1>
      <p>Welcome back, <strong>{activeProvider.name}</strong></p>
      
      <hr style={{ margin: "2rem 0", borderColor: "#eee" }} />

      {/* SECTION 1: INCOMING PENDING REQUESTS */}
      <h2 style={{ color: "#f59e0b" }}>New Job Requests ({incomingRequests.length})</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "3rem" }}>
        {incomingRequests.map(req => (
          <div key={req._id} style={{ border: "1px solid #f59e0b", padding: "15px", borderRadius: "8px", background: "#fffdf9" }}>
            <h3>{req.serviceName} Needed</h3>
            <p><strong>Location:</strong> {req.city}</p>
            <p><strong>Payout rate:</strong> ₹{req.price}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button onClick={() => handleStatusChange(req._id, "Approved")} style={{ background: "#10b981", color: "white", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer", width: "100%" }}>Accept</button>
              <button onClick={() => handleStatusChange(req._id, "Rejected")} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer", width: "100%" }}>Decline</button>
            </div>
          </div>
        ))}
        {incomingRequests.length === 0 && <p style={{ color: "#666" }}>No pending requests waiting for review.</p>}
      </div>

      {/* SECTION 2: ACTIVE CONFIRMED JOBS */}
      <h2 style={{ color: "#10b981" }}>My Active Schedules ({activeSchedules.length})</h2>
      <p style={{ color: "#666" }}>Your accepted and confirmed client jobs are listed below:</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "1rem" }}>
        {activeSchedules.map(job => (
          <div key={job._id} style={{ border: "1px solid #10b981", padding: "15px", borderRadius: "8px", background: "#f0fdf4" }}>
            <h3 style={{ color: "#166534" }}>{job.serviceName} (Confirmed)</h3>
            <p><strong>Location Hub:</strong> {job.city}</p>
            <p><strong>Contract Payout:</strong> ₹{job.price}</p>
            <p><strong>Scheduled On:</strong> {new Date(job.updatedAt).toLocaleDateString()}</p>
            <button onClick={() => handleStatusChange(job._id, "Cancelled")} style={{ background: "#64748b", color: "white", border: "none", width: "100%", padding: "6px", marginTop: "15px", borderRadius: "4px", cursor: "pointer" }}>
              Cancel Appointment
            </button>
          </div>
        ))}
        {activeSchedules.length === 0 && (
          <p style={{ color: "#666", italic: "true" }}>No approved bookings currently lined up.</p>
        )}
      </div>
    </div>
  );
}

export default ProviderDashboard;
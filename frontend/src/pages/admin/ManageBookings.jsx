import React, { useState, useEffect } from "react";

function ManageBookings() {
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync total transactional booking records from MongoDB Atlas
  const syncAdminBookings = () => {
    fetch("http://localhost:5000/api/bookings/admin/all")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setAllBookings(resData.data);
        }
      })
      .catch((err) => console.error("Database connection failed:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    syncAdminBookings();
  }, []);

  // Global Administrative Override: Delete/Remove an accidental booking entry
  const handlePurgeBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to permanently delete this booking record from the system?")) {
      try {
        // Re-using the cancel status workflow via the backend update endpoint
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancelled" })
        });
        const data = await response.json();
        if (data.success) {
          alert("Booking status set to Cancelled successfully.");
          syncAdminBookings(); // Refresh the list
        }
      } catch (err) {
        console.error("Failed to alter booking document:", err);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "#10b981"; // Green
      case "Rejected":
      case "Cancelled": return "#ef4444"; // Red
      default: return "#f59e0b"; // Orange (Pending)
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ padding: "2rem" }}>
        <h3>Fetching system transaction logs from Atlas...</h3>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: "2rem" }}>
      <h1>Global Bookings Administration</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Monitor, track, and manage all service transactions across the entire application platform.
      </p>

      {allBookings.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>No service bookings have been created on the network yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ padding: "12px" }}>Customer Name</th>
              <th style={{ padding: "12px" }}>Service Type</th>
              <th style={{ padding: "12px" }}>Provider</th>
              <th style={{ padding: "12px" }}>City</th>
              <th style={{ padding: "12px" }}>Price</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr key={booking._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                {/* Populated from the backend customer ref link, falls back nicely if unpopulated */}
                <td style={{ padding: "12px" }}>{booking.customer?.name || "Anonymous User"}</td>
                <td style={{ padding: "12px", fontWeight: "600" }}>{booking.serviceName}</td>
                <td style={{ padding: "12px" }}>{booking.providerName}</td>
                <td style={{ padding: "12px" }}>{booking.city}</td>
                <td style={{ padding: "12px" }}>₹{booking.price}</td>
                <td style={{ padding: "12px", fontWeight: "bold", color: getStatusColor(booking.status) }}>
                  {booking.status}
                </td>
                <td style={{ padding: "12px" }}>
                  {booking.status !== "Cancelled" && (
                    <button 
                      onClick={() => handlePurgeBooking(booking._id)}
                      style={{ background: "#ef4444", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      Cancel Job
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageBookings;
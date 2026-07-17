import React, { useState, useEffect } from "react";

function MyBookings() {
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get the logged-in user profile metadata session
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const fetchUserBookings = () => {
    if (!currentUser || !currentUser.id) return;

    // Hit the transaction router endpoint for this specific user ID
    fetch(`http://localhost:5000/api/bookings/user/${currentUser.id}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setBookingsList(resData.data);
        }
      })
      .catch((err) => console.error("Could not fetch user appointments:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  // Simple function to style statuses dynamically
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return { color: "#10b981", fontWeight: "bold" }; // Green
      case "Rejected": 
      case "Cancelled": return { color: "#ef4444", fontWeight: "bold" }; // Red
      default: return { color: "#f59e0b", fontWeight: "bold" }; // Orange (Pending)
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ padding: "2rem" }}>
        <h3>Loading your booking status updates from Atlas...</h3>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: "2rem" }}>
      <h1>My Booked Appointments</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>Track the progress of your scheduled service requests below.</p>
      
      {bookingsList.length === 0 ? (
        <div style={{ padding: "2rem", border: "1px dashed #ccc", textAlign: "center", borderRadius: "8px" }}>
          <p>You haven't placed any service requests yet.</p>
        </div>
      ) : (
        <div className="bookings-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {bookingsList.map((booking) => (
            <div className="booking-card" key={booking._id} style={{ border: "1px solid #ddd", padding: "1.5rem", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#2563eb" }}>{booking.serviceName}</h3>
              <p><strong>Provider Professional:</strong> {booking.providerName}</p>
              <p><strong>Service Location Hub:</strong> {booking.city}</p>
              <p><strong>Rate Charged:</strong> ₹{booking.price}</p>
              <p><strong>Booking Timestamp:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
              
              <hr style={{ borderColor: "#f3f4f6", margin: "12px 0" }} />
              
              <p style={{ fontSize: "1.1rem", margin: "0" }}>
                Current Status: <span style={getStatusStyle(booking.status)}>{booking.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
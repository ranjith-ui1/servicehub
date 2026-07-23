import { useState, useEffect } from "react";
import API from "../../api/axios";

const statusColor = (status) => {
  if (status === "Approved") return "status-approved";
  if (status === "Rejected" || status === "Cancelled") return "status-rejected";
  return "status-pending";
};

function ManageBookings() {
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const syncBookings = () => {
    API.get("/bookings/admin/all")
      .then(({ data }) => {
        if (data.success) setAllBookings(data.data);
      })
      .catch((err) => console.error("Fetch failed:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    syncBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      const { data } = await API.put(`/bookings/${id}/status`, { status: "Cancelled" });
      if (data.success) {
        alert("Booking cancelled.");
        syncBookings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h3>Loading bookings...</h3>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Global Bookings Administration</h1>
      <p className="muted">Monitor, track, and manage all service transactions across the platform.</p>

      {allBookings.length === 0 ? (
        <p className="muted">No service bookings have been created yet.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Provider</th>
              <th>City</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.customer?.name || "Anonymous User"}</td>
                <td>{booking.serviceName}</td>
                <td>{booking.providerName}</td>
                <td>{booking.city}</td>
                <td>₹{booking.price}</td>
                <td className={statusColor(booking.status)}>{booking.status}</td>
                <td>
                  {booking.status !== "Cancelled" && (
                    <button className="btn-danger" onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
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

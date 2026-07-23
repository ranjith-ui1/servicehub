import { useState, useEffect } from "react";
import API from "../../api/axios";
import { getCurrentUser } from "../../api/auth";

const statusClass = (status) => {
  if (status === "Approved") return "status-approved";
  if (status === "Rejected" || status === "Cancelled") return "status-rejected";
  return "status-pending";
};

function MyBookings() {
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  const fetchUserBookings = () => {
    if (!currentUser?.id) return setLoading(false);

    API.get(`/bookings/user/${currentUser.id}`)
      .then(({ data }) => {
        if (data.success) setBookingsList(data.data);
      })
      .catch((err) => console.error("Could not fetch bookings:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUserBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h3>Loading your bookings...</h3>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>My Booked Appointments</h1>
      <p className="muted">Track the progress of your scheduled service requests below.</p>

      {bookingsList.length === 0 ? (
        <div className="empty-state">
          <p>You haven't placed any service requests yet.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookingsList.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.serviceName}</h3>
              <p><strong>Provider:</strong> {booking.providerName}</p>
              <p><strong>Location:</strong> {booking.city}</p>
              <p><strong>Rate:</strong> ₹{booking.price}</p>
              <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
              <hr />
              <p>Status: <span className={statusClass(booking.status)}>{booking.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;

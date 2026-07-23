import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { getCurrentUser } from "../../api/auth";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = getCurrentUser();

  useEffect(() => {
    API.get(`/services/${id}`)
      .then(({ data }) => {
        if (data.success) setService(data.data);
      })
      .catch((err) => console.error("Error fetching service:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCreateBooking = async () => {
    if (!currentUser) {
      alert("Please log in to submit a service request booking.");
      return navigate("/login");
    }

    try {
      const { data } = await API.post("/bookings", {
        customerId: currentUser.id,
        serviceId: service._id,
      });

      if (data.success) {
        alert("Booking request submitted successfully to the provider!");
        navigate("/user/bookings");
      } else {
        alert(data.message || "Failed to submit booking.");
      }
    } catch (err) {
      console.error("Booking request failed:", err);
      alert(err.response?.data?.message || "Could not submit the booking.");
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading service details...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="page-container">
        <h2>Service listing not found.</h2>
      </div>
    );
  }

  return (
    <div className="page-container narrow">
      <div className="detail-card">
        <h1>{service.service} Specialists</h1>
        <hr />
        <p><strong>Professional Provider:</strong> {service.provider}</p>
        <p><strong>Location:</strong> {service.city}</p>
        <p><strong>Experience:</strong> {service.experience}</p>
        <p><strong>Contact:</strong> {service.phone}</p>
        <p><strong>Current Status:</strong> {service.status}</p>
        <h3 className="price-line">Pricing Rate: ₹{service.price}</h3>

        {currentUser?.role === "user" && (
          <button className="btn-block btn-success" onClick={handleCreateBooking}>
            Book Appointment Now
          </button>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;

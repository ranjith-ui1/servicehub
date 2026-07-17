import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ServiceDetail() {
  const { id } = useParams(); // Retrieves the Mongo _id value directly from the URL route
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Access the logged-in individual profile from storage session
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    // Call the specific item dynamic query endpoint from your Express Router[cite: 2]
    fetch(`http://localhost:5000/api/services/${id}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setService(resData.data);
        }
      })
      .catch((err) => console.error("Error communicating with Atlas:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCreateBooking = async () => {
    if (!currentUser) {
      alert("Please log in to submit a service request booking.");
      return navigate("/login");
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: currentUser.id, // Maps to the MongoDB user reference field
          serviceId: service._id       // Maps to the target service database key
        })
      });

      const resultData = await response.json();

      if (resultData.success) {
        alert("Booking request submitted successfully to the provider!");
        navigate("/user/bookings"); // Send customer straight to their transaction records view
      } else {
        alert(resultData.message || "Failed to finalize structural booking.");
      }
    } catch (err) {
      console.error("Booking generation connection error:", err);
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ padding: "2rem" }}>
        <h2>Retrieving profile info from Atlas cluster...</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="page-container" style={{ padding: "2rem" }}>
        <h2>Service listing not found in the database.</h2>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: "3rem", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ border: "1px solid #ccc", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <h1>{service.service} Specialists</h1>
        <hr style={{ margin: "1rem 0", borderColor: "#eee" }} />
        <p><strong>Professional Provider:</strong> {service.provider}</p>
        <p><strong>Service Location Hub:</strong> {service.city}</p>
        <p><strong>Expert Experience Level:</strong> {service.experience}</p>
        <p><strong>Contact Hotline:</strong> {service.phone}</p>
        <p><strong>Current Operational Status:</strong> {service.status}</p>
        <h3 style={{ color: "#10b981", margin: "1.5rem 0" }}>Pricing Rate: ₹{service.price}</h3>
        
        {currentUser?.role === "user" && (
          <button onClick={handleCreateBooking} style={{ width: "100%", padding: "12px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "1rem", fontWeight: "bold" }}>
            Book Appointment Now
          </button>
        )}
      </div>
    </div>
  );
}

export default ServiceDetail;
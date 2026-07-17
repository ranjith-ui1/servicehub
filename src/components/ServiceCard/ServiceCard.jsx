import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div className="service-card" style={{ border: "1px solid #ddd", padding: "1.5rem", borderRadius: "8px", margin: "10px" }}>
      <h3>{service.service}</h3>
      <p><strong>Provider:</strong> {service.provider}</p>
      <p><strong>Location:</strong> {service.city}</p>
      <p><strong>Price:</strong> ₹{service.price}</p>
      {/* Target the MongoDB unique identifier string */}
      <Link to={`/services/${service._id}`} className="details-btn" style={{ display: "inline-block", marginTop: "10px", background: "#2563eb", color: "#fff", padding: "8px 12px", borderRadius: "4px", textDecoration: "none" }}>
        View Details
      </Link>
    </div>
  );
}

export default ServiceCard;
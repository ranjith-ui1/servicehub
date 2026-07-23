import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ item, isLoggedIn }) {
  // GUEST VIEW: item is a string category name (e.g., "Electrician")
  if (!isLoggedIn) {
    const categoryName = typeof item === "string" ? item : item?.service || "Service";
    return (
      <div className="card guest-card">
        <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>🔧</div>
        <h3>{categoryName}</h3>
        <p className="muted">Log in to view worker details, ratings & contact info.</p>
      </div>
    );
  }

  // LOGGED-IN VIEW: item is a full MongoDB object from /api/services
  return (
    <div className="card provider-card">
      <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="badge-service" style={{ background: "#e0f2fe", color: "#0369a1", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
          {item.service}
        </span>
        <span className="rating" style={{ color: "#eab308", fontWeight: "bold" }}>
          ★ {item.rating ? item.rating : "New"}
        </span>
      </div>

      <div className="card-body" style={{ marginTop: "12px" }}>
        <h3 style={{ margin: "4px 0" }}>{item.provider || "Service Provider"}</h3>
        <p className="muted" style={{ margin: "2px 0 10px 0", fontSize: "0.9rem" }}>
          📍 {item.city || "Available locally"}
        </p>

        <div className="details-list" style={{ borderTop: "1px solid #eee", paddingTop: "8px" }}>
          <p style={{ margin: "4px 0" }}><strong>Rate:</strong> ₹{item.price || "N/A"}/hr</p>
          <p style={{ margin: "4px 0" }}><strong>Contact:</strong> {item.phone || "N/A"}</p>
        </div>
      </div>

      {/* BOOKING ACTION */}
      <div className="card-footer" style={{ marginTop: "16px" }}>
        <Link 
          to={`/services/${item._id}`} 
          className="btn-primary"
          style={{
            display: "block",
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#0284c7",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
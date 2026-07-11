import { useParams, useNavigate } from "react-router-dom";
import services from "../data/services.js";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = services.find((item) => item.id === Number(id));

  if (!service) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Service Not Found</h2>

        <button onClick={() => navigate("/services")}>
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        padding: "20px",
        boxShadow: "0 0 10px gray",
        borderRadius: "10px",
      }}
    >
      <h1 style={{ color: "#2563EB" }}>
        Service Details
      </h1>

      <hr />

      <p>
        <strong>ID :</strong> {service.id}
      </p>

      <p>
        <strong>Provider :</strong> {service.provider}
      </p>

      <p>
        <strong>Service :</strong> {service.service}
      </p>

      <p>
        <strong>City :</strong> {service.city}
      </p>

      <p>
        <strong>Experience :</strong> {service.experience}
      </p>

      <p>
        <strong>Phone :</strong> {service.phone}
      </p>

      <p>
        <strong>Price :</strong> ₹{service.price}
      </p>

      <p>
        <strong>Rating :</strong> ⭐ {service.rating}
      </p>

      <p>
        <strong>Status :</strong> {service.status}
      </p>

      <br />

      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Back
      </button>

      <button
        onClick={() => alert("Service Booked Successfully")}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Book Service
      </button>
    </div>
  );
}

export default ServiceDetails;
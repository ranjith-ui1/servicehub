import "./ServiceCard.css";
function ServiceCard({ service }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
        width: "300px",
      }}
    >
      <h2>{service.provider}</h2>

      <p>
        <strong>Service:</strong> {service.service}
      </p>

      <p>
        <strong>City:</strong> {service.city}
      </p>

      <p>
        <strong>Price:</strong> ₹{service.price}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {service.rating}
      </p>

      <p>
        <strong>Experience:</strong> {service.experience}
      </p>

      <p>
        <strong>Phone:</strong> {service.phone}
      </p>

      <p>
        <strong>Status:</strong> {service.status}
      </p>
    </div>
  );
}

export default ServiceCard;
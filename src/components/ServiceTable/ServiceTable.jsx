import { Link } from "react-router-dom";
import "./ServiceCard.css";

function ServiceCard({ service }) {
  return (
    <div className="service-card">

      <h2>{service.provider}</h2>

      <p><b>Service:</b> {service.service}</p>

      <p><b>City:</b> {service.city}</p>

      <p><b>Price:</b> ₹{service.price}</p>

      <p><b>Rating:</b> ⭐ {service.rating}</p>

      <p><b>Experience:</b> {service.experience}</p>

      <p><b>Phone:</b> {service.phone}</p>

      <p><b>Status:</b> {service.status}</p>

      <Link to={`/service/${service.id}`}>
        <button>View Details</button>
      </Link>

    </div>
  );
}

export default ServiceCard;
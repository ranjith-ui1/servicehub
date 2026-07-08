import "./ServiceCard.css";

function ServiceCard({ title, rating, price }) {
  return (
    <div className="service-card">

      <h3>{title}</h3>

      <p>⭐ {rating}</p>

      <p>{price}</p>

      <button>Book Now</button>

    </div>
  );
}

export default ServiceCard;
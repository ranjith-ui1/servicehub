import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [savedFavorites, setSavedFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("favorites")) || [];
    setSavedFavorites(items);
  }, []);

  const handleRemove = (id) => {
    const currentFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const freshList = currentFavs.filter((item) => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(freshList));
    setSavedFavorites(freshList);
  };

  return (
    <div className="page-container">
      <h1>My Preferred Professionals</h1>
      {savedFavorites.length === 0 ? (
        <p className="muted">No service providers added to favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {savedFavorites.map((fav) => (
            <div className="booking-card" key={fav.id}>
              <h3>{fav.provider}</h3>
              <p className="muted">{fav.service} • {fav.city}</p>
              <div className="card-actions">
                <button className="btn-info" onClick={() => navigate(`/services/${fav.id}`)}>Open Details</button>
                <button className="btn-danger" onClick={() => handleRemove(fav.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

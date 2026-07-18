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
    const freshList = currentFavs.filter(item => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(freshList));
    setSavedFavorites(freshList);
  };

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>My Preferred Professionals</h1>
      {savedFavorites.length === 0 ? (
        <p style={{ color: '#777', marginTop: '1rem' }}>No service providers added to favorites yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginTop: '1rem' }}>
          {savedFavorites.map((fav) => (
            <div className="booking-card" key={fav.id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '6px', background: '#fff' }}>
              <h3 style={{ margin: '0' }}>{fav.provider}</h3>
              <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>{fav.service} • {fav.city}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => navigate(`/services/${fav.id}`)} style={{ background: '#3498db', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '3px' }}>
                  Open Details
                </button>
                <button onClick={() => handleRemove(fav.id)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '3px' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
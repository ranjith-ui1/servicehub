import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  // Remove Favorite
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (service) => service.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // Clear All Favorites
  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Favorite Service Providers
      </h1>

      {favorites.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: "red",
          }}
        >
          No Favorites Added
        </h2>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={clearFavorites}
              style={{
                padding: "10px 20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Clear All Favorites
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "20px",
            }}
          >
            {favorites.map((service) => (
              <div
                key={service.id}
                style={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <img
                  src={service.image}
                  alt={service.firstName}
                  width="120"
                  style={{
                    borderRadius: "50%",
                  }}
                />

                <h2>
                  {service.firstName} {service.lastName}
                </h2>

                <p>
                  <strong>Department:</strong>{" "}
                  {service.company.department}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {service.address.city}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {service.email}
                </p>

                <div
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <Link to={`/services/${service.id}`}>
                    <button
                      style={{
                        padding: "8px 15px",
                        marginRight: "10px",
                      }}
                    >
                      View Details
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      removeFavorite(service.id)
                    }
                    style={{
                      padding: "8px 15px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
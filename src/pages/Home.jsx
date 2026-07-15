import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1 style={{ color: "#2563EB" }}>
        Welcome to ServiceHub
      </h1>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        ServiceHub is an online platform that helps users find trusted
        service providers for home and professional services.
      </p>

      <br />

      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="ServiceHub"
        width="220"
      />

      <br />
      <br />

      <h2>Our Popular Services</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "180px",
            borderRadius: "10px",
          }}
        >
          <h3>⚡ Electrician</h3>
          <p>Home Electrical Repairs</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "180px",
            borderRadius: "10px",
          }}
        >
          <h3>🚰 Plumber</h3>
          <p>Water Pipe & Tap Repairs</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "180px",
            borderRadius: "10px",
          }}
        >
          <h3>🧹 Cleaning</h3>
          <p>Professional Home Cleaning</p>
        </div>

        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "180px",
            borderRadius: "10px",
          }}
        >
          <h3>❄ AC Repair</h3>
          <p>Installation & Maintenance</p>
        </div>
      </div>

      <br />

      <Link to="/services">
        <button
          style={{
            padding: "12px 20px",
            marginRight: "10px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          View Services
        </button>
      </Link>

      <Link to="/register">
        <button
          style={{
            padding: "12px 20px",
            marginRight: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Register
        </button>
      </Link>

      <Link to="/login">
        <button
          style={{
            padding: "12px 20px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
      </Link>
    </div>
  );
}

export default Home;
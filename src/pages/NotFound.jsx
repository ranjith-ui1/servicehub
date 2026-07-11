import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          color: "#2563EB",
        }}
      >
        404
      </h1>

      <h2>Oops! Page Not Found</h2>

      <p>
        The page you are looking for does not exist in ServiceHub.
      </p>

      <br />

      <Link to="/">
        <button
          style={{
            padding: "12px 25px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Return to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
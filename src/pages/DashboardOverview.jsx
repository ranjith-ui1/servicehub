import services from "../data/services.js";

function DashboardOverview() {
  // Dashboard Statistics
  const totalServices = services.length;

  const availableServices = services.filter(
    (service) => service.status === "Available"
  ).length;

  const busyServices = services.filter(
    (service) => service.status === "Busy"
  ).length;

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h2
        style={{
          color: "#2563EB",
          marginBottom: "20px",
        }}
      >
        Dashboard Overview
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Total Services */}

        <div
          style={{
            width: "220px",
            padding: "20px",
            backgroundColor: "#2563EB",
            color: "white",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Total Services</h3>
          <h1>{totalServices}</h1>
        </div>

        {/* Available */}

        <div
          style={{
            width: "220px",
            padding: "20px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Available</h3>
          <h1>{availableServices}</h1>
        </div>

        {/* Busy */}

        <div
          style={{
            width: "220px",
            padding: "20px",
            backgroundColor: "orange",
            color: "white",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h3>Busy Providers</h3>
          <h1>{busyServices}</h1>
        </div>
      </div>

      <br />

      <h3>ServiceHub Features</h3>

      <ul
        style={{
          textAlign: "left",
          maxWidth: "500px",
          margin: "20px auto",
          lineHeight: "2",
        }}
      >
        <li>✔ Search Trusted Service Providers</li>
        <li>✔ View Service Details</li>
        <li>✔ Register New Users</li>
        <li>✔ Secure Login System</li>
        <li>✔ Dynamic Dashboard</li>
        <li>✔ React Router Navigation</li>
        <li>✔ Professional User Interface</li>
      </ul>
    </div>
  );
}

export default DashboardOverview;
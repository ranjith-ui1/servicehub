import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { isLoggedIn as checkLoggedIn } from "../../api/auth";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

function Services() {
  const [search, setSearch] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = checkLoggedIn();

  useEffect(() => {
    API.get("/services")
      .then(({ data }) => {
        if (data.success) setServicesList(data.data);
      })
      .catch((err) => console.error("Database fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: "center" }}>
        <h3>Loading services...</h3>
      </div>
    );
  }

  // Guests only see unique service categories (e.g. Electrician, Plumber)
  const uniqueServices = [...new Set(servicesList.map((item) => item.service).filter(Boolean))];

  // Logged-in users can search across the full worker list
  const filteredServices = servicesList.filter((item) => {
    const haystack = `${item.provider || ""} ${item.service || ""} ${item.city || ""}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return (
    <div className="page-container">
      <div className="section-header">
        <h1>{isLoggedIn ? "Available On-Demand Service Workers" : "Services Available On Our Platform"}</h1>
        <p>
          {isLoggedIn
            ? "Browse service providers, view rates, phone numbers, and book workers directly."
            : "Explore the categories of work offered across cities. Please log in to view worker contact details, ratings, and rates."}
        </p>
      </div>

      {isLoggedIn && (
        <input
          className="search-box"
          type="text"
          placeholder="Search by provider, service, or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      <div className="service-cards">
        {!isLoggedIn
          ? uniqueServices.map((workName, idx) => <ServiceCard key={idx} item={workName} isLoggedIn={false} />)
          : filteredServices.map((service) => <ServiceCard key={service._id} item={service} isLoggedIn={true} />)}
      </div>

      {!isLoggedIn && (
        <div className="cta-banner">
          <h2>Need to book a service?</h2>
          <p>Log in or register to connect directly with service providers.</p>
          <div className="cta-actions">
            <Link to="/login" className="btn-primary">Log In</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;

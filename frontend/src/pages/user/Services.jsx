import { useState, useEffect } from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

function Services() {
  const [search, setSearch] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setServicesList(resData.data); // Pull array from MongoDB payload structure
        }
      })
      .catch((err) => console.error("Database fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredServices = servicesList.filter((item) => {
    return `${item.provider} ${item.service} ${item.city}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  if (loading) return <div className="page-container"><h3>Loading matching services from Atlas...</h3></div>;

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Available On-Demand Services</h1>
      <input
        className="search-box"
        type="text"
        placeholder="Search by provider, service, or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="service-cards">
        {filteredServices.map((service) => (
          // MongoDB uses _id instead of id
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default Services;
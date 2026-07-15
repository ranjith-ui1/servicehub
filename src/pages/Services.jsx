import { useState } from "react";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import services from "../data/services";
import "./Services.css";

function Services() {
  const [search, setSearch] = useState("");

  const filteredServices = services.filter(
    (item) =>
      item.provider.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="services-container">

      <h1>ServiceHub Services</h1>

      <input
        type="text"
        placeholder="Search by Provider, Service"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <h2>Service Provider Cards</h2>

      <div className="service-cards">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}
      </div>

    </div>
  );
}

export default Services;
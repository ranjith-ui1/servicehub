import { useState } from "react";
import { Link } from "react-router-dom";
import services from "../data/services.js";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import ServiceTable from "../components/ServiceTable/ServiceTable";


function Services() {
  const [search, setSearch] = useState("");

  // Search Functionality
  const filteredServices = services.filter(
    (service) =>
      service.provider.toLowerCase().includes(search.toLowerCase()) ||
      service.service.toLowerCase().includes(search.toLowerCase()) ||
      service.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="services">

      <h1>ServiceHub Services</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Provider, Service or City"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {/* Empty State */}
      {filteredServices.length === 0 ? (
        <h2>No Service Providers Available</h2>
      ) : (
        <>
          {/* Dynamic Cards */}
          <h2>Service Provider Cards</h2>

          <div className="cards">
            {filteredServices.map((service) => (
              <div key={service.id}>
                <ServiceCard service={service} />

                <br />

                <Link to={`/services/${service.id}`}>
                  <button>View Details</button>
                </Link>

                <br />
                <br />
              </div>
            ))}
          </div>

          <hr />

          {/* Dynamic Table */}
          <h2>Service Provider Table</h2>

          <ServiceTable services={filteredServices} />
        </>
      )}

    </div>
  );
}

export default Services;


function ServiceTable({ services }) {
  return (
    <div className="table-container">
      <h2>Registered Service Providers</h2>

      <table className="service-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Provider</th>
            <th>Service</th>
            <th>City</th>
            <th>Price (₹)</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.provider}</td>
              <td>{service.service}</td>
              <td>{service.city}</td>
              <td>{service.price}</td>
              <td>⭐ {service.rating}</td>
              <td>
                {service.rating >= 4.8 ? (
                  <span className="active">Available</span>
                ) : (
                  <span className="busy">Busy</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
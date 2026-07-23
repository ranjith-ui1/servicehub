import { useState, useEffect } from "react";
import API from "../../api/axios";

function ManageProviders() {
  const [providers, setProviders] = useState([]);

  const syncProviders = () => {
    API.get("/auth/users")
      .then(({ data }) => {
        if (data.success) setProviders(data.data.filter((u) => u.role === "provider"));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    syncProviders();
  }, []);

  const handleToggleApproval = async (id) => {
    const { data } = await API.put(`/auth/providers/${id}/approve`);
    if (data.success) {
      alert(data.message);
      syncProviders();
    }
  };

  return (
    <div className="page-container">
      <h1>Manage Provider Approvals</h1>
      <div className="service-cards">
        {providers.map((p) => (
          <div className="booking-card" key={p._id}>
            <h3>{p.name}</h3>
            <p><strong>Email:</strong> {p.email}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={p.isApproved ? "status-approved" : "status-pending"}>
                {p.isApproved ? "Approved" : "Pending"}
              </span>
            </p>
            <button className="btn-block" onClick={() => handleToggleApproval(p._id)}>
              {p.isApproved ? "Revoke Approval" : "Grant Approval"}
            </button>
          </div>
        ))}
      </div>
      {providers.length === 0 && <p className="muted">No service providers listed.</p>}
    </div>
  );
}

export default ManageProviders;

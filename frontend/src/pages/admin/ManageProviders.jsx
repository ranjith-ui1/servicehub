import React, { useState, useEffect } from "react";

function ManageProviders() {
  const [providers, setProviders] = useState([]);

  const syncProviders = () => {
    fetch("http://localhost:5000/api/auth/users")
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setProviders(resData.data.filter(u => u.role === "provider"));
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { syncProviders(); }, []);

  const handleToggleVerification = async (mongoId) => {
    const res = await fetch(`http://localhost:5000/api/auth/providers/${mongoId}/approve`, { method: "PUT" });
    const data = await res.json();
    if (data.success) {
      alert(data.message);
      syncProviders();
    }
  };

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Manage Professional Verification Registry</h1>
      <div className="service-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "1rem" }}>
        {providers.map(p => (
          <div className="booking-card" key={p._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <h3>{p.name}</h3>
            <p><strong>Email:</strong> {p.email}</p>
            <p><strong>Status:</strong> <span style={{ color: p.isApproved ? 'green' : 'orange', fontWeight: 'bold' }}>{p.isApproved ? "Approved" : "Pending"}</span></p>
            <button onClick={() => handleToggleVerification(p._id)} style={{ background: p.isApproved ? '#64748b' : '#10b981', color: 'white', width: "100%", padding: "8px", border: "none", marginTop: "10px", cursor: "pointer", borderRadius: "4px" }}>
              {p.isApproved ? "Revoke Approval" : "Grant Approval Status"}
            </button>
          </div>
        ))}
      </div>
      {providers.length === 0 && <p>No service providers listed.</p>}
    </div>
  );
}

export default ManageProviders;
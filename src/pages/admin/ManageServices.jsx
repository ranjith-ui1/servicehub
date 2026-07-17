import { useState, useEffect } from "react";

function ManageServices() {
  const [allServices, setAllServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: "", experience: "" });

  const syncAdminCatalog = () => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) setAllServices(resData.data);
      });
  };

  useEffect(() => {
    syncAdminCatalog();
  }, []);

  const handleUpdate = async (dbId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/services/${dbId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: Number(editForm.price), experience: editForm.experience })
      });
      const data = await response.json();
      if (data.success) {
        alert("Service document modified successfully.");
        setEditingId(null);
        syncAdminCatalog();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (dbId) => {
    if (window.confirm("Purge database listing field completely?")) {
      await fetch(`http://localhost:5000/api/services/${dbId}`, { method: "DELETE" });
      syncAdminCatalog();
    }
  };

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Global Service Catalog Manager (Admin Mode)</h1>
      <div className="service-cards">
        {allServices.map(s => (
          <div className="booking-card" key={s._id}>
            <h3>{s.service}</h3>
            <p><strong>Provider:</strong> {s.provider}</p>
            
            {editingId === s._id ? (
              <div style={{ marginTop: '10px' }}>
                <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} placeholder="New Price" />
                <input type="text" value={editForm.experience} onChange={e => setEditForm({...editForm, experience: e.target.value})} placeholder="Update Exp" />
                <button onClick={() => handleUpdate(s._id)} style={{ background: '#10b981', color: 'white' }}>Save Changes</button>
              </div>
            ) : (
              <>
                <p><strong>Price:</strong> ₹{s.price}</p>
                <p><strong>Experience:</strong> {s.experience}</p>
              </>
            )}
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <button onClick={() => { setEditingId(s._id); setEditForm({ price: s.price, experience: s.experience }); }}>Edit Fields</button>
              <button onClick={() => handleDelete(s._id)} style={{ background: '#ef4444', color: 'white' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageServices;
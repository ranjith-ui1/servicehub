import { useState, useEffect } from "react";
import API from "../../api/axios";

function ManageServices() {
  const [allServices, setAllServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: "", experience: "" });

  const syncCatalog = () => {
    API.get("/services").then(({ data }) => {
      if (data.success) setAllServices(data.data);
    });
  };

  useEffect(() => {
    syncCatalog();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const { data } = await API.put(`/services/${id}`, {
        price: Number(editForm.price),
        experience: editForm.experience,
      });
      if (data.success) {
        alert("Service updated.");
        setEditingId(null);
        syncCatalog();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing permanently?")) return;
    await API.delete(`/services/${id}`);
    syncCatalog();
  };

  return (
    <div className="page-container">
      <h1>Global Service Catalog</h1>
      <div className="service-cards">
        {allServices.map((s) => (
          <div className="booking-card" key={s._id}>
            <h3>{s.service}</h3>
            <p><strong>Provider:</strong> {s.provider}</p>

            {editingId === s._id ? (
              <div className="inline-edit">
                <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} placeholder="New Price" />
                <input type="text" value={editForm.experience} onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })} placeholder="Update Experience" />
                <button className="btn-success" onClick={() => handleUpdate(s._id)}>Save Changes</button>
              </div>
            ) : (
              <>
                <p><strong>Price:</strong> ₹{s.price}</p>
                <p><strong>Experience:</strong> {s.experience}</p>
              </>
            )}

            <div className="card-actions">
              <button onClick={() => { setEditingId(s._id); setEditForm({ price: s.price, experience: s.experience }); }}>Edit</button>
              <button className="btn-danger" onClick={() => handleDelete(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageServices;

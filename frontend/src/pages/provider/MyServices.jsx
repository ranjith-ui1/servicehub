import { useState, useEffect } from "react";
import API from "../../api/axios";
import { getCurrentUser } from "../../api/auth";

function MyServices() {
  const [myServices, setMyServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "Electrician",
    city: "",
    price: "",
    phone: "",
    experience: "",
  });
  const providerUser = getCurrentUser() || { name: "" };

  const fetchMyServices = () => {
    API.get("/services").then(({ data }) => {
      if (data.success) {
        const mine = data.data.filter(
          (s) => s.provider.toLowerCase() === providerUser.name.toLowerCase()
        );
        setMyServices(mine);
      }
    });
  };

  useEffect(() => {
    fetchMyServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerUser.name]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newService.city || !newService.price || !newService.phone || !newService.experience) {
      return alert("Please fill out all missing fields.");
    }

    const payload = {
      provider: providerUser.name,
      service: newService.title,
      city: newService.city,
      price: Number(newService.price),
      experience: newService.experience,
      phone: newService.phone,
    };

    try {
      const { data } = await API.post("/services", payload);
      if (data.success) {
        alert("New service listing published!");
        setNewService({ title: "Electrician", city: "", price: "", phone: "", experience: "" });
        fetchMyServices();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Could not create the listing.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this service listing permanently?")) return;
    try {
      const { data } = await API.delete(`/services/${id}`);
      if (data.success) {
        alert("Listing deleted.");
        fetchMyServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h1>My Service Listings</h1>

      <form onSubmit={handleCreate} className="form-container narrow-form">
        <h3>Create New Service Offering</h3>
        <select value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })}>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Painter">Painter</option>
          <option value="Home Cleaning">Home Cleaning</option>
          <option value="AC Repair">AC Repair</option>
          <option value="Tutor">Tutor</option>
          <option value="Computer Repair">Computer Repair</option>
        </select>
        <input type="text" placeholder="Target City" value={newService.city} onChange={(e) => setNewService({ ...newService, city: e.target.value })} />
        <input type="number" placeholder="Rate (₹)" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
        <input type="text" placeholder="Experience (e.g., 3 Years)" value={newService.experience} onChange={(e) => setNewService({ ...newService, experience: e.target.value })} />
        <input type="text" placeholder="Contact Phone" value={newService.phone} onChange={(e) => setNewService({ ...newService, phone: e.target.value })} />
        <button type="submit">Publish Listing</button>
      </form>

      <div className="service-cards">
        {myServices.map((s) => (
          <div className="service-card" key={s._id}>
            <h3>{s.service}</h3>
            <p><strong>City:</strong> {s.city}</p>
            <p><strong>Rate:</strong> ₹{s.price}</p>
            <p><strong>Experience:</strong> {s.experience}</p>
            <button className="btn-danger" onClick={() => handleDelete(s._id)}>Remove Listing</button>
          </div>
        ))}
        {myServices.length === 0 && <p className="muted">You haven't published any listings yet.</p>}
      </div>
    </div>
  );
}

export default MyServices;

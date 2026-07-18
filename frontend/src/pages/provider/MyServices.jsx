import { useState, useEffect } from "react";

function MyServices() {
  const [myServices, setMyServices] = useState([]);
  const [newService, setNewService] = useState({ title: "Electrician", city: "", price: "", phone: "", experience: "" });
  const providerUser = JSON.parse(localStorage.getItem("currentUser")) || { name: "Anand" };

  const fetchMyServices = () => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          // Keep authorization clear: Filter results matching current user's profile context name
          const isolated = resData.data.filter(s => s.provider.toLowerCase() === providerUser.name.toLowerCase());
          setMyServices(isolated);
        }
      });
  };

  useEffect(() => {
    fetchMyServices();
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
      phone: newService.phone
    };

    try {
      const response = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        alert("Listing committed into Atlas Cluster storage!");
        setNewService({ title: "Electrician", city: "", price: "", phone: "", experience: "" });
        fetchMyServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (dbId) => {
    if (window.confirm("Remove this document permanently from MongoDB?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/services/${dbId}`, { method: "DELETE" });
        const data = await response.json();
        if (data.success) {
          alert("Document deleted successfully.");
          fetchMyServices();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>My Portfolio Settings</h1>
      
      <form onSubmit={handleCreate} className="form-container" style={{ margin: '15px 0', maxWidth: '400px' }}>
        <h3>Create New Service Offering</h3>
        <select value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})}>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Carpenter">Carpenter</option>
        </select>
        <input type="text" placeholder="Target City" value={newService.city} onChange={e => setNewService({...newService, city: e.target.value})} />
        <input type="number" placeholder="Fee Rate (₹)" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} />
        <input type="text" placeholder="Experience (e.g., 3 Years)" value={newService.experience} onChange={e => setNewService({...newService, experience: e.target.value})} />
        <input type="text" placeholder="Contact Phone" value={newService.phone} onChange={e => setNewService({...newService, phone: e.target.value})} />
        <button type="submit">Publish to App</button>
      </form>

      <div className="service-cards">
        {myServices.map(s => (
          <div className="service-card" key={s._id}>
            <h3>{s.service}</h3>
            <p><strong>City:</strong> {s.city}</p>
            <p><strong>Rate:</strong> ₹{s.price}</p>
            <p><strong>Experience:</strong> {s.experience}</p>
            <button onClick={() => handleDelete(s._id)} style={{ background: '#ef4444', color: 'white' }}>Retire Listing</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyServices;
import React, { useState, useEffect } from "react";

function ManageUsers() {
  const [usersList, setUsersList] = useState([]);

  const syncUsers = () => {
    fetch("http://localhost:5000/api/auth/users")
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setUsersList(resData.data.filter(u => u.role === "user"));
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { syncUsers(); }, []);

  const handleDeleteUser = async (mongoId) => {
    if (window.confirm("Purge user account data permanently from MongoDB?")) {
      const res = await fetch(`http://localhost:5000/api/auth/users/${mongoId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        syncUsers();
      }
    }
  };

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Registered Customer Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)} style={{ background: '#ef4444', color: '#fff', border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usersList.length === 0 && <p style={{ marginTop: "1rem" }}>No users registered yet.</p>}
    </div>
  );
}

export default ManageUsers;
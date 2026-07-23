import { useState, useEffect } from "react";
import API from "../../api/axios";

function ManageUsers() {
  const [usersList, setUsersList] = useState([]);

  const syncUsers = () => {
    API.get("/auth/users")
      .then(({ data }) => {
        if (data.success) setUsersList(data.data.filter((u) => u.role === "user"));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    syncUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user account permanently?")) return;
    const { data } = await API.delete(`/auth/users/${id}`);
    if (data.success) {
      alert(data.message);
      syncUsers();
    }
  };

  return (
    <div className="page-container">
      <h1>Registered Customer Accounts</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usersList.length === 0 && <p className="muted">No users registered yet.</p>}
    </div>
  );
}

export default ManageUsers;

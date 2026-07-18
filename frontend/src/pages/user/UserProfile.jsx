function UserProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="profile-card" style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '8px', maxWidth: '400px', margin: '2rem auto', background: '#fff' }}>
      <h1 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', color: '#2c3e50' }}>User Profile</h1>
      <p style={{ margin: '12px 0' }}><strong>Name:</strong> {user?.name || "Standard Client"}</p>
      <p style={{ margin: '12px 0' }}><strong>Email Address:</strong> {user?.email || "Unknown"}</p>
      <p style={{ margin: '12px 0' }}><strong>Access Rank:</strong> <span style={{ padding: '2px 8px', background: '#3498db', color: 'white', borderRadius: '4px', fontSize: '0.85rem', textTransform: 'uppercase' }}>{user?.role || "User"}</span></p>
    </div>
  );
}

export default UserProfile;
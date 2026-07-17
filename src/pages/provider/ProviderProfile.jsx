function ProviderProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="profile-card" style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '8px', maxWidth: '400px', margin: '2rem auto', background: '#f9f9f9' }}>
      <h1 style={{ borderBottom: '2px solid #2ecc71', paddingBottom: '10px' }}>Provider Profile</h1>
      <p style={{ margin: '12px 0' }}><strong>Account Name:</strong> {user?.name || "Verified Professional"}</p>
      <p style={{ margin: '12px 0' }}><strong>Contact Email Address:</strong> {user?.email || "Not Available"}</p>
      <p style={{ margin: '12px 0' }}><strong>System Security Rank:</strong> <span style={{ padding: '2px 8px', background: '#2ecc71', color: 'white', borderRadius: '4px', fontSize: '0.85rem' }}>Service Provider</span></p>
    </div>
  );
}

export default ProviderProfile;
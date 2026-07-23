import { getCurrentUser } from "../../api/auth";

function ProviderProfile() {
  const user = getCurrentUser();

  return (
    <div className="profile-card">
      <h1>Provider Profile</h1>
      <p><strong>Account Name:</strong> {user?.name || "Verified Professional"}</p>
      <p><strong>Contact Email:</strong> {user?.email || "Not Available"}</p>
      <p><strong>Role:</strong> <span className="role-badge role-provider">Service Provider</span></p>
    </div>
  );
}

export default ProviderProfile;

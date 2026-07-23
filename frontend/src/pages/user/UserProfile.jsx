import { getCurrentUser } from "../../api/auth";

function UserProfile() {
  const user = getCurrentUser();

  return (
    <div className="profile-card">
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {user?.name || "Standard Client"}</p>
      <p><strong>Email Address:</strong> {user?.email || "Unknown"}</p>
      <p><strong>Access Rank:</strong> <span className="role-badge role-user">{user?.role || "User"}</span></p>
    </div>
  );
}

export default UserProfile;

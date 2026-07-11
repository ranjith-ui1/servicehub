import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
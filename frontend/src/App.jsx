import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Public pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import Services from "./pages/user/Services";
import ServiceDetails from "./pages/user/ServiceDetails";
import MyBookings from "./pages/user/MyBookings";
import Favorites from "./pages/user/Favorites";
import UserProfile from "./pages/user/UserProfile";

// Provider pages
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderProfile from "./pages/provider/ProviderProfile";
import MyServices from "./pages/provider/MyServices";
import ServiceRequests from "./pages/provider/ServiceRequests";
import ProviderBookings from "./pages/provider/ProviderBookings";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProviders from "./pages/admin/ManageProviders";
import ManageServices from "./pages/admin/ManageServices";
import ManageBookings from "./pages/admin/ManageBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Services listing handles both guest and logged-in views itself */}
          <Route path="services" element={<Services />} />

          {/* User */}
          <Route path="services/:id" element={<ProtectedRoute role="user"><ServiceDetails /></ProtectedRoute>} />
          <Route path="user" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="user/bookings" element={<ProtectedRoute role="user"><MyBookings /></ProtectedRoute>} />
          <Route path="user/favorites" element={<ProtectedRoute role="user"><Favorites /></ProtectedRoute>} />
          <Route path="user/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />

          {/* Provider */}
          <Route path="provider" element={<ProtectedRoute role="provider"><ProviderDashboard /></ProtectedRoute>} />
          <Route path="provider/profile" element={<ProtectedRoute role="provider"><ProviderProfile /></ProtectedRoute>} />
          <Route path="provider/services" element={<ProtectedRoute role="provider"><MyServices /></ProtectedRoute>} />
          <Route path="provider/requests" element={<ProtectedRoute role="provider"><ServiceRequests /></ProtectedRoute>} />
          <Route path="provider/bookings" element={<ProtectedRoute role="provider"><ProviderBookings /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />
          <Route path="admin/providers" element={<ProtectedRoute role="admin"><ManageProviders /></ProtectedRoute>} />
          <Route path="admin/services" element={<ProtectedRoute role="admin"><ManageServices /></ProtectedRoute>} />
          <Route path="admin/bookings" element={<ProtectedRoute role="admin"><ManageBookings /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<h1 style={{ padding: "2rem" }}>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

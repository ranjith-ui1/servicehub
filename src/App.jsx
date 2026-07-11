import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardSettings from "./pages/DashboardSettings";

import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="contact" element={<Contact />} />

          <Route path="register" element={<Register />} />

          <Route path="login" element={<Login />} />

          <Route path="services" element={<Services />} />

          <Route path="service/:id" element={<ServiceDetails />} />

            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>}
                >

            <Route
              index
              element={<DashboardOverview />}
            />

            <Route
              path="profile"
              element={<DashboardProfile />}
            />

            <Route
              path="settings"
              element={<DashboardSettings />}
            />

          </Route>

          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";


import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Favorites from "./pages/Favorites";

import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardSettings from "./pages/DashboardSettings";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Layout */}
        <Route path="/" element={<Layout />}>

          {/* Public Pages */}
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />

          <Route path="contact" element={<Contact />} />

          {/* <Route path="register" element={<Register />} /> */}

          <Route path="login" element={<Login />} />

          {/* Services */}
          <Route path="services" element={<Services />} />

          {/* Dynamic Routing */}
          <Route
            path="services/:id"
            element={<ServiceDetails />}
          />

          {/* Favorites */}
          <Route 
          path="favorites" 
          element={<Favorites />} />
          
          
          {/* Protected Dashboard */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >

            {/* Nested Routes */}

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

          {/* 404 Page */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
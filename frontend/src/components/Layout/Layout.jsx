import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";
function Layout() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2026 ServiceHub. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Layout;

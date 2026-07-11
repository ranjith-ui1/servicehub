import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const menus = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Services",
      path: "/services"
    },
    {
      name: "Dashboard",
      path: "/dashboard"
    },
    {
      name: "Contact",
      path: "/contact"
    },
    {
      name: "Register",
      path: "/register"
    },
    {
      name: "Login",
      path: "/login"
    }
  ];

  return (

    <nav className="navbar">

      <h2>ServiceHub</h2>

      <ul>

        {menus.map((menu, index) => (

          <li key={index}>

            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {menu.name}
            </NavLink>

          </li>

        ))}

      </ul>

    </nav>

  );
}

export default Navbar;
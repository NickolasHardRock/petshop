// src/components/DashboardMenu.jsx
import { NavLink } from "react-router-dom";
import './style.css';

export default function DashboardMenu() {
  const MenuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/pets", label: "Pets" },
    { path: "/owners", label: "Donos" },
    { path: "/services", label: "Serviços" },
    { path: "/service-types", label: "Tipos de Serviços" },
    { path: "/users", label: "Usuários" }
  ];

  return (
    <nav className="dashboard-menu">
      {MenuItems.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

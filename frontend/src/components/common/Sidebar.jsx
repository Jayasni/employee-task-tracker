
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BriefcaseBusiness,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Employees", path: "/employees", icon: Users },
  { name: "Tasks", path: "/tasks", icon: ClipboardList },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <BriefcaseBusiness size={23} />
        </div>
        <div>
          <h2>TaskFlow</h2>
          <p>Employee Management</p>
        </div>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <div className="help-icon">
            <Settings size={18} />
          </div>
          <div>
            <strong>Stay organized</strong>
            <p>Manage your team's work</p>
          </div>
        </div>
        <p className="sidebar-footer">© 2026 TaskFlow</p>
      </div>
    </aside>
  );
}


import { useLocation } from "react-router-dom";
import { Bell, Search, CircleUserRound } from "lucide-react";

const pageDetails = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of your team's activity",
  },
  "/employees": {
    title: "Employees",
    subtitle: "Manage your employee information",
  },
  "/tasks": {
    title: "Tasks",
    subtitle: "Create and track your team's tasks",
  },
};

export default function Header() {
  const location = useLocation();
  const currentPage = pageDetails[location.pathname] || pageDetails["/"];

  return (
    <header className="app-header">
      <div className="header-heading">
        <h1>{currentPage.title}</h1>
        <p>{currentPage.subtitle}</p>
      </div>

      <div className="header-actions">
        <div className="header-search">
          <Search size={17} />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="header-icon-button" type="button" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="header-profile">
          <div className="profile-avatar">
            <CircleUserRound size={22} />
          </div>
          <div className="profile-details">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
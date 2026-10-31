
import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const pageTitles = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/tasks": "Tasks",
};

function Header() {
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-sidebar px-5 py-5 md:px-8">

      {/* Page title */}
      <div>
        <h2 className="text-xl font-bold text-main-text">
          {pageTitle}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Welcome to your employee task tracker
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-line bg-panel px-3 py-2">
          <Search size={18} className="text-muted" />

          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent text-sm text-main-text outline-none placeholder:text-muted md:w-48"
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-line bg-panel p-2.5 text-muted transition hover:text-orange"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange"></span>
        </button>

        {/* Profile */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange font-bold text-app">
          A
        </div>

      </div>
    </header>
  );
}

export default Header;

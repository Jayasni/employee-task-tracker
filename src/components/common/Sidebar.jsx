
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BriefcaseBusiness,
  Settings,
  Layers
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    path: "/employees",
    icon: Users,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: ClipboardList,
  },
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-line bg-sidebar px-5 py-6">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange text-app">
          <BriefcaseBusiness size={23} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-main-text">
            TaskFlow
          </h1>
          <p className="text-xs text-muted">
            Employee Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
        Main Menu
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-orange text-app shadow-lg shadow-orange/10"
                    : "text-muted hover:bg-panel-hover hover:text-main-text"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto">
        <div className="mb-3 border-t border-line pt-5">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted transition hover:bg-panel-hover hover:text-main-text">
            <Settings size={19} />
            Settings
          </button>
        </div>

        <div className="rounded-xl border border-line bg-panel p-4">
          <div className="mb-2 flex items-center gap-2">
            <Layers size={18} className="text-orange" />
            <span className="text-sm font-semibold text-main-text">
              TaskFlow
            </span>
          </div>
          <p className="text-xs leading-5 text-muted">
            Manage employees and track your team's progress.
          </p>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;

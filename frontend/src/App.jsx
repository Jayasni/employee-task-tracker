import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/common/Sidebar.jsx";
import Header from "./components/common/Header.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employee.jsx";
import Tasks from "./pages/Tasks.jsx";
import Settings from "./pages/Settings.jsx";
export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-main">
        <Header />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
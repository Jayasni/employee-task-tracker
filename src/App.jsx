import { Routes, Route, Navigate } from "react-router-dom";

// Common components
import Sidebar from "./components/common/sidebar";
import Header from "./components/common/header";

// Pages
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employee";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <div className="flex min-h-screen bg-app text-main-text">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="p-5 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
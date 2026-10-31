import { useEffect, useState } from "react";
import {
  Users,
  ClipboardList,
  CheckCircle,
  Clock,
} from "lucide-react";

import api from "../api/client";
import StatCard from "../components/common/StatCard";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [employeeResponse, taskResponse] =
          await Promise.all([
            api.get("/api/employees/"),
            api.get("/api/tasks/"),
          ]);

        setEmployees(employeeResponse.data);
        setTasks(taskResponse.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  if (loading) {
    return <p className="text-muted">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-main-text">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-muted">
          Monitor your employees and track team tasks.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={employees.length}
          icon={Users}
          color="bg-orange/15 text-orange"
          description="Registered employees"
        />

        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon={ClipboardList}
          color="bg-info/15 text-info"
          description="All assigned tasks"
        />

        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          icon={CheckCircle}
          color="bg-success/15 text-success"
          description="Successfully completed"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={Clock}
          color="bg-warning/15 text-warning"
          description="Tasks awaiting completion"
        />
      </div>

      {/* Recent Tasks */}
      <div className="rounded-2xl border border-line bg-panel p-6">
        <h2 className="text-xl font-semibold text-main-text">
          Recent Tasks
        </h2>

        <p className="mb-5 mt-1 text-sm text-muted">
          Latest tasks assigned to your team
        </p>

        {tasks.length === 0 ? (
          <p className="text-muted">No tasks available.</p>
        ) : (
          <div className="space-y-4">
            {[...tasks].slice(-5).reverse().map((task) => (
              <div
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4"
              >
                <div>
                  <h3 className="font-medium text-main-text">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Assigned to: {task.employee_name}
                  </p>
                </div>

                <span className="rounded-full bg-orange/15 px-3 py-1 text-xs text-orange">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
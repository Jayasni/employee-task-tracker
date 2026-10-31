import { useEffect, useMemo, useState } from "react";
import {
  Users,
  ClipboardList,
  CheckCircle,
  Clock,
  ChartColumn,
  Target,
  BriefcaseBusiness,
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

        const [employeeResponse, taskResponse] = await Promise.all([
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

  // Task status counts
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const totalTasks = tasks.length;

  // Calculate completion percentage
  const completionPercentage =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  // Status chart data
  const statusData = [
    {
      label: "Completed",
      count: completedTasks,
      color: "completed",
    },
    {
      label: "In Progress",
      count: inProgressTasks,
      color: "in-progress",
    },
    {
      label: "Pending",
      count: pendingTasks,
      color: "pending",
    },
  ];

  // Employee workload chart data
  const employeeWorkload = useMemo(() => {
    return employees
      .map((employee) => {
        const assignedTasks = tasks.filter(
          (task) =>
            task.employee_id === employee.id ||
            (
              !task.employee_id &&
              task.employee_name === employee.name
            )
        ).length;

        return {
          id: employee.id,
          name: employee.name,
          count: assignedTasks,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [employees, tasks]);

  const maxWorkload = Math.max(
    ...employeeWorkload.map((employee) => employee.count),
    1
  );

  // Priority distribution
  const priorityData = ["High", "Medium", "Low"].map((priority) => ({
    label: priority,
    count: tasks.filter(
      (task) =>
        task.priority?.toLowerCase() === priority.toLowerCase()
    ).length,
  }));

  const maxPriority = Math.max(
    ...priorityData.map((item) => item.count),
    1
  );

  // Recent tasks
  const recentTasks = [...tasks].slice(-5).reverse();

  if (loading) {
    return <p className="text-muted">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="dashboard-page space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-main-text">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-muted">
          Monitor your employees and track team tasks.
        </p>
      </div>

      {/* Statistics cards */}
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
          value={totalTasks}
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

      {/* Overall progress */}
      <section className="dashboard-panel">
        <div className="dashboard-section-heading">
          <div>
            <h2>Overall Task Progress</h2>
            <p>Track how much work your team has completed.</p>
          </div>
          <Target size={24} className="dashboard-heading-icon" />
        </div>

        <div className="completion-summary">
          <div>
            <span className="completion-number">
              {completionPercentage}%
            </span>
            <p className="text-muted">Tasks completed</p>
          </div>
          <div className="completion-total">
            {completedTasks} of {totalTasks} tasks
          </div>
        </div>

        <div
          className="dashboard-progress-track"
          role="progressbar"
          aria-label="Overall task completion"
          aria-valuenow={completionPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="dashboard-progress-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </section>

      {/* Charts row */}
      <div className="dashboard-chart-grid">
        {/* Task status chart */}
        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div>
              <h2>Task Status Overview</h2>
              <p>Distribution of tasks by status.</p>
            </div>
            <ChartColumn size={23} className="dashboard-heading-icon" />
          </div>

          <div className="dashboard-chart-list">
            {statusData.map((item) => {
              const percentage =
                totalTasks > 0
                  ? (item.count / totalTasks) * 100
                  : 0;

              return (
                <div className="dashboard-chart-item" key={item.label}>
                  <div className="dashboard-chart-label">
                    <span>{item.label}</span>
                    <strong>{item.count}</strong>
                  </div>

                  <div className="dashboard-bar-track">
                    <div
                      className={`dashboard-bar-fill ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="dashboard-chart-percentage">
                    {Math.round(percentage)}%
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Priority chart */}
        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div>
              <h2>Priority Distribution</h2>
              <p>Tasks grouped by priority.</p>
            </div>
            <Target size={23} className="dashboard-heading-icon" />
          </div>

          <div className="dashboard-chart-list">
            {priorityData.map((item) => (
              <div className="dashboard-chart-item" key={item.label}>
                <div className="dashboard-chart-label">
                  <span>{item.label}</span>
                  <strong>{item.count}</strong>
                </div>

                <div className="dashboard-bar-track">
                  <div
                    className={`dashboard-bar-fill priority-${item.label.toLowerCase()}`}
                    style={{
                      width: `${(item.count / maxPriority) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Employee workload */}
      <section className="dashboard-panel">
        <div className="dashboard-section-heading">
          <div>
            <h2>Employee Workload</h2>
            <p>Number of tasks assigned to each employee.</p>
          </div>
          <BriefcaseBusiness
            size={23}
            className="dashboard-heading-icon"
          />
        </div>

        {employeeWorkload.length === 0 ? (
          <p className="text-muted">No employees available.</p>
        ) : (
          <div className="workload-list">
            {employeeWorkload.map((employee) => (
              <div className="workload-item" key={employee.id}>
                <span className="workload-name">
                  {employee.name}
                </span>

                <div className="dashboard-bar-track workload-track">
                  <div
                    className="dashboard-bar-fill workload-fill"
                    style={{
                      width: `${(employee.count / maxWorkload) * 100}%`,
                    }}
                  />
                </div>

                <strong className="workload-count">
                  {employee.count}
                </strong>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent tasks */}
      <section className="dashboard-panel">
        <h2 className="text-xl font-semibold text-main-text">
          Recent Tasks
        </h2>

        <p className="mb-5 mt-1 text-sm text-muted">
          Latest tasks assigned to your team.
        </p>

        {recentTasks.length === 0 ? (
          <p className="text-muted">No tasks available.</p>
        ) : (
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4"
              >
                <div>
                  <h3 className="font-medium text-main-text">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Assigned to: {task.employee_name || "Unassigned"}
                  </p>
                </div>

                <span
                  className={`task-status-badge ${
                    task.status === "Completed"
                      ? "status-completed"
                      : task.status === "In Progress"
                      ? "status-in-progress"
                      : "status-pending"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
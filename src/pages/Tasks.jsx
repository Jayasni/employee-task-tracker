
import { useEffect, useState } from "react";
import { AlertCircle, ClipboardList } from "lucide-react";

import api from "../api/client";
import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks and employees
  const fetchTasksData = async () => {
    try {
      setError("");

      const [taskResponse, employeeResponse] = await Promise.all([
        api.get("/api/tasks/"),
        api.get("/api/employees/"),
      ]);

      setTasks(taskResponse.data);
      setEmployees(employeeResponse.data);
    } catch (err) {
      console.error("Fetch tasks error:", err);

      setError("Unable to load tasks or employees. Check your backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  // Create task
  const handleAddTask = async (taskData) => {
    try {
      setError("");

      await api.post("/api/tasks/", taskData);

      await fetchTasksData();
    } catch (err) {
      console.error("Create task error:", err);

      setError(
        err.response?.data?.detail || "Unable to create task."
      );
    }
  };

  // Update task status
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      setError("");

      await api.patch(`/api/tasks/${taskId}`, {
        status: newStatus,
      });

      await fetchTasksData();
    } catch (err) {
      console.error("Update task error:", err);

      setError(
        err.response?.data?.detail || "Unable to update task status."
      );
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(`/api/tasks/${taskId}`);

      await fetchTasksData();
    } catch (err) {
      console.error("Delete task error:", err);

      setError(
        err.response?.data?.detail || "Unable to delete task."
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* Page heading */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-orange/15 p-3 text-orange">
          <ClipboardList size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-main-text">
            Task Management
          </h2>

          <p className="mt-1 text-sm text-muted">
            Create tasks, assign employees and track progress.
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-danger/30 bg-panel p-4 text-sm text-danger">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        </div>
      )}

      {/* Task form and list */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

        <div className="xl:col-span-1">
          <TaskForm
            employees={employees}
            onAddTask={handleAddTask}
          />
        </div>

        <div className="min-w-0 xl:col-span-2">
          {loading ? (
            <p className="rounded-xl bg-panel p-6 text-muted">
              Loading tasks...
            </p>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdateStatus={handleUpdateStatus}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>

      </div>

    </div>
  );
}

export default Tasks;

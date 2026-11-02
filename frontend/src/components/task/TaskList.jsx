
import { Trash2, ClipboardList, CalendarDays } from "lucide-react";

function TaskList({ tasks, onUpdateStatus, onDeleteTask }) {

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-danger/15 text-danger";

      case "medium":
        return "bg-warning/15 text-warning";

      case "low":
        return "bg-success/15 text-success";

      default:
        return "bg-panel-hover text-muted";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-success/15 text-success";

      case "in progress":
        return "bg-info/15 text-info";

      case "pending":
        return "bg-warning/15 text-warning";

      default:
        return "bg-panel-hover text-muted";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">

      {/* Heading */}
      <div className="flex items-center justify-between border-b border-line p-5">
        <div>
          <h3 className="font-semibold text-main-text">
            Task Management
          </h3>

          <p className="mt-1 text-sm text-muted">
            Track and manage assigned tasks
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-orange/15 px-3 py-2 text-orange">
          <ClipboardList size={18} />

          <span className="text-sm font-semibold">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Task list */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-app">
            <tr className="text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-4">Task</th>
              <th className="px-5 py-4">Employee</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Due Date</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-10 text-center text-sm text-muted"
                >
                  No tasks found. Create your first task.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-t border-line transition hover:bg-panel-hover"
                >

                  {/* Task title */}
                  <td className="px-5 py-4">
                    <div className="font-medium text-main-text">
                      {task.title}
                    </div>

                    <p className="mt-1 max-w-48 truncate text-xs text-muted">
                      {task.description || "No description"}
                    </p>
                  </td>

                  {/* Employee */}
                  <td className="px-5 py-4 text-sm text-muted">
                    {task.employee_name || "Not assigned"}
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-4">
                    <span className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${getPriorityStyle(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>

                  {/* Due date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <CalendarDays size={15} />
                      {task.due_date}
                    </div>
                  </td>

                  {/* Status update */}
                  <td className="px-5 py-4">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        onUpdateStatus(task.id, e.target.value)
                      }
                      className={`rounded-lg border border-line bg-app px-3 py-2 text-xs font-semibold outline-none focus:border-orange ${getStatusStyle(task.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  {/* Delete */}
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onDeleteTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                      className="rounded-lg p-2 text-muted transition hover:bg-danger/10 hover:text-danger"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default TaskList;

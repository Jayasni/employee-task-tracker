
import { useState } from "react";
import { ClipboardPlus } from "lucide-react";

function TaskForm({ employees, onAddTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    employee_id: "",
    priority: "Medium",
    due_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.employee_id ||
      !formData.due_date
    ) {
      alert("Please fill all required fields");
      return;
    }

    onAddTask({
      ...formData,
      employee_id: Number(formData.employee_id),
    });

    setFormData({
      title: "",
      description: "",
      employee_id: "",
      priority: "Medium",
      due_date: "",
    });
  };

  return (
    <div className="rounded-2xl border border-line bg-panel p-6">

      {/* Heading */}
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-orange/15 p-3 text-orange">
          <ClipboardPlus size={21} />
        </div>

        <div>
          <h3 className="font-semibold text-main-text">
            Create New Task
          </h3>
          <p className="text-sm text-muted">
            Assign a task to an employee
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Task title */}
        <div>
          <label className="mb-2 block text-sm text-muted">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none focus:border-orange"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm text-muted">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task..."
            rows="3"
            className="w-full resize-none rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none focus:border-orange"
          />
        </div>

        {/* Employee */}
        <div>
          <label className="mb-2 block text-sm text-muted">
            Assign Employee
          </label>

          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="w-full rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none focus:border-orange"
            required
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>

          {employees.length === 0 && (
            <p className="mt-2 text-xs text-warning">
              Add an employee before creating a task.
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 block text-sm text-muted">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none focus:border-orange"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Due date */}
        <div>
          <label className="mb-2 block text-sm text-muted">
            Due Date
          </label>

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none focus:border-orange"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={employees.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-app transition hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ClipboardPlus size={18} />
          Create Task
        </button>

      </form>
    </div>
  );
}

export default TaskForm;

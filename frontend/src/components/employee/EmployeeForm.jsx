
import { useState } from "react";
import { UserPlus } from "lucide-react";

function EmployeeForm({ onAddEmployee }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.department.trim()) {
      alert("Please fill all fields");
      return;
    }

    onAddEmployee(formData);

    setFormData({
      name: "",
      email: "",
      department: "",
    });
  };

  return (
    <div className="rounded-2xl border border-line bg-panel p-6">

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-orange/15 p-3 text-orange">
          <UserPlus size={21} />
        </div>

        <div>
          <h3 className="font-semibold text-main-text">
            Add New Employee
          </h3>
          <p className="text-sm text-muted">
            Enter employee details below
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="mb-2 block text-sm text-muted">
            Employee Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            className="w-full rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none transition focus:border-orange"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none transition focus:border-orange"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-xl border border-line bg-app px-4 py-3 text-sm text-main-text outline-none transition focus:border-orange"
            required
          >
            <option value="">Select Department</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Design">Design</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-app transition hover:bg-orange-hover"
        >
          <UserPlus size={18} />
          Add Employee
        </button>

      </form>
    </div>
  );
}

export default EmployeeForm;

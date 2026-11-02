
import { useEffect, useState } from "react";
import { AlertCircle, Users } from "lucide-react";

import api from "../api/client";
import EmployeeForm from "../components/employee/EmployeeForm";
import EmployeeList from "../components/employee/EmployeeList";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch employees from FastAPI
  const fetchEmployees = async () => {
    try {
      setError("");

      const response = await api.get("/api/employees/");
      setEmployees(response.data);
    } catch (err) {
      console.error("Fetch employees error:", err);
      setError("Unable to fetch employees. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add employee
  const handleAddEmployee = async (employeeData) => {
    try {
      setError("");

      await api.post("/api/employees/", employeeData);

      await fetchEmployees();
    } catch (err) {
      console.error("Add employee error:", err);

      setError(
        err.response?.data?.detail || "Unable to add employee."
      );
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (employeeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(`/api/employees/${employeeId}`);

      await fetchEmployees();
    } catch (err) {
      console.error("Delete employee error:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to delete employee. Check whether tasks are assigned to this employee."
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* Page heading */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange/15 p-3 text-orange">
            <Users size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-main-text">
              Employee Management
            </h2>

            <p className="mt-1 text-sm text-muted">
              Add, view and manage your employees.
            </p>
          </div>
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

      {/* Form and list */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

        <div className="xl:col-span-1">
          <EmployeeForm onAddEmployee={handleAddEmployee} />
        </div>

        <div className="min-w-0 xl:col-span-2">
          {loading ? (
            <p className="rounded-xl bg-panel p-6 text-muted">
              Loading employees...
            </p>
          ) : (
            <EmployeeList
              employees={employees}
              onDeleteEmployee={handleDeleteEmployee}
            />
          )}
        </div>

      </div>

    </div>
  );
}

export default Employees;

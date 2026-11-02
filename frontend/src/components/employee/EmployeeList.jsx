
import { Trash2, Users } from "lucide-react";

function EmployeeList({ employees, onDeleteEmployee }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel">

      {/* Heading */}
      <div className="flex items-center justify-between border-b border-line p-5">
        <div>
          <h3 className="font-semibold text-main-text">
            Employee Directory
          </h3>
          <p className="mt-1 text-sm text-muted">
            Manage your team members
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-orange/15 px-3 py-2 text-orange">
          <Users size={18} />
          <span className="text-sm font-semibold">
            {employees.length}
          </span>
        </div>
      </div>

      {/* Employee table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-app">
            <tr className="text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-4">Employee</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-10 text-center text-sm text-muted"
                >
                  No employees found. Add your first employee.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t border-line transition hover:bg-panel-hover"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange/15 font-semibold text-orange">
                        {employee.name?.charAt(0).toUpperCase()}
                      </div>

                      <span className="text-sm font-medium text-main-text">
                        {employee.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {employee.email}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-orange/10 px-3 py-1.5 text-xs font-medium text-orange">
                      {employee.department}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onDeleteEmployee(employee.id)}
                      aria-label={`Delete ${employee.name}`}
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

export default EmployeeList;

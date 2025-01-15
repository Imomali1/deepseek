import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library

interface Employee {
  id: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "cashier";
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "manager" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "cashier" },
  ]);
  const [selectedRole, setSelectedRole] = useState<"admin" | "manager" | "cashier">("cashier");
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  // Generate an invite link with a UUID
  const generateInviteLink = () => {
    const baseUrl = window.location.origin;
    const role = selectedRole;
    const token = uuidv4(); // Generate a unique UUID
    const link = `${baseUrl}/signup?role=${role}&token=${token}`;
    setInviteLink(link);
  };

  // Update employee role
  const updateEmployeeRole = (id: number, newRole: "admin" | "manager" | "cashier") => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, role: newRole } : emp
    );
    setEmployees(updatedEmployees);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>

      {/* Generate Invite Link Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Generate Invite Link</h2>
        <div className="flex gap-4 items-center">
          <select
            value={selectedRole}
            onChange={(e) =>
              setSelectedRole(e.target.value as "admin" | "manager" | "cashier")
            }
            className="p-2 border rounded-lg"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="cashier">Cashier</option>
          </select>
          <button
            onClick={generateInviteLink}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Generate Invite Link
          </button>
        </div>
        {inviteLink && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Invite Link:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100"
              />
              <button
                onClick={() => navigator.clipboard.writeText(inviteLink)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Employee List Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Employee List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border">
                <td className="p-2 border">{emp.id}</td>
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">
                  <select
                    value={emp.role}
                    onChange={(e) =>
                      updateEmployeeRole(emp.id, e.target.value as "admin" | "manager" | "cashier")
                    }
                    className="p-1 border rounded-lg"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="cashier">Cashier</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => updateEmployeeRole(emp.id, "admin")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => updateEmployeeRole(emp.id, "cashier")}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Make Cashier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
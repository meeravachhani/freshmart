import { useEffect, useState } from "react";
import API from "../services/api";
// import "./AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  }, []);

  return (
    <div className="container mt-4 admin-users">
      <div className="card shadow">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">👥 User Management</h5>
          <span className="badge bg-success">
            Total Users: {users.length}
          </span>
        </div>

        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((u, index) => (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          u.role === "admin"
                            ? "bg-danger"
                            : "bg-primary"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

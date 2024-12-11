import React, { useEffect, useState } from "react";

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleRoleChange = (id, newRole) => {
    fetch(`http://localhost:3002/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
        setSuccessMessage("Cập nhật vai trò thành công!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => console.error("Error updating role:", error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quản lý phân quyền</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleRoleChange(user.id, user.role === "admin" ? "user" : "admin")}
                >
                  Chuyển sang {user.role === "admin" ? "User" : "Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;

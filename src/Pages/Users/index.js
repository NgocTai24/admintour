import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Gọi API để lấy dữ liệu người dùng
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3002/users');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu người dùng');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Quản lý Người dùng</h1>

      {/* Hiển thị lỗi nếu có */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Hiển thị bảng người dùng */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td> {/* Hiển thị vai trò */}
                <td>
                  <button className="btn btn-danger btn-sm">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;

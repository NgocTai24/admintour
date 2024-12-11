import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user data from API
      const response = await fetch('http://localhost:3002/users');

      if (response.ok) {
        const users = await response.json();

        // Find the user with matching username and password
        const user = users.find(
          (u) => (u.username === username || u.email === username) && u.password === password
        );

        if (user) {
          // Save user data to localStorage
          localStorage.setItem('user', JSON.stringify(user));

          // Navigate based on user role
          if (user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
        }
      } else {
        setError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg rounded-lg w-100" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Chào mừng bạn quay trở lại!</h2>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Tên người dùng hoặc Email</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Nhập tên người dùng của bạn hoặc email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Đăng nhập
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-end mt-2">
            <a href="/forgot-password" className="text-decoration-none text-muted">Quên mật khẩu?</a>
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center my-4">
            <div className="flex-grow-1 border-bottom"></div>
            <span className="mx-2 text-muted">HOẶC</span>
            <div className="flex-grow-1 border-bottom"></div>
          </div>

          {/* Social Login */}
          <div className="d-grid gap-2">
            <button className="btn btn-outline-primary d-flex justify-content-center align-items-center">
              <FaFacebook className="me-2" />
              Tiếp tục với Facebook
            </button>
            <button className="btn btn-outline-danger d-flex justify-content-center align-items-center">
              <FaGoogle className="me-2" />
              Tiếp tục với Google
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-muted">
              Bạn chưa có tài khoản?{' '}
              <a href="/register" className="text-decoration-none">Đăng ký</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

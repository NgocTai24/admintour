import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Header = () => {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload(); // Hoặc điều hướng về trang login nếu cần
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link" style={{ textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>
          Admin Tour
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Kiểm tra nếu đã đăng nhập, hiển thị nút logout, nếu chưa thì hiển thị nút login */}
            <li className="nav-item">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-link text-white"
                >
                  Đăng xuất
                </button>
              ) : (
                <Link to="/login" className="nav-link text-white">
                  Đăng nhập
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

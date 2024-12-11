import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white" style={{ width: '250px', height: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Menu</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link text-white">
            <i className="bi bi-house-door me-2" style={{ fontSize: '1.2em' }}></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/tours" className="nav-link text-white">
            <i className="bi bi-flag me-2" style={{ fontSize: '1.2em' }}></i> Quản lý Tour
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="nav-link text-white">
            <i className="bi bi-person me-2" style={{ fontSize: '1.2em' }}></i> Quản lý Người dùng
          </NavLink>
        </li>
        <li>
          <NavLink to="/comments" className="nav-link text-white">
            <i className="bi bi-chat-left-text me-2" style={{ fontSize: '1.2em' }}></i> Quản lý Bình luận
          </NavLink>
        </li>
        <li>
          <NavLink to="/role" className="nav-link text-white">
            <i className="bi bi-shield-lock me-2" style={{ fontSize: '1.2em' }}></i> Quản lý Phân Quyền
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoices" className="nav-link text-white">
            <i className="bi bi-file-earmark me-2" style={{ fontSize: '1.2em' }}></i> Quản lý Hóa Đơn
          </NavLink>
        </li>
        <li>
          <NavLink to="/revenue" className="nav-link text-white">
            <i className="bi bi-bar-chart me-2" style={{ fontSize: '1.2em' }}></i> Doanh Thu
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

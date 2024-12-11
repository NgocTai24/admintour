// src/pages/RevenuePage.js
import React, { useState, useEffect } from 'react';

const RevenuePage = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Giả sử chúng ta lấy dữ liệu từ API
    fetch('http://localhost:3002/invoices')  // URL giả lập API
      .then(response => response.json())
      .then(data => {
        setRevenueData(data);

        // Tính doanh thu tổng cộng từ tất cả hóa đơn
        const total = data.reduce((acc, invoice) => acc + (invoice.amount || 0), 0);
        setTotalRevenue(total);
      })
      .catch(error => console.error('Error fetching revenue data:', error));
  }, []);

  const formatCurrency = (amount) => {
    return amount && !isNaN(amount) ? amount.toLocaleString() + ' VND' : 'N/A';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Trang Doanh Thu</h2>
      
      <div className="card shadow-lg p-4 mb-4">
        <h4>Tổng doanh thu</h4>
        <p className="h5">{formatCurrency(totalRevenue)}</p>
      </div>

      <div className="card shadow-lg p-4">
        <h4>Danh sách hóa đơn</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khách hàng</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.customerName}</td>
                <td>{formatCurrency(invoice.amount)}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenuePage;

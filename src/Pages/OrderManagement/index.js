import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]); // Lưu danh sách đơn hàng
    const [filter, setFilter] = useState(''); // Lưu trạng thái lọc
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch dữ liệu từ API
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3002/bookings');
            setOrders(response.data); // Giả sử dữ liệu trả về là mảng bookings
            setError(null);
        } catch (err) {
            setError('Lỗi khi lấy dữ liệu từ API!');
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Xóa đơn hàng
    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/bookings/${id}`);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));

        } catch (err) {
            console.error('Lỗi khi xóa đơn hàng:', err);
        }
    };

    // Lọc đơn hàng theo trạng thái
    const filteredOrders = orders.filter((order) => {
        return filter === '' || order.status === filter;
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Quản Lý Đơn Hàng</h1>

            {/* Bộ lọc trạng thái */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <label className="form-label">Lọc theo trạng thái:</label>
                    <select
                        className="form-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Hiển thị loading hoặc lỗi */}
            {loading && <div className="alert alert-info">Đang tải dữ liệu...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Bảng hiển thị đơn hàng */}
            {!loading && (
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Tên Khách Hàng</th>
                            <th>Số Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.amount != null ? order.amount.toLocaleString() : 'N/A'} VNĐ</td>
                                    <td>
                                        <span
                                            className={`badge ${order.status === 'Paid'
                                                    ? 'bg-success'
                                                    : order.status === 'Cancelled'
                                                        ? 'bg-danger'
                                                        : 'bg-warning text-dark'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteOrder(order.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Không có đơn hàng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default OrderManagement;

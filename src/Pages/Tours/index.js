import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tours = () => {
  const [tours, setTours] = useState([]); // Khởi tạo danh sách tour
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(''); // Trạng thái lỗi

  useEffect(() => {
    // Lấy dữ liệu từ API
    fetch('http://localhost:3002/tours')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        return response.json();
      })
      .then((data) => {
        setTours(data); // Lưu dữ liệu tour vào state
        setIsLoading(false); // Hoàn tất tải dữ liệu
      })
      .catch((error) => {
        console.error('Error fetching tours:', error);
        setError('Không thể tải dữ liệu tour. Vui lòng thử lại!');
        setIsLoading(false);
      });
  }, []);

  // Hàm xử lý xóa tour
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tour này?');
    if (!confirmDelete) return;

    fetch(`http://localhost:3002/tours/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete tour');
        }
        // Xóa thành công, cập nhật lại danh sách tour
        setTours(tours.filter((tour) => tour.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting tour:', error);
        alert('Không thể xóa tour. Vui lòng thử lại!');
      });
  };

  return (
    <div>
      <h1>Quản lý Tour</h1>
      <Link to="/tours/create" className="btn btn-primary mb-3">
        Thêm Tour
      </Link>

      {/* Hiển thị trạng thái "loading" hoặc lỗi */}
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Tour</th>
              <th>Địa điểm</th>
              <th>Giá</th>
              <th>Ảnh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {tours.length > 0 ? (
              tours.map((tour) => (
                <tr key={tour.id}>
                  <td>{tour.id}</td>
                  <td>{tour.tourName}</td>
                  <td>{tour.destination}</td>
                  <td>{Number(tour.price).toLocaleString()} VND</td>
                  <td>
                    <img
                      src={
                        Array.isArray(tour.images)
                          ? tour.images[0] // Lấy ảnh đầu tiên nếu là mảng
                          : tour.images || 'https://via.placeholder.com/100' // Nếu không phải mảng, hiển thị chuỗi hoặc placeholder
                      }
                      alt={tour.tourName}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>

                  <td>
                    <Link to={`/tours/edit/${tour.id}`} className="btn btn-warning btn-sm me-2">
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(tour.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Không có tour nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tours;

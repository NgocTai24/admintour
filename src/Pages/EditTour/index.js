import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTour = () => {
  const [tour, setTour] = useState({
    tourName: '',
    description: '',
    destination: '',
    region: 'Miền Bắc',
    price: '',
    duration: '',
    images: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    tourGuide: '',
    LichTrinh: '',
    khoihanh: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams(); // Nhận id từ URL
  const navigate = useNavigate(); // Thay thế useHistory

  useEffect(() => {
    // Lấy thông tin tour từ API
    fetch(`http://localhost:3002/tours/${id}`)
      .then((response) => response.json())
      .then((data) => setTour(data))
      .catch((error) => {
        console.error('Error fetching tour:', error);
        setErrorMessage('Không thể tải dữ liệu tour.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3002/tours/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tour),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update tour');
        }
        return response.json();
      })
      .then(() => {
        setSuccessMessage('Tour đã được cập nhật thành công!');
        setTimeout(() => {
          navigate('/tours'); // Chuyển hướng sau 2 giây
        }, 2000);
      })
      .catch((error) => {
        console.error('Error updating tour:', error);
        setErrorMessage('Đã xảy ra lỗi khi cập nhật tour.');
      });
  };

  const handleCancel = () => {
    navigate('/tours'); // Quay lại trang danh sách tour
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Sửa Tour</h2>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="tourName">Tên Tour</label>
              <input
                type="text"
                className="form-control"
                id="tourName"
                value={tour.tourName}
                onChange={(e) => setTour({ ...tour, tourName: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="description">Mô tả</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={tour.description}
                onChange={(e) => setTour({ ...tour, description: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="destination">Địa điểm</label>
              <input
                type="text"
                className="form-control"
                id="destination"
                value={tour.destination}
                onChange={(e) => setTour({ ...tour, destination: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="region">Khu vực</label>
              <select
                className="form-control"
                id="region"
                value={tour.region}
                onChange={(e) => setTour({ ...tour, region: e.target.value })}
                required
              >
                <option value="Miền Bắc">Miền Bắc</option>
                <option value="Miền Trung">Miền Trung</option>
                <option value="Miền Nam">Miền Nam</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="price">Giá</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={tour.price}
                onChange={(e) => setTour({ ...tour, price: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="duration">Thời gian (Ngày)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                value={tour.duration}
                onChange={(e) => setTour({ ...tour, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="images">Ảnh (dạng JSON)</label>
              <textarea
                className="form-control"
                id="images"
                rows="3"
                value={tour.images}
                onChange={(e) => setTour({ ...tour, images: e.target.value })}
                placeholder='["link1", "link2"]'
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="startDate">Ngày bắt đầu</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={tour.startDate}
                onChange={(e) => setTour({ ...tour, startDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="endDate">Ngày kết thúc</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={tour.endDate}
                onChange={(e) => setTour({ ...tour, endDate: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="maxParticipants">Số người tối đa</label>
              <input
                type="number"
                className="form-control"
                id="maxParticipants"
                value={tour.maxParticipants}
                onChange={(e) => setTour({ ...tour, maxParticipants: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="tourGuide">Hướng dẫn viên</label>
              <input
                type="text"
                className="form-control"
                id="tourGuide"
                value={tour.tourGuide}
                onChange={(e) => setTour({ ...tour, tourGuide: e.target.value })}
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="khoihanh">Nơi khởi hành</label>
              <input
                type="text"
                className="form-control"
                id="khoihanh"
                value={tour.khoihanh}
                onChange={(e) => setTour({ ...tour, khoihanh: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="LichTrinh">Lịch trình</label>
            <textarea
              className="form-control"
              id="LichTrinh"
              rows="4"
              value={tour.LichTrinh}
              onChange={(e) => setTour({ ...tour, LichTrinh: e.target.value })}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTour;

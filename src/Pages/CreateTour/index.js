import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTour = () => {
  const [tourName, setTourName] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState('');
  const [region, setRegion] = useState('Miền Bắc');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [images, setImages] = useState([]); // Chuyển thành mảng
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [tourGuide, setTourGuide] = useState('');
  const [LichTrinh, setLichTrinh] = useState('');
  const [khoihanh, setKhoihanh] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTour = {
      tourName,
      description,
      destination,
      region,
      price: Number(price),
      duration: Number(duration),
      images, // Mảng ảnh
      startDate,
      endDate,
      maxParticipants: Number(maxParticipants),
      tourGuide,
      LichTrinh,
      khoihanh,
    };

    fetch('http://localhost:3002/tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTour),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage(true);
        setTimeout(() => {
          navigate('/tours');
        }, 2000);
      })
      .catch((error) => console.error('Error adding tour:', error));
  };

  const handleCancel = () => {
    navigate('/tours');
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="text-center mb-4">Thêm Tour</h2>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            Tour đã được thêm thành công!
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
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="description">Mô tả</label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="region">Khu vực</label>
              <select
                className="form-control"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="duration">Thời gian (Ngày)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group mb-3">
              <label>Ảnh</label>
              {images.map((image, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-2"
                  placeholder={`Ảnh ${index + 1}`}
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                />
              ))}
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleAddImage}
              >
                Thêm Ảnh
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="startDate">Ngày bắt đầu</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="endDate">Ngày kết thúc</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="maxParticipants">Số lượng người tham gia tối đa</label>
              <input
                type="number"
                className="form-control"
                id="maxParticipants"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="tourGuide">Hướng dẫn viên</label>
              <input
                type="text"
                className="form-control"
                id="tourGuide"
                value={tourGuide}
                onChange={(e) => setTourGuide(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="LichTrinh">Lịch Trình</label>
            <textarea
              className="form-control"
              id="LichTrinh"
              rows="3"
              value={LichTrinh}
              onChange={(e) => setLichTrinh(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="khoihanh">Nơi khởi hành</label>
            <input
              type="text"
              className="form-control"
              id="khoihanh"
              value={khoihanh}
              onChange={(e) => setKhoihanh(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Thêm Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTour;

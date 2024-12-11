import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  // Khởi tạo các state cho tour, user và comment
  const [tourCount, setTourCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  // Hàm để fetch dữ liệu từ API
  useEffect(() => {
    fetch('http://localhost:3002/tours/count')
      .then(response => response.json())
      .then(data => {
        console.log("Tour count:", data); // Kiểm tra dữ liệu trả về
        setTourCount(data.count); // Gán số lượng tour
      })
      .catch(error => console.log("Error fetching tour count:", error));
  
    fetch('http://localhost:3002/users/count')
      .then(response => response.json())
      .then(data => {
        console.log("User count:", data); // Kiểm tra dữ liệu trả về
        setUserCount(data.count); // Gán số lượng người dùng
      })
      .catch(error => console.log("Error fetching user count:", error));
  
    fetch('http://localhost:3002/comments/count')
      .then(response => response.json())
      .then(data => {
        console.log("Comment count:", data); // Kiểm tra dữ liệu trả về
        setCommentCount(data.count); // Gán số lượng bình luận
      })
      .catch(error => console.log("Error fetching comment count:", error));
  }, []);
  


  return (
    <div>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Số lượng tour</h5>
              <p className="card-text">{tourCount} tours</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Số lượng người dùng</h5>
              <p className="card-text">{userCount} users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Số lượng bình luận</h5>
              <p className="card-text">{commentCount} comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([]);  // Khởi tạo comments là một mảng rỗng

  useEffect(() => {
    // Lấy dữ liệu bình luận từ API
    fetch('http://localhost:3002/comments') // Đổi URL nếu API của bạn không có '/api'
      .then((response) => {
        console.log('Response status:', response.status);  // Kiểm tra status của response
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data from API:', data);  // Xem dữ liệu trả về từ API
        setComments(data);  // Dữ liệu trả về từ API là mảng bình luận
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setComments([]);  // Tránh lỗi khi fetch bị lỗi
      });
  }, []); // Chạy một lần khi component được render lần đầu tiên

  return (
    <div>
      <h1>Quản lý Bình luận</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Người dùng</th>
            <th>Bình luận</th>
            <th>Thời gian</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.userId === 1 ? 'Nguyễn Văn A' : 'Nguyễn Văn B'}</td>
                <td>{comment.comment}</td>
                <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không có bình luận nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;

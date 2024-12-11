import React, { useEffect, useState } from "react";

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/invoices")
      .then((response) => response.json())
      .then((data) => setInvoices(data))
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:3002/invoices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
        setInvoices(
          invoices.map((invoice) =>
            invoice.id === id ? { ...invoice, status: newStatus } : invoice
          )
        );
        setSuccessMessage("Cập nhật trạng thái hóa đơn thành công!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => console.error("Error updating invoice:", error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quản lý hóa đơn</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Số tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.amount.toLocaleString()} VND</td>
              <td>{invoice.status}</td>
              <td>
                <button
                  className={`btn btn-${invoice.status === "Paid" ? "secondary" : "success"} btn-sm`}
                  onClick={() =>
                    handleStatusChange(invoice.id, invoice.status === "Paid" ? "Pending" : "Paid")
                  }
                >
                  {invoice.status === "Paid" ? "Chuyển thành Chưa thanh toán" : "Đánh dấu đã thanh toán"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceManagement;

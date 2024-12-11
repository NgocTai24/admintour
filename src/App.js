import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Navbar/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users';
import Comments from './Pages/Comments';
import Tours from './Pages/Tours';
import CreateTour from './Pages/CreateTour';
import Login from './Pages/Login';
import EditTour from './Pages/EditTour'; // Nếu có thêm trang sửa tour
import RoleManagement from './Pages/Role';
import InvoiceManagement from './Pages/Invoice';
import RevenuePage from './Pages/RevenuePage';

const App = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <main>
              <Routes>
                {/* Các route chính */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/create" element={<CreateTour />} />
                <Route path="/tours/edit/:id" element={<EditTour />} /> {/* Route sửa tour */}
                <Route path="/users" element={<Users />} />
                <Route path="login" element = {<Login />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/role" element={<RoleManagement />} />
                <Route path="/invoices" element={<InvoiceManagement />} />
                <Route path="/revenue" element={<RevenuePage />} />

                {/* Route mặc định */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

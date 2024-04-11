// Layout.js
import React from 'react';
import Sidebar from './Sidebar' ;
import { Outlet } from 'react-router-dom';
const AdminLayout = ({ children }) => {
  
  return (
    <div className="flex min-h-96">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
      
    </div>
  );
};

export default AdminLayout;

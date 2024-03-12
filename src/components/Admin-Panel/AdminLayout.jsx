// Layout.js
import React from 'react';
import Sidebar from './Sidebar' ;
import { Outlet } from 'react-router-dom';
const AdminLayout = ({ children }) => {
  console.log(children);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
      
    </div>
  );
};

export default AdminLayout;

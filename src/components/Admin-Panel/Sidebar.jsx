// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/5 p-4">
      <Link to="/admin/blog-manage" className="block py-2 px-4 hover:bg-gray-700">Blog</Link>
      <Link to="/admin/student-corner-manage" className="block py-2 px-4 hover:bg-gray-700">Student Corner</Link>
      <Link to="/admin/webinar-seminar-manage" className="block py-2 px-4 hover:bg-gray-700">Webinar & Seminar</Link>
    </div>
  );
};

export default Sidebar;

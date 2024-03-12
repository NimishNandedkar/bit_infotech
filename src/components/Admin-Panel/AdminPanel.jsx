import React from 'react'

// import { BrowserRouter as Router, Route  , Routes} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import BlogManage from './BlogManage';
import StudentCornerManage from './StudentCornerManage';
import WebinarSeminarManage from './WebinarSeminarManage';
import Sidebar from './Sidebar';
import { Switch } from '@material-tailwind/react';

import AdminLayout from './AdminLayout';

function AdminPanel() {
    return (
        <>


            <AdminLayout>
                

                <Routes>
                   
                <Route path="/blog-manage" element={<BlogManage />} />
                <Route path="/student-corner-manage" element={<StudentCornerManage />} />
                <Route path="/webinar-seminar-manage" element={<WebinarSeminarManage />} />
                </Routes>
            </AdminLayout>


        </>
    )
}

export default AdminPanel
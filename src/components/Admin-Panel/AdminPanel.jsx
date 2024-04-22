import React, { useEffect } from 'react'

// import { BrowserRouter as Router, Route  , Routes} from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';

import BlogManage from './BlogManage';
import StudentCornerManage from './StudentCornerManage';
import WebinarSeminarManage from './WebinarSeminarManage';
import Sidebar from './Sidebar';
import { Switch } from '@material-tailwind/react';

import AdminLayout from './AdminLayout';
import CreateBlog from './CreateBlog';
import CreateWebinar from './CreateWebinar';
import { useSelector } from 'react-redux';
import CreateEvents from './CreateEvents';
import EventManage from './EventManage';

function AdminPanel() {
    const navigate = useNavigate();
    const isAdmin = useSelector(state => state.auth.role === 'admin');
    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    }
        , [isAdmin, navigate]);

    return (


        <>
            <AdminLayout>


                <Routes>

                    <Route path="/blog-manage" element={<BlogManage />} />
                    <Route path="/write-blog" element={<CreateBlog />} />
                    <Route path="/student-corner-manage" element={<StudentCornerManage />} />
                    <Route path="/webinar-seminar-manage" element={<WebinarSeminarManage />} />
                    <Route path='/create-webinar' element={<CreateWebinar />} />
                    <Route path='/create-seminar' element={<CreateWebinar />} />
                    <Route path='/create-events' element={<CreateEvents />} />
                    <Route path='/events-manage' element={<EventManage />} />
                    


                </Routes>
            </AdminLayout>


        </>
    )
}

export default AdminPanel
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Blogs from './components/Blogs/Blogs.jsx'
import ProjectUpload from './components/StudentCorner/ProjectUpload/ProjectUpload.jsx'
import NotFound from './components/Not Found/NotFound.jsx'
import SeminarWebinar from './components/Seminar-Webinar/SeminarWebinar.jsx'
import Login from './components/Login/Login.jsx'
import AdminPanel from './components/Admin-Panel/AdminPanel.jsx'



// ***********************************************


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='blogs' element={<Blogs />} />
      <Route path='student-corner' element={<ProjectUpload />} />
      <Route path='/seminar-webinar' element={<SeminarWebinar />} />+
      <Route path='/login' element={<Login />} />
      <Route path='/admin/*' element={<AdminPanel/>} >
      
      </Route>
      


      

      <Route path='*' element={<NotFound />} />


    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

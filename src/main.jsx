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
import Signup from './components/Sign-up/Signup.jsx'
import Events from './components/Events/Events.jsx'
import Cards from './components/Blogs/Cards/Cards.jsx'
import AdminPanel from './components/Admin-Panel/AdminPanel.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'



// ***********************************************

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='blogs/*' element={<Blogs />}/>
      <Route path='blogs/card' element={<Cards />} />
      <Route path='student-corner' element={<ProjectUpload />} />
      <Route path='seminar-webinar' element={<SeminarWebinar />} />
      <Route path='events' element={<Events />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='logout' element={<Login />} />
      <Route path='/admin/*' element={<AdminPanel/>} />
      <Route path='*' element={<NotFound />} />
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

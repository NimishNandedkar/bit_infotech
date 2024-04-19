import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth.js'
import axios from 'axios'

function Logoutbtn() {
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, {}, {
              withCredentials: true // Send the cookie with the request
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
        dispatch(logout())
    }


  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  )
}

export default Logoutbtn
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

function RegisterBtn() {

    const { id } = useParams();

    const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
        return cookies;
      }, {});

      const token = cookies.token;
      console.log(token);
      
      const handleRegister = async () => {
        try {
            const encodedId = encodeURIComponent(id);
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/events/registerEvent/${encodedId}`,
                // Data payload (if any)
                {token: token},
                // Configuration object with headers
                {
                    withCredentials: true,
                    headers: {
                        //get token from cookies
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(response);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }
    

  return (
    <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Register
    </button>
  )
}

export default RegisterBtn
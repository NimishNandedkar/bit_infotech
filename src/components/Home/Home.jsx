import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [user, setUser] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send a GET request to the server to check for cookies
                const response = await axios.get(`http://localhost:3000/`, {
                    withCredentials: true
                });
               
                console.log(response.data )
                const token = response.data

                if (!token) {
                    console.log("session expired, please login again")
                    alert("session expired, please login again")
                    return null
                }
               
                // Update user state with data from the server response
                setUser(response.data.token);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mx-auto w-full max-w-7xl  bg-gray-200">
            {/* adding background video */}
            <video autoPlay loop muted className="w-full h-screen object-cover">
                <source src='src/assets/booksBackground.mp4' type="video/mp4" />
            </video>
            {user ? (
                <h1>Welcome back {user.name}</h1>
            ) : (
                <h1>Hello, Guest!</h1>
            )}
        </div>
    );
}

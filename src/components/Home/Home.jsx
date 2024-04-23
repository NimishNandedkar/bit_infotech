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
        <>
                

        <div className="relative bg-gradient-to-b from-blue-900 to-blue-700 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
       
        <svg className="absolute bottom-0 left-0 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280">
        <path fill="#ffffff" fill-opacity="1" d="M0,64L48,69.3C96,75,192,85,288,112C384,139,480,181,576,181.3C672,181,768,139,864,138.7C960,139,1056,181,1152,202.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>

<div className="max-w-7xl mx-auto relative z-10" >
<div className="text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Welcome to Bit Baroda</h1>
    <p className="mt-4 text-lg md:text-xl text-black font-medium">A Perfect platform for Career Transformation….. More than Two-decade,<br />
BIT has been a multi-disciplinary education and training Institute in Vadodara</p>
    <div className="mt-10">
    <a href="#blog-section" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">Get Started</a>
    </div>
</div>
</div>
</div>


{/* // Blog Section */}

        
<div className="bg-white py-20 px-4 sm:px-6 lg:px-8" id="blog-section">
<div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
    {/* <!-- Left content: Info about the blog feature --> */}
    <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Explore Our Blog</h2>
        <p className="text-lg text-gray-600 mb-8">Stay updated with the latest trends, insights, and news by reading our blog. Dive into informative articles written by industry experts and enthusiasts.</p>
        <a href="/blogs" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">Read Our Blog</a>
    </div>
    {/* <!-- Right content: SVG related to blog --> */}
    <div className="md:w-1/2 mt-8 md:mt-0">
        <img src="/blog-illustration.jpeg" alt="Blog Illustration" className="w-full h-auto mx-auto md:max-w-md rounded-3xl" />
    </div>
    </div>
</div>
</div>


{/* Student Corner Section */}

<div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
<div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        {/* Left content: Info about the Student Corner feature */}
        <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="/student-corner-illustration.jpeg" alt="Student Corner Illustration" className="w-full h-auto mx-auto md:max-w-md rounded-3xl" />
        </div>
        {/* Right content: Image related to Student Corner */}
        
        <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Student Corner</h2>
            <p className="text-lg text-gray-600 mb-8">Empowering students to showcase their projects and talents. Explore a diverse collection of projects created by students from various fields. Dive into innovative ideas and solutions.</p>
            <a href="/student-corner" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">Explore Projects</a>
        </div>
    </div>
</div>
</div>



{/* Webinar and Seminar Section */}


<div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
<div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        {/* Left content: Image related to Webinar and Seminar */}
        <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Upcoming Webinars & Seminars</h2>
            <p className="text-lg text-gray-600 mb-8">Stay informed about the latest webinars and seminars covering a wide range of topics. Register for upcoming events and expand your knowledge horizon.</p>
            <a href="/seminar-webinar" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">View Upcoming Webinar & Seminar</a>
        </div>
        {/* Right content: Info about the Webinar and Seminar feature */}
        <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="/webinar-seminar-illustration.jpeg" alt="Webinar and Seminar Illustration" className="w-full h-auto mx-auto md:max-w-md rounded-3xl" />
        </div>
    </div>
</div>
</div>


{/* Events Section */}

<div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
<div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        {/* Left content: Image related to Events */}
        <div className="md:w-1/2">
            <img src="/events-illustration.jpeg" alt="Events Illustration" className="w-full h-auto mx-auto md:max-w-md rounded-3xl" />
        </div>
        {/* Right content: Info about the Events feature */}
        <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
            <p className="text-lg text-gray-600 mb-8">Stay updated about the latest events happening in your community. Discover exciting celebrations, prize distributions, corporate events, and more. Join us in these memorable moments and connect with like-minded individuals.</p>
            <a href="/events" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">View Upcoming Events</a>
        </div>
    </div>
</div>
</div>

        
        </>
    );
}

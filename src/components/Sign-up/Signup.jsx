import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData(prevState => ({
            ...prevState, 
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/register', formData);

            // Handle success, maybe redirect the user or show a success message
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error.message);
            // Handle error, maybe show an error message to the user
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-5 ">
                <div className="p-8 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="transition-shadow duration-500 ease-in-out bg-white shadow-md hover:shadow-2xl  w-full rounded-lg ">
                            <div className="px-5 pt-12 pb-5">
                                {/* form */}
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='email' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <div className='text-center'>
                                    <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:ring-4 text-white w-40 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center m-auto">
                                        <span className="inline-block mr-2">Sign-up</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                                {/* form */}
                            </div>
                        </div>
                    </form>
                    {/* optional */}
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <Link to={'/'} className="transition duration-200 mx-0 px-3 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 20l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span className="inline-block ml-1 mb">Back to your-app.com</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* optional */}
                    
                </div>
            </div>
        </>
    )
}

export default Signup;

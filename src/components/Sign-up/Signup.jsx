import axios from 'axios';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [SignUpSuccess, setSignUpSuccess] = useState(false);  // This is optional, you can use it to show a success message to the user
    const [SignUpError, setSignUpError] = useState(false);  // This is optional, you can use it to show an error message to the user
    const [error, setError] = useState('');  // This is optional, you can use it to show an error message to the user
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
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, formData);

            // Handle success, maybe redirect the user or show a success message
            setSignUpSuccess(true);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error.message);
            setSignUpError(true);
            setError(error.message);
            // Handle error, maybe show an error message to the user
        }
    };

    return (
        <>

            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-5 ">
                <div className="p-8 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Sign up</h1>
                    {/* optional */}
                    {SignUpSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline">Your account has been created successfully
                        <Link to={'/login'} className="text-blue-500 hover:text-blue-700">Login</Link>
                        </span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={() => setSignUpSuccess(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.707 6.707a1 1 0 0 1 1.414 0L12 10.586l3.879-3.879a1 1 0 1 1 1.414 1.414L13.414 12l3.879 3.879a1 1 0 1 1-1.414 1.414L12 13.414l-3.879 3.879a1 1 0 1 1-1.414-1.414L10.586 12 6.707 8.121a1 1 0 0 1 0-1.414z"/>
                            </svg>
                        </span>
                    </div>}

                    {SignUpError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline">An error occurred while creating your account {error} </span>
                        
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={() => setSignUpError(false)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.707 6.707a1 1 0 0 1 1.414 0L12 10.586l3.879-3.879a1 1 0 1 1 1.414 1.414L13.414 12l3.879 3.879a1 1 0 1 1-1.414 1.414L12 13.414l-3.879 3.879a1 1 0 1 1-1.414-1.414L10.586 12 6.707 8.121a1 1 0 0 1 0-1.414z"/>
                            </svg>
                        </span>
                    </div>}
                    {/* optional */}
                    {/* form */}    
                    <form onSubmit={handleSubmit}>
                        <div className="transition-shadow duration-500 ease-in-out bg-white shadow-md hover:shadow-2xl  w-full rounded-lg ">
                            <div className="px-5 pt-12 pb-5">
                                {/* form */}
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
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

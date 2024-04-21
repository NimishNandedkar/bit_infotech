import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../store/auth.js'
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert/Alert.jsx';

import axios from 'axios';

function Login() {
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const user = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const navgate = useNavigate();

    

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');

    const [LoginSuccess, setLoginSuccess] = useState(false);  // This is optional, you can use it to show a success message to the user
    const [LoginError, setLoginError] = useState(false);  // This is optional, you can use it to show an error message to the user

    const [error, setError] = useState('');  // This is optional, you can use it to show an error message to the user

    if (user) {
        // If user is logged in, navigate to home page
        // Redirect the user to the home page after 1000ms
        setTimeout(() => {
            navgate('/');
        }, 500);
    }

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

     const  handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, formData);

            // Handle success, maybe redirect the user or show a success message
            console.log(response.data);
            setLoginSuccess(true);
            dispatch(authLogin({ userData: response.data.data.user}));

            //set the user_id data in the cookies to be used in the getCurrentUser middleware 
            document.cookie = `token=${response.data.data.token}; max-age=3600; path=/`;

            //show the success message
            setOpen(true);
            setSeverity('success');
            setMessage(isAdmin ? 'welcome Admin' : 'You have successfully logged in');

            // Redirect the user to the home page after 1000ms
            setTimeout(() => {
                navgate('/');
            }, 2000);

        } catch (error) {
            console.error('Error:', error.message);
            setLoginError(true);
            setError(error.message);
            // Handle error, maybe show an error message to the user

              {/* optional */}
              setOpen(true);
              setSeverity('error');
              setMessage('An error occurred while logging in');
              {/* optional */}
  
        }

        
    };

    return (
        <>
            <div className='position-relative'>
            <Alert open={open} handleClose={handleClose} severity={severity} message={message} duration={2000} />
            </div>
            <div className="min-h-screen bg-gray-200 flex flex-col justify-center sm:py-5 ">
                <div className="p-8 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Login</h1>
                      {/* optional */}
                      {/* {LoginSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline">You have successfully logged in
                        <Link to={'/'} className="text-blue-500 hover:text-blue-700">Home</Link>
                        </span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={() => setLoginSuccess(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.707 6.707a1 1 0 0 1 1.414 0L12 10.586l3.879-3.879a1 1 0 1 1 1.414 1.414L13.414 12l3.879 3.879a1 1 0 1 1-1.414 1.414L12 13.414l-3.879 3.879a1 1 0 1 1-1.414-1.414L10.586 12 6.707 8.121a1 1 0 0 1 0-1.414z"/>
                            </svg>
                        </span>
                    </div>}

                    {LoginError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline">
                            An error occurred while logging in {error}
                        </span>
                        
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={() => setLoginError(false)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.707 6.707a1 1 0 0 1 1.414 0L12 10.586l3.879-3.879a1 1 0 1 1 1.414 1.414L13.414 12l3.879 3.879a1 1 0 1 1-1.414 1.414L12 13.414l-3.879 3.879a1 1 0 1 1-1.414-1.414L10.586 12 6.707 8.121a1 1 0 0 1 0-1.414z"/>
                            </svg>
                        </span>
                    </div>} */}
                    {/* optional */}

                    <form onSubmit={handleSubmit}>
                        <div className="transition-shadow duration-500 ease-in-out bg-white shadow-md hover:shadow-2xl  w-full rounded-lg ">
                            <div className="px-5 pt-12 pb-5">
                                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='email' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                                <div className='text-center'>
                                    <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:ring-4 text-white w-40 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center m-auto">
                                        <span className="inline-block mr-2">Login</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className='font-normal text-xs rounded-lg text-center text-gray-500' >
                        <span className="inline-block ml-1 mb">Or Login using</span>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-2 gap-1">
                            <Link to={'*'} className="transition-colors duration-400 ease-in-out border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md hover:text-white hover:bg-blue-500 font-normal text-center inline-block">
                                Google
                            </Link>
                            <Link to={'*'} className="transition-colors duration-400 ease-in-out border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md hover:text-white hover:bg-blue-500 font-normal text-center inline-block">
                                Github
                            </Link>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    <span className="inline-block ml-1">Forgot Password</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login;

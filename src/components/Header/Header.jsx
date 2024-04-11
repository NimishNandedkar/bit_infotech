import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };



    return (
        <header className="shadow-lg sticky z-50 top-0 rounded-b-2xl">
            <nav className="bg-white border-gray-200 px-2 lg:px-4 py-2.5 rounded-b-2xl">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://bitinfotech.in/assets/uploads/media-uploader/bitinfotech-favicon-20201601120139.png"
                            className="mr-3 h-10 w-10"
                            alt="Logo"
                        /><span className='text-gray-800 font-bold'>Bit-infotech</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link

                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="text-white bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Sign up
                        </Link>
                    </div>
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 focus:outline-none transition-all duration-300 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin='round'
                                    strokeWidth="3"
                                    d="M4 6h16 M4 12h16 M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`${mobileMenuOpen ? 'block' : 'hidden'
                            } lg:hidden w-full mt-4 transition-all duration-300 ease-in-out`}
                    >
                        <ul className=" text-sm ml-6 mr-6 flex flex-col font-medium space-y-2">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={toggleMobileMenu}
                                    className="font-semibold text-black hover:text-blue-700"
                                >
                                    Home
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/student-corner"
                                    onClick={toggleMobileMenu}
                                    className="font-semibold text-black hover:text-blue-700"
                                >
                                    Student Corner
                                </NavLink>

                            </li>

                            
                            <li>
                                <NavLink
                                    to="/blogs"
                                    onClick={toggleMobileMenu}
                                    className="font-semibold text-black hover:text-blue-700"
                                >
                                    Blogs
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/seminar-webinar"
                                    onClick={toggleMobileMenu}
                                    className="font-semibold text-black hover:text-blue-700"
                                >
                                    Seminar-Webinar
                                </NavLink>

                            </li>
                            <li>
                                <NavLink
                                    to="/events"
                                    onClick={toggleMobileMenu}
                                    className="font-semibold text-black hover:text-blue-700"
                                >
                                    Events
                                </NavLink>

                            </li>
                        </ul>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        ` text-base block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`}>
                                    Home
                                </NavLink>
                            </li>

                            <li className="relative">
                                <NavLink
                                    to="/student-corner"
                                    className={({ isActive }) =>
                                        `text-base block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }>
                                    Student Corner
                                </NavLink>

                            </li>


                            <li>
                                <NavLink
                                    to="/blogs"
                                    className={({ isActive }) =>
                                        ` text-base block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`}>
                                    Blogs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/seminar-webinar"
                                    className={({ isActive }) =>
                                        ` text-base block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`}>
                                    Seminar-Webinar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        ` text-base block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`}>
                                    Events
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

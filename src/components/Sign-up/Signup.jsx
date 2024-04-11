import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    return (
        <>
            <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-5 ">
                <div class="p-8 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 class="font-bold text-center text-2xl mb-5">Sign up</h1>
                    <div class="transition-shadow duration-500 ease-in-out bg-white shadow-md hover:shadow-2xl  w-full rounded-lg ">
                        <div class="px-5 pt-12 pb-5">
                            {/* form */}

                            <input type="text" placeholder='firstname' class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <input type="text" placeholder='lastname' class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <input type="tel" placeholder='phone' class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <input type="email" placeholder='email' class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <input type="Password" placeholder='Password' class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                            <div className='text-center'>

                                <button type="button" class="transition duration-200 bg-blue-500 hover:bg-blue-600  focus:ring-4  text-white w-40 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center m-auto">
                                    <span class="inline-block mr-2">Sign-up</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>

                            </div>
                            {/* form */}
                        </div>
                        {/* optional */}
                        <div className='font-normal text-xs rounded-lg text-center text-gray-500' >
                            <span class="inline-block ml-1 mb">Or Sign-up using</span>
                        </div>
                        <div class="p-5">
                            <div class="grid grid-cols-2 gap-1">


                                <Link
                                    to={'*'}
                                    type="button"
                                    class="transition-colors duration-400 ease-in-out border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md hover:text-white hover:bg-blue-500 font-normal text-center inline-block">
                                    Google
                                </Link>
                                <Link
                                    to={'*'}
                                    type="button"
                                    class="transition-colors duration-400 ease-in-out border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md hover:text-white hover:bg-blue-500 font-normal text-center inline-block">
                                    Github
                                </Link>

                            </div>
                        </div>                     
                    </div>
                    <div class="py-5">
                        <div class="grid grid-cols-2 gap-1">
                            <div class="text-center sm:text-left whitespace-nowrap">
                                <Link to={'/'} class="transition duration-200 mx-0 px-3 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 20l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span class="inline-block ml-1 mb">Back to your-app.com</span>
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

export default Signup
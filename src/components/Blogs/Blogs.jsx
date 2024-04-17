import { Card, CardBody } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'


function Blogs() {
  const user = useSelector((state) => state.auth.status);
    

  if (!user) {
      // alert("Please login to upload project");
      return <Navigate to="/login" />;
  }


  return (
    <>
      <div className='container mx-auto my-4 px-10 rounded-lg'>
        <h1 className='text-5xl font-bold my-4'>Blogs</h1>
        <div className='flex-col'>
          <Card className='rounded-xl'>
            <CardBody className='p-4'>
              <img className='rounded-lg' src="https://picsum.photos/1800/700?random=2" />
              <h2 className="text-2xl font-semibold my-3">hello</h2>
              <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium velit, deserunt beatae esse ipsa expedita, culpa ipsum, rerum veritatis provident fugit a commodi! Optio minus impedit dolor ea cupiditate quisquam!</p>
              <Link to="card" className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </CardBody>
          </Card>
        </div>
{/* ****** */}
        <div className="mt-5 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center ">

          <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:border-gray-700" style={{ backgroundImage: 'url("https://picsum.photos/800/400")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className='rounded-lg bg-white bg-opacity-50 backdrop-blur-none backdrop-filter p-2'>
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p className="mb-3 font-normal text-black">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="/bolg" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
          <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:border-gray-700" style={{ backgroundImage: 'url("https://picsum.photos/700/400")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className='rounded-lg bg-white bg-opacity-50 backdrop-blur-none backdrop-filter p-2'>
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p className="mb-3 font-normal text-black">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>

          <div className="max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:border-gray-700" style={{ backgroundImage: 'url("https://picsum.photos/600/400")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className='rounded-lg bg-white bg-opacity-50 backdrop-blur-none backdrop-filter p-2'>
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p className="mb-3 font-normal text-black">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blogs
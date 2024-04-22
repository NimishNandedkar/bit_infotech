import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '@material-tailwind/react';
import axios from 'axios';
import parse from "html-react-parser";

function Blogs() {

  // ************************************

  // Remove unused variables
  const[data, setData] = React.useState(null); // Initialize data state as null

  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/blogs`, {
          withCredentials: true,
            });
        console.log(response);
        // setBlogs(response.data.data);
        // setLoading(false);

        //set the data to the local storage 
        localStorage.setItem('blogs', JSON.stringify(response.data.data));

        //get the data from the local storage in array format
        const data = await JSON.parse(localStorage.getItem('blogs'));
        console.log(data);
        setData(data);

      } catch (error) {
        console.error('Error fetching blogs:', error);
        // setLoading(false);
      }
    }

    getBlogs();
  }, []);


  // ************************************


  return (

    <>
      {!data ? <h1>Loading...</h1> :
        <div className='container mx-auto my-4 px-10 rounded-lg '>
          <h1 className='text-5xl font-bold my-4'>Blogs</h1>
          <div className='flex-col '>
            <Card key={data[0]._id} className='rounded-xl'>
              <CardBody className='p-4'>
                <img className='rounded-lg ' src={data[0].headerImage} alt={data[0].blogTitle} />
                <h2 className=" my-3 mb-2 text-2xl font-bold tracking-tight text-gray-900">{data[0].blogTitle}</h2>

                <p className="w-full h-80  rounded-xl p-4 overflow-hidden ">{parse(data[0].blogContent)}</p>

                <Link to={`/blog/${data[0]._id}`} className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </CardBody>
            </Card>

          </div>

          {/* Add more blog entries as needed */}

          <div className="mt-5 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center overflow-hidden">
            {data.slice(1, 4).map((blog, index) => (
              <div key={index} className="max-w-sm p-4 border border-gray-200 rounded-lg shadow dark:border-gray-700" style={{ backgroundImage: `url(${blog.headerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className='bg-opacity-50 backdrop-blur-none backdrop-filter w-full h-80 bg-gray-200 rounded-xl p-4 overflow-hidden'>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{blog.blogTitle}</h5>
                  </a>
                  <p className="mb-3 font-normal text-black">{parse(blog.blogContent)}</p>
                </div>
                <div className='flex justify-center'></div>
                <Link to={`/blog/${blog._id}`} className="mt-5 mb-0 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          {/* ************************************/}
        </div>
      }
    </>
    // <></>
  );
}

export default Blogs;
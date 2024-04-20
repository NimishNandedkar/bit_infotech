import React, { useEffect } from 'react'
import { Card, CardBody } from '@material-tailwind/react'
import axios from 'axios';
import parse from "html-react-parser";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Cards() {
    const [blog, setBlog] = React.useState([]);
    const [error, setError] = React.useState(null); // Add error state
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.status);

    const { id } = useParams() //this hook is used to get the id from the url for example if the url is /blogs/1 then the id will be 1

    console.log(id);
    

    useEffect(() => {
        async function getBlogs() {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/blog/${id}`, {
              withCredentials: true,
            });
            console.log(response.data.data);
            setBlog(response.data.data);
            //set the data to the local storage 
            localStorage.setItem('blog', JSON.stringify(response.data.data));
    
            //get the data from the local storage in array format
            const data = JSON.parse(localStorage.getItem('blog'));
            console.log(data);
    
          } catch (error) {
            console.error('Error fetching blogs:', error);
            setError('Failed to fetch blogs'); // Set error state
          }
        }
    
        getBlogs();
      }, [id]);


      useEffect(() => {
        if (!user) {
          navigate('/login');
        }
      }
        , [user, navigate]);


    return (
        <>
            <div className='container mx-auto my-4 px-4 rounded-lg'>
                <h1 className='text-5xl font-bold my-4'>Blogs</h1>
                {error && <p>{error}</p>} {/* Display error message */}
                <div className='flex-col'>
                        <Card key={blog._id} className='rounded-xl'>
                            <CardBody className='p-4'>
                                <img className='rounded-lg' src={blog.headerImage} alt={blog.blogTitle} />
                                <h2 className="text-2xl font-semibold my-3">{blog.blogTitle}</h2>
                                <p className="text-gray-500">{parse(`${blog.blogContent}`)}</p>
                            </CardBody>
                        </Card>
                </div>
            </div>
        </>
    )
}

export default Cards

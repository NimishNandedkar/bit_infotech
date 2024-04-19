import React, { useEffect, useState } from 'react';
import { BlogDetail } from '../../../BACKEND/src/models/blog.model';
import axios from 'axios';
import CreateBlog from './CreateBlog';

const EditBlog = ({isModalOpen , setIsModalOpen , selectedBlogId , setSelectedBlogId }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]); // Initialize blogs state as an empty array
  const [reqToUpdate, setReqtoUpdate] = useState(true);

  console.log("blog id start", selectedBlogId);
  console.log("is Modal open start ", isModalOpen);

 
  const handleEditBlog = async(value)=>{

    // axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/blogDetail/${selectedBlogId}`)
    //   .then(response => {
    //     setBlogs(response.data.data);
    //     // setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching blogs:', error);
    //     // setLoading(false);
    //   });


    if (value && selectedBlogId) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/blogDetail/${selectedBlogId}`);
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    }


    if(value){
      setIsOpen(value);
     setIsModalOpen(value);
    }
    else if(!value){
      setIsOpen(value);
      setIsModalOpen(value)
      setSelectedBlogId(null)
    }
  }
  
  useEffect(()=>{
  
    handleEditBlog(isModalOpen)

  },[isModalOpen, selectedBlogId])


  const { blogTitle , headerImage , blogContent , category} = blogs ;   // Destructing the form data recevied form get request 
 

  return (
    <div className="p-3">

      {/* overlay */}
      <div id="modal_overlay" className={isOpen ? " absolute inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0" : "hidden"}>

        {/* modal */}
        <div id="modal" className={isOpen ? 'overflow-y-auto opacity-100 transform translate-y-0 scale-100 relative w-3/4 md:w-10/12 h-1/2 md:h-3/4 bg-white rounded shadow-lg transition-opacity transition-transform duration-300' : "overflow-scroll opacity-0 transform -translate-y-full scale-150 relative w-10/12 md:w-1/2 h-1/2 md:h-3/4 bg-white rounded shadow-lg transition-opacity transition-transform duration-300"}>

          {/* button close */}
          <button onClick={() => handleEditBlog(false)} className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white">
            &times;
          </button>

          {/* header */}
          <div className="px-4 py-3 border-b border-gray-200 ">
            <h2 className="text-xl font-semibold text-gray-600">{blogs.blogTitle} </h2> <span className='justify-items-end justify-end items-end'>Blog id :{blogs._id}</span>
          </div>

          {/* body */}
          <div className="w-full p-3   ">
            <CreateBlog  reqToUpdate={reqToUpdate} blogTitle={blogTitle} headerImage={headerImage} blogContent={blogContent} category={category} selectedBlogId={selectedBlogId} />
          </div>

          {/* footer */}
          <div className="relative  px-4 py-3 border-t border-gray-200 w-full flex justify-center items-center gap-3">
           
            <button onClick={() => handleEditBlog(false)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Close</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditBlog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditBlog from './EditBlog';



const BlogManage = () => {
  const [blogs, setBlogs] = useState([]); // Initialize blogs state as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);


  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/blogDetail`)
      .then(response => {
        setBlogs(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);



  const handleEdit = (id) => {
    
    setSelectedBlogId(id);
    setIsModalOpen(true)
    
  };

  
 
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to your backend API endpoint to delete the blog
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/blogs/deleteblog/${id}`);
  
      // Remove the deleted blog from the local state
      const updatedBlogs = blogs.filter(blog => blog._id !== id);
      setBlogs(updatedBlogs);
  
      console.log('Deleted blog with id:', id);
    } catch (error) {
      console.error('Error deleting blog:', error);
      // Handle error if deletion fails (e.g., show a message to the user)
    }
  };
  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = loading ? [] : blogs.slice(indexOfFirstBlog, indexOfLastBlog); // Handle loading state

  const renderTableBody = () => {
    if (loading) {
      return <tr key="loading"><td colSpan="2">Loading...</td></tr>;
    }
    if (!blogs || blogs.length === 0) {
      return <tr key="no-blogs"><td colSpan="2">No blogs found.</td></tr>;
    }
    return currentBlogs.map(blog => (
      <tr key={blog._id} className="hover:bg-sky-200">
        <th className=" py-4 px-6 pr-0 border-b border-grey-light font-bold border-r-2">{blog.blogTitle}</th>
        <th className="w-2/6 py-4 px-6 border-b border-grey-light justify-center items-center ">
          <button onClick={() => handleEdit(blog._id)} className="text-grey-lighter font-bold py-1 px-3 rounded text-sm  hover:bg-green-400">Edit</button>
          <button onClick={() => handleDelete(blog._id)} className="text-grey-lighter font-bold py-1 px-3 rounded text-sm bg-blue hover:bg-red-400">Delete</button>
        </th>
      </tr>
    ));
  };

  return (
    <div className="w-2/3 mx-auto">


      <EditBlog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedBlogId={selectedBlogId} setSelectedBlogId={setSelectedBlogId} />
      
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr className='bg-blue-400'>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light border-r-2">City</th>
              
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderTableBody()}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center">
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          disabled={currentBlogs.length < blogsPerPage}
        >
          Next
        </button>
      
      </div>

      
    </div>
  );
};

export default BlogManage;

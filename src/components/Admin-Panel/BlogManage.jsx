// import React, { useState } from 'react';

// const BlogManage = () => {
//   const [blogs, setBlogs] = useState([
//     { id: 1, blog: 'Blog 1' },
//     { id: 2, blog: 'Blog 2' },
//     { id: 3, blog: 'Blog 3' },
//     { id: 4, blog: 'Blog 4' },
//     { id: 5, blog: 'Blog 5' },
//   ]);

//   const handleEdit = (id) => {
//     console.log('Edit blog with id:', id);
//     // Implement edit functionality here
//   };

//   const handleDelete = (id) => {
//     console.log('Delete blog with id:', id);
//     // Implement delete functionality here

//     // Filter out the blog with the given id
//     const updatedBlogs = blogs.filter(blog => blog.id !== id);
//     // Update the state with the filtered list
//     setBlogs(updatedBlogs);
//     console.log('Deleted blog with id:', id);
//   };

//   return (
//     <div className="w-2/3 mx-auto">
//       <div className="bg-white shadow-md rounded my-6">
//         <table className="text-left w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">City</th>
//               <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.map(blogs => (
//               <tr key={blogs.id} className="hover:bg-sky-200">
//                 <td className="py-4 px-6 border-b border-grey-light font-bold">{blogs.blog}</td>
//                 <td className="py-4 px-6 border-b border-grey-light">
//                   <button onClick={() => handleEdit(blogs.id)} className="text-grey-lighter font-bold py-1 px-3 rounded text-sm  hover:bg-green-400">Edit</button>
//                   <button onClick={() => handleDelete(blogs.id)} className="text-grey-lighter font-bold py-1 px-3 rounded text-sm bg-blue hover:bg-red-400">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BlogManage;



import React, { useState } from 'react';

const BlogManage = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, blog: 'Blog 1' },
    { id: 2, blog: 'Blog 2' },
    { id: 3, blog: 'Blog 3' },
    { id: 4, blog: 'Blog 4' },
    { id: 5, blog: 'Blog 5' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(3);

  const handleEdit = (id) => {
    console.log('Edit blog with id:', id);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log('Delete blog with id:', id);
    // Implement delete functionality here

    // Filter out the blog with the given id
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    // Update the state with the filtered list
    setBlogs(updatedBlogs);
    console.log('Deleted blog with id:', id);
  };

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-2/3 mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">City</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map(blog => (
              <tr key={blog.id} className="hover:bg-sky-200">
                <td className="py-4 px-6 border-b border-grey-light font-bold">{blog.blog}</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <button onClick={() => handleEdit(blog.id)} className="text-grey-lighter font-bold py-1 px-3 rounded text-sm  hover:bg-green-400">Edit</button>
                  <button onClick={() => handleDelete(blog.id)} className="text-grey-lighter font-bold py-1 px-3 rounded text-sm bg-blue hover:bg-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          onClick={() => paginate(currentPage + 1)} 
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

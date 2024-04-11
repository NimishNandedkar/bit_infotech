import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import DropdownButton from '../StudentCorner/ProjectUpload/Dropdown';
function CreateBlog() {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const categories = ["Development","Data Science" , "Big Data" , "Accounting"]; //DropDown content
  
  const config = {
    readonly: false,
    placeholder: 'Start typing...',
    minHeight:250,
    // cleanHTML: true
  };

  const handleSubmit = (e) => {
     e.preventDefault();
    // Handle blog submission logic
    console.log('Blog content:', content);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="mx-360 max-w-screen-2xl p-6 flex-none sm:flex-initial justify-center">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Blog Title :</label>
          <input type="text" id="title" placeholder="Write your title here" className="block w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:border-blue-500" />
        </div>
        



<div className="mb-6">
      <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2">Attach Blog Header Image :</label>
      <div className="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-blue-500 transition duration-150 ease-in-out">
        <input
          type="file"
          id="fileAttachment"
          name="fileAttachment"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        <div className="flex items-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span className="ml-2 text-sm text-gray-600">{selectedFile ? selectedFile.name : 'Choose a file'}</span>
        </div>
        <span className="text-sm text-gray-500">Max file size: 5MB</span>
      </div>
    </div>
        
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={newContent => setContent(newContent)}
          onChange={newContent => {}}
        />
        <p>{content}</p>

        <DropdownButton dropDownContent ={categories} dropDownInitialValue = "Select Category" />
        
        <div className="flex items-center justify-between">
          <button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2">
            Upload
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="#fff">
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
            </svg>
          </button>
         
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;



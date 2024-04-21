import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import DropdownButton from '../StudentCorner/ProjectUpload/Dropdown';
import ServerResponsePopup from '../../MessagePopUp/ServerResponsePopup';


import axios from 'axios';

function CreateBlog({ blogTitle = "", headerImage = "", blogContent = "", category = "", selectedBlogId = "", reqToUpdate = false }) {

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [fileInputValue, setFileInputValue] = useState('');


  const [isFormSubmitted, setIsFormSubmitted] = useState('')

  const [isError, setIsError] = useState(false)

  const [formData, setFormData] = useState({
    blogTitle: '',
    headerImage: null, // Changed to null for file type
    category: '',
  });

  // Update form data with props values if they exist
  useEffect(() => {
    setFormData({
      blogTitle: blogTitle || '',
      headerImage: headerImage || null,
      category: category || '',
    });
    setContent(blogContent || ''); // Assuming blogContent is HTML content
  }, [blogTitle, headerImage, blogContent, category]);


  console.log(blogTitle, headerImage, blogContent, category);

  const categories = ["Development", "Data Science", "Big Data", "Accounting"]; //DropDown content

  const config = {
    readonly: false,
    placeholder: 'Start typing...',
    minHeight: 250,
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileInputValue(file.name);
    setFormData(prevState => ({
      ...prevState,
      headerImage: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const formDataToSend = new FormData();
      formDataToSend.append('blogTitle', formData.blogTitle);
      // formDataToSend.append('headerImage', formData.headerImage);
      formDataToSend.append('blogContent', content);
      formDataToSend.append('category', formData.category);


      if (formData.headerImage) {
        formDataToSend.append('headerImage', formData.headerImage);
      }

      console.log(formDataToSend.category);

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs/createblog`, formDataToSend);

      handleSuccess(response.data.message);


    } catch (error) {

      handleError(error);
      console.log("Error creating blog From Frontend ", error);
    } finally {
      // Set isSubmitClicked to true
      setIsSubmitClicked(true)



    }
  };



  const resetForm = () => {
    // Reset form state
    setFormData({
      blogTitle: '',
      headerImage: null,
      category: '',
    });

    // reset the category
    setIsFormSubmitted(true)

    // Reset content for Jodit editor 
    setContent('');

    // Reset the file input field
    setFileInputValue('');
  };


  const handleSuccess = (message) => {
    setIsError(false);
    setServerResponse(message);

    if (!reqToUpdate) {
      resetForm();
    }

    setIsFormSubmitted(true)



    console.log('Server response:', message);

  };

  const handleError = (error) => {

    setIsError(true);
    setServerResponse(error.response.data.message);

    setIsFormSubmitted(false)
    console.log('Server response error:', error.response.data.message);
  };


  // Function to reset isError and isFormSubmitted
  const resetErrorAndSubmitted = () => {
    setIsError(false);
    setIsFormSubmitted(false);
    setIsSubmitClicked(false)
  };




  const handleUpdateBlog = async (e) => {

    e.preventDefault();




    try {

      const formUpdatedDataSend = new FormData();
      formUpdatedDataSend.append('blogTitle', formData.blogTitle);
      // formUpdatedDataSend.append('headerImage', formData.headerImage);
      formUpdatedDataSend.append('blogContent', content);
      formUpdatedDataSend.append('category', formData.category);


      if (formData.headerImage) {
        formUpdatedDataSend.append('headerImage', formData.headerImage);
      }


      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/blogs/updateblog/${selectedBlogId}`, formUpdatedDataSend);
      // Handle success

      handleSuccess(response.data.message);

      console.log('Blog updated successfully');
    } catch (error) {
      // Handle error
      handleError(error);
      console.error('Error updating blog:', error);
    } finally {

      // Set isSubmitClicked to true
      setIsSubmitClicked(true)

    }


  };





  console.log("request to update :", reqToUpdate);

  return (
    <div className="mx-360 max-w-screen-2xl p-6 flex-none sm:flex-initial justify-center bg-white rounded-lg">


      {serverResponse && <ServerResponsePopup isSubmitClicked={isSubmitClicked} isFormSubmitted={isFormSubmitted} message={serverResponse} isError={isError} resetErrorAndSubmitted={resetErrorAndSubmitted} />}


      <form onSubmit={reqToUpdate ? handleUpdateBlog : handleSubmit}>
        <div className="mb-4 ">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Blog Title :</label>
          <input
            type="text"
            id="title"
            name="blogTitle" // Added name attribute for form data binding
            value={formData.blogTitle} // Binding value to state
            onChange={handleChange} // Binding onChange event
            placeholder="Write your title here"
            className="block w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"

          />
        </div>

        <div className="mb-6">
          <label htmlFor="fileAttachment" className="block text-gray-700 text-sm font-bold mb-2">{headerImage ? "Your current file Url: " + headerImage : "Attach Blog Header Image :"}</label>
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
              <span className="ml-2 text-sm text-gray-600">{formData.headerImage ? formData.headerImage.name : (headerImage ? headerImage : "Choose you a file")} </span>
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
          onChange={newContent => { }}

        />

        <div >
          <DropdownButton
            dropDownContent={categories}
            dropDownInitialValue={formData.category || "Select Category"}
            name="category" // Added name attribute for form data binding
            onSelect={(category) => setFormData(prevState => ({
              ...prevState,
              category: category
            }))}

            isFormSubmitted={isFormSubmitted}
            setIsFormSubmitted={setIsFormSubmitted}

          />
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2">
            {reqToUpdate ? "Update" : "Upload"}
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
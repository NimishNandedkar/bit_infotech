import React, { useState } from 'react';
import axios from 'axios';
import DropdownButton from '../StudentCorner/ProjectUpload/Dropdown';
import ServerResponsePopup from '../../MessagePopUp/ServerResponsePopup';


const CreateWebinar = () => {

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  
  const [isFormSubmitted, setIsFormSubmitted] = useState('')

  const [isError, setIsError] = useState(false)

  const [webinarData, setWebinarData] = useState({
    title: '',
    category: '',
    description: '',
    videoUrl: ''
  });

  const handleChange = (e) => {
    setWebinarData({
      ...webinarData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/webinars/create-webinar/`, webinarData);
      console.log(response.data);
      // Optionally, you can redirect or show a success message here
      handleSuccess(response.data.message);

    } catch (error) {
      handleError(error.response.data.message);
      console.error('Error creating webinar:', error.response);
      // Handle error
    }finally{
      // Set isSubmitClicked to true
      setIsSubmitClicked(true)
    }
  };

  
  const resetForm = () => {
    // Reset form state
    setWebinarData({
      title: '',
    category: '',
    description: '',
    videoUrl: ''
    });

    // reset the category
    setIsFormSubmitted(true)
  };


  const handleSuccess = (message) => {
    setIsError(false);
    setServerResponse(message);

    resetForm();
    // if (!reqToUpdate) {
    //   resetForm();
    // }

    setIsFormSubmitted(true)



    console.log('Server response:', message);

  };

  const handleError = (message) => {

    setIsError(true);
    setServerResponse(message);
   
    console.log("is Error",isError);

    setIsFormSubmitted(false)
    console.log('Server response error:', message);
  };

  
  // Function to reset isError and isFormSubmitted
  const resetErrorAndSubmitted = () => {
    setIsError(false);
    setIsFormSubmitted(false);
    setIsSubmitClicked(false)
  };

  
  return (
    <div className="max-w-md mx-auto"> 
      
      {serverResponse && <ServerResponsePopup isSubmitClicked={isSubmitClicked} isFormSubmitted={isFormSubmitted} message={serverResponse} isError={isError} resetErrorAndSubmitted={resetErrorAndSubmitted} />}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Add New Webinar</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Webinar Title"
            name="title"
            value={webinarData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Category"
            name="category"
            value={webinarData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Webinar Description"
            name="description"
            value={webinarData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoUrl">
            Video URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoUrl"
            type="text"
            placeholder="Video URL"
            name="videoUrl"
            value={webinarData.videoUrl}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Webinar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWebinar;

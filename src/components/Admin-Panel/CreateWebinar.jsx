import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropdownButton from '../StudentCorner/ProjectUpload/Dropdown';
import ServerResponsePopup from '../../MessagePopUp/ServerResponsePopup';


const CreateWebinar = ({ selectedProject="" , reqToUpdate = false }) => {

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState('')
  const [isError, setIsError] = useState(false)
  const [selecteditem , setSelecteditem] = useState("Select Category")
  const [open , setOpen] = useState(false)

  const categories = ["Development", "Data Science", "Big Data", "Accounting"]; //DropDown content

  const [webinarData, setWebinarData] = useState({
    title: '',
    // category: '',
    description: '',
    videoUrl: ''
  });

  // Update form data with props values if they exist
  useEffect(() => {

    const {title, category ,description , videoUrl} = selectedProject; 

    setWebinarData({
      title: title ||'',
      category: category || '',
      description: description || '',
      videoUrl: videoUrl ||  ''
    });
  }, [selectedProject]);

  



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
      console.log(webinarData);
      // Handle error
    }finally{
      // Set isSubmitClicked to true
      setIsSubmitClicked(true)
    }
  };

  
  const handleUpdateWebinar = async (e) => {

    e.preventDefault();
    try {

        const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/webinars/update-webinar/${selectedProject._id}`, webinarData);
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

  
  const resetForm = () => {
    // Reset form state
    setWebinarData({
      title: '',
    category: '',
    description: '',
    videoUrl: ''
    });
    setSelecteditem("Select Category")
    
    // reset the category
    setIsFormSubmitted(true)
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

  

  const handleOnSelect = (value)=>{
    setWebinarData(prevState => ({
      ...prevState,
      category: value 
    }));
    setSelecteditem(value);
    setOpen(false);

  }

  
  return (
    <div className="max-w-md mx-auto"> 
      
      {serverResponse && <ServerResponsePopup isSubmitClicked={isSubmitClicked} isFormSubmitted={isFormSubmitted} message={serverResponse} isError={isError} resetErrorAndSubmitted={resetErrorAndSubmitted} />}
      <form onSubmit={reqToUpdate ? handleUpdateWebinar : handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

          <DropdownButton 
          dropDownContent={categories}  
          dropDownInitialValue ={reqToUpdate ? webinarData.category : selecteditem} 
          onSelect={handleOnSelect}
          />
          {/* <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Category"
            name="category"
            value={webinarData.category}
            onChange={handleChange}
          /> */}
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
            {reqToUpdate ? "Update Webinar" : "Create Webinar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWebinar;

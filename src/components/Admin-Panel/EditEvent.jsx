// import React, { useState } from 'react';
// import CreateEventDialog from '../Modal';
// import { Button, TextField } from '@mui/material';
// import DropdownButton from '../StudentCorner/ProjectUpload/Dropdown';
// import axios from 'axios';

// function CreateEvents() {
//   const [formData, setFormData] = useState({
//     imageUrl: '',
//     EventName: '',
//     HostName: '',
//     Subject: '',
//     EventDate: '',
//     Address: '',
//     City: '',
//     State: '',
//     Description: '',
//     Website: '',
//     Twitter: '',
//     LinkedIn: '',
//     Instagram: '',
//     Postal: '',
//     Categories: '',
//   });

//   console.log(formData);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
    
//     // Special handling for date field
//     if (name === "EventDate") {
//       const dateValue = new Date(value); // Convert the string value to a Date object
//       const year = dateValue.getFullYear();
//       const month = String(dateValue.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//       const day = String(dateValue.getDate()).padStart(2, '0');
//       const formattedDate = `${year}-${month}-${day}`;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: formattedDate,
//       }));
//     } else {
//       // For other fields and file upload, treat them normally
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: event.target.files ? event.target.files[0] : value,
//       }));
//     }
//   };
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     // Create FormData object
//     const formDataToSend = new FormData();
//     formDataToSend.append('imageUrl', formData.imageUrl); // Append the file directly
  
//     // Append other form fields
//     formDataToSend.append('eventName', formData.EventName);
//     formDataToSend.append('hostName', formData.HostName);
//     formDataToSend.append('subject', formData.Subject);
//     formDataToSend.append('eventDate', formData.EventDate); // Ensure eventDate is appended correctly
//     formDataToSend.append('address', formData.Address);
//     formDataToSend.append('city', formData.City);
//     formDataToSend.append('state', formData.State);
//     formDataToSend.append('description', formData.Description);
//     formDataToSend.append('website', formData.Website);
//     formDataToSend.append('twitter', formData.Twitter);
//     formDataToSend.append('linkedIn', formData.LinkedIn);
//     formDataToSend.append('instagram', formData.Instagram);
//     formDataToSend.append('postal', formData.Postal);
//     formDataToSend.append('categories', formData.Categories);
  
//     // Send FormData object using axios
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/events/createEvent`, formDataToSend, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       // Handle success, maybe redirect the user or show a success message
//       if (response.status === 201) {
//         console.log('Event created successfully');
//       } else {
//         console.log('Error creating event');
//       }
//     } catch (error) {
//       console.error('Error creating event:', error);
//     }
  
//     handleClose();
//   };
  

//   const handleFileChange = (event) => {
//     const file = event.target.files[0]; // Use event.target.files instead of event.target.file
//     console.log(file);
//     setFormData((prevData) => ({
//       ...prevData,
//       imageUrl: file, // Store the file directly in the formData
//     }));
//   };
  

//   const [seleteditem, setSeleteditem] = useState('select categories') // [selected item, set selected item]
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   }

//   const handleClose = () => {
//     setOpen(false);
//   }

//   const handleonSelect = (value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       Categories: value,
//     }));
//     setSeleteditem(value);
//     setOpen(false); // Close the dropdown after selecting an option
//   };

//   return (
//     <div className="max-w-screen-lg p-6 flex-none sm:flex-initial justify-center bg-white rounded-lg m-auto scroll-m-10">
//       <div className="scrollable-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
//         <h1 className="text-2xl font-bold text-center">Create Event</h1>
//         <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4 p-6">
//           <div className="w-full flex border border-gray-300 focus:border-blue-600 rounded-md p-3">

//             <input type="file" onChange={handleFileChange} />
//             {/* file upload */}
//           </div>

//           <TextField label="Event Name" name="EventName" fullWidth onChange={handleChange} />
//           <TextField label="Host Name" name="HostName" fullWidth onChange={handleChange} />
//           <TextField label="Subject" name="Subject" fullWidth onChange={handleChange} />
//           <TextField type="date" label="Event Date" name='EventDate' focused={true} fullWidth onChange={handleChange} />
//           <TextField label="Address" name="Address" fullWidth onChange={handleChange} />
//           <TextField label="City" name="City" fullWidth onChange={handleChange} />
//           <TextField label="State" name="State" fullWidth onChange={handleChange} />
//           <TextField label="Description" name="Description" multiline rows={4} fullWidth onChange={handleChange} />
//           <TextField label="Website" name="Website" fullWidth onChange={handleChange} />
//           <TextField label="Twitter" name="Twitter" fullWidth onChange={handleChange} />
//           <TextField label="LinkedIn" name="LinkedIn" fullWidth onChange={handleChange} />
//           <TextField label="Instagram" name="Instagram" fullWidth onChange={handleChange} />
//           <TextField label="Postal" name="Postal" fullWidth onChange={handleChange} />
//           <DropdownButton dropDownContent={["Category 1", "Category 2", "Category 3"]} dropDownInitialValue={seleteditem} onSelect={handleonSelect} />
//           <Button variant="outlined" type="submit">Create Event</Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateEvents;


import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import axios from 'axios';

function UpdateEventsModal({ eventData , isModalOpen , setIsModalOpen , selectedBlogId , setSelectedBlogId  }) {
    const [formData, setFormData] = useState({ ...eventData });
    const [open, setOpen] = useState(isModalOpen);


  const handleOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/events/updateEvent/${eventData.id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Event updated successfully');
        handleClose();
      } else {
        console.log('Error updating event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Open Update Event Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <h1 className="text-2xl font-bold text-center">Update Event</h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4 p-6">
            {/* Render form fields with values from formData */}
            <TextField label="Event Name" name="EventName" value={formData.EventName} fullWidth onChange={handleChange} />
            <TextField label="Host Name" name="HostName" value={formData.HostName} fullWidth onChange={handleChange} />
            {/* Add other fields here */}
            <TextField label="Subject" name="Subject" value={formData.Subject} fullWidth onChange={handleChange} />
            <TextField type="date" label="Event Date" name="EventDate" value={formData.EventDate} fullWidth onChange={handleChange} />
            <TextField label="Address" name="Address" value={formData.Address} fullWidth onChange={handleChange} />
            <TextField label="City" name="City" value={formData.City} fullWidth onChange={handleChange} />
            <TextField label="State" name="State" value={formData.State} fullWidth onChange={handleChange} />
            <TextField label="Description" name="Description" value={formData.Description} multiline rows={4} fullWidth onChange={handleChange} />
            <TextField label="Website" name="Website" value={formData.Website} fullWidth onChange={handleChange} />
            <TextField label="Twitter" name="Twitter" value={formData.Twitter} fullWidth onChange={handleChange} />
            <TextField label="LinkedIn" name="LinkedIn" value={formData.LinkedIn} fullWidth onChange={handleChange} />
            <TextField label="Instagram" name="Instagram" value={formData.Instagram} fullWidth onChange={handleChange} />
            <TextField label="Postal" name="Postal" value={formData.Postal} fullWidth onChange={handleChange} />
            <TextField label="Categories" name="Categories" value={formData.Categories} fullWidth onChange={handleChange} />
            {/* Add other fields here */}
            <Button variant="outlined" type="submit">Update Event</Button>
            <Button onClick={handleClose}>Close</Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default UpdateEventsModal;

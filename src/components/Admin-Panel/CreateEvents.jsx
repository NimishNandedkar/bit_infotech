import React, { useEffect, useState } from 'react';
import CreateEventDialog from '../Modal';
import { Button, TextField } from '@mui/material';
import DropdownButton from '../StudentCorner/ProjectUpload/Dropdown';
import axios from 'axios';
import { Linkedin } from 'react-feather';
import Alertjsx from '../Alert/Alert';
import { useNavigate } from 'react-router-dom';

function CreateEvents({ selectedProject = "", requestToUpdate = false }) {



  const courses = ["Web Development", "Artificial Intelligence", "Tally Prime Gst", "Digital Marketing"]
  const [alertopen, setAlertopen] = useState(false);
  const [alermessage, setAlermessage] = useState('');
  const [alertseverity, setAlertseverity] = useState('success');


  const alerthandleClose = () => {
    setAlertopen(false);
    useNavigate('/admin/events-manage');
  }
  const [formData, setFormData] = useState({
    imageUrl: null,
    EventName: '',
    HostName: '',
    Subject: '',
    EventDate: '',
    Address: '',
    City: '',
    State: '',
    Description: '',
    Website: '',
    Twitter: '',
    LinkedIn: '',
    Instagram: '',
    Postal: '',
    Categories: '',
  });

  console.log(formData);

  useEffect(() => {
    const { imageUrl, eventName, hostName, subject, eventDate, address, city, state, description, website, twitter, linkedIn, instagram, postal, categories } = selectedProject;

    setFormData({
      imageUrl: imageUrl || null,
      EventName: eventName || '',
      HostName: hostName || '',
      Subject: subject || '',
      EventDate: eventDate || '',
      Address: address || '',
      City: city || '',
      State: state || '',
      Description: description || '',
      Website: website || '',
      Twitter: twitter || '',
      LinkedIn: linkedIn || '',
      Instagram: instagram || '',
      Postal: postal || '',
      Categories: categories || '',
    })

  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Special handling for date field
    if (name === "EventDate") {
      const dateValue = new Date(value); // Convert the string value to a Date object
      const year = dateValue.getFullYear(); // Get the year (e.g., 2024)
      const month = dateValue.getMonth() + 1; // Get the month (0-indexed, so add 1)
      const day = dateValue.getDate(); // Get the day of the month
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`; // Format the date as "YYYY-MM-DD"
      console.log(formattedDate);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      // For other fields and file upload, treat them normally
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.files ? event.target.files[0] : value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append('imageUrl', formData.imageUrl); // Append the file directly

    // Append other form fields
    formDataToSend.append('eventName', formData.EventName);
    formDataToSend.append('hostName', formData.HostName);
    formDataToSend.append('subject', formData.Subject);
    formDataToSend.append('eventDate', formData.EventDate); // Ensure eventDate is appended correctly
    formDataToSend.append('address', formData.Address);
    formDataToSend.append('city', formData.City);
    formDataToSend.append('state', formData.State);
    formDataToSend.append('description', formData.Description);
    formDataToSend.append('website', formData.Website);
    formDataToSend.append('twitter', formData.Twitter);
    formDataToSend.append('linkedIn', formData.LinkedIn);
    formDataToSend.append('instagram', formData.Instagram);
    formDataToSend.append('postal', formData.Postal);
    formDataToSend.append('categories', formData.Categories);

    // Send FormData object using axios
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/events/createEvent`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success, maybe redirect the user or show a success message
      if (response.status === 201) {
        console.log('Event created successfully');
        setAlertopen(true);
        setAlermessage('Event created successfully');
        setAlertseverity('success');

      } else {
        console.log('Error creating event');
        setAlertopen(true);
        setAlermessage('Error creating event');
        setAlertseverity('error');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setAlertopen(true);
      setAlermessage('Error creating event');
      setAlertseverity('error');
    }

    handleClose();
  };

  const updateEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/events/updateEvent/${selectedProject._id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Event updated successfully');
        setAlertopen(true);
        setAlermessage('Event updated successfully');
        setAlertseverity('success');
      } else {
        console.log('Error updating event');
        setAlertopen(true);
        setAlermessage('Error updating event');
        setAlertseverity('error');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }


  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Use event.target.files instead of event.target.file
    console.log(file);
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: file, // Store the file directly in the formData
    }));
  };


  const [seleteditem, setSeleteditem] = useState('select categories') // [selected item, set selected item]
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleonSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      Categories: value,
    }));
    setSeleteditem(value);
    setOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <>
      <Alertjsx duration={8000} handleClose={alerthandleClose} message={alermessage} open={alertopen} severity={alertseverity} />
      <div className="max-w-screen-lg p-6 flex-none sm:flex-initial justify-center bg-white rounded-lg m-auto scroll-m-10">
        <div className="scrollable-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <h1 className="text-2xl font-bold text-center">Create Event</h1>
          <form onSubmit={requestToUpdate ? updateEvent : handleSubmit} className="w-full flex flex-col items-center space-y-4 p-6">
            <div className="w-full flex border border-gray-300 focus:border-blue-600 rounded-md p-3">

              <input type="file"
                onChange={handleFileChange}
              />
              {/* file upload */}
            </div>

            <TextField label="Event Name" name="EventName" fullWidth onChange={handleChange} value={formData.EventName} />
            <TextField label="Host Name" name="HostName" fullWidth onChange={handleChange} value={formData.HostName} />
            <TextField label="Subject" name="Subject" fullWidth onChange={handleChange} value={formData.Subject} />
            <TextField type="date" label="Event Date" name='EventDate' focused={true} fullWidth onChange={handleChange} value={formData.EventDate} />
            <TextField label="Address" name="Address" fullWidth onChange={handleChange} value={formData.Address} />
            <TextField label="City" name="City" fullWidth onChange={handleChange} value={formData.City} />
            <TextField label="State" name="State" fullWidth onChange={handleChange} value={formData.State} />
            <TextField label="Description" name="Description" multiline rows={4} fullWidth onChange={handleChange} value={formData.Description} />
            <TextField label="Website" name="Website" fullWidth onChange={handleChange} value={formData.Website} />
            <TextField label="Twitter" name="Twitter" fullWidth onChange={handleChange} value={formData.Twitter} />
            <TextField label="LinkedIn" name="LinkedIn" fullWidth onChange={handleChange} value={formData.LinkedIn} />
            <TextField label="Instagram" name="Instagram" fullWidth onChange={handleChange} value={formData.Instagram} />
            <TextField label="Postal" name="Postal" fullWidth onChange={handleChange} value={formData.Postal} />
            <DropdownButton
              dropDownContent={courses}
              dropDownInitialValue={requestToUpdate ? formData.Categories : seleteditem}
              onSelect={handleonSelect} />
            <Button variant="outlined" type="submit">{requestToUpdate ? "Update Event" : "Create Event"}</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateEvents;

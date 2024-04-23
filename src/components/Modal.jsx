import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function CreateEventDialog({ isopen, setIsOpen, selectedEventid, setSelectedEventid }) {

  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]); // Initialize events state as an empty array
  const [reqToUpdate, setReqtoUpdate] = useState(true);

  console.log("event id start", selectedEventid);
  console.log("is Modal open start ", isopen);

  const handleEditEvent = async (value) => {
    if (value && selectedEventid) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/getEvents/${selectedEventid}`);
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    }

    if (value) {
      setOpen(value);
      setIsOpen(value);
    }
    else if (!value) {
      setOpen(value);
      setIsOpen(value)
      setSelectedEventid(null)
    }
  }

  useEffect(() => {
      
      handleEditEvent(isopen)
  
    }, [isopen, selectedEventid])


  const { 
    eventName, 
    hostName, 
    eventDate, 
    address, 
    city, 
    state, 
    description,
    website, 
    twitter, 
    linkedIn, 
    instagram, 
    postal, 
    categories } = events;   // Destructing the form data recevied form get request

  

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Event</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4 p-6">
            {/* Render form fields with values from formData */}
            <TextField label="Event Name" name="eventName" value={formData.eventName} fullWidth onChange={handleChange} />
            <TextField label="Host Name" name="hostName" value={formData.hostName} fullWidth onChange={handleChange} />
            {/* Add other fields here */}
            <TextField type="date" label="Event Date" name="eventDate" value={formData.eventDate} fullWidth onChange={handleChange} />
            <TextField label="Address" name="address" value={formData.address} fullWidth onChange={handleChange} />
            <TextField label="City" name="city" value={formData.city} fullWidth onChange={handleChange} />
            <TextField label="State" name="state" value={formData.state} fullWidth onChange={handleChange} />
            <TextField label="Description" name="description" value={formData.description} multiline rows={4} fullWidth onChange={handleChange} />
            <TextField label="Website" name="website" value={formData.website} fullWidth onChange={handleChange} />
            <TextField label="Twitter" name="twitter" value={formData.twitter} fullWidth onChange={handleChange} />
            <TextField label="LinkedIn" name="linkedIn" value={formData.linkedIn} fullWidth onChange={handleChange} />
            <TextField label="Instagram" name="instagram" value={formData.instagram} fullWidth onChange={handleChange} />
            <TextField label="Postal" name="postal" value={formData.postal} fullWidth onChange={handleChange} />
            <TextField label="Categories" name="categories" value={formData.categories} fullWidth onChange={handleChange} />
            {/* Add other fields here */}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary">Update Event</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

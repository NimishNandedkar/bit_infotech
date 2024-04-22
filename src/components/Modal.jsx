import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function RegistrationDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: '',
    eventName: '',
    hostName: '',
    agenda: '',
    eventDate: '',
    address: '',
    city: '',
    state: '',
    description: '',
    website: '',
    twitter: '',
    linkedIn: '',
    instagram: '',
    postal: '',
    categories: ''
  });

  const handleClickOpen = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would make an API call to save the formData to your database
    console.log(formData);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>Register</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField label="Image URL" name="imageUrl" fullWidth onChange={handleChange} />
            <TextField label="Event Name" name="eventName" fullWidth onChange={handleChange} />
            <TextField label="Host Name" name="hostName" fullWidth onChange={handleChange} />
            <TextField label="Agenda" name="agenda" multiline rows={4} fullWidth onChange={handleChange} />
            <TextField type="date" label="Event Date" placeholder='Event Date' name="eventDate" fullWidth onChange={handleChange} />
            <TextField label="Address" name="address" fullWidth onChange={handleChange} />
            <TextField label="City" name="city" fullWidth onChange={handleChange} />
            <TextField label="State" name="state" fullWidth onChange={handleChange} />
            <TextField label="Description" name="description" multiline rows={4} fullWidth onChange={handleChange} />
            <TextField label="Website" name="website" fullWidth onChange={handleChange} />
            <TextField label="Twitter" name="twitter" fullWidth onChange={handleChange} />
            <TextField label="LinkedIn" name="linkedIn" fullWidth onChange={handleChange} />
            <TextField label="Instagram" name="instagram" fullWidth onChange={handleChange} />
            <TextField label="Postal" name="postal" fullWidth onChange={handleChange} />
            <TextField label="Categories" name="categories" fullWidth onChange={handleChange} />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary">Create Event</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

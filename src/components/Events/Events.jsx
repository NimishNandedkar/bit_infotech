import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Events() {

  const user = useSelector((state) => state.auth.status);
    
  if (!user) {
      // alert("Please login to upload project");
      return <Navigate to="/login" />;
  }

  return (
    <div>Events</div>
  )
}

export default Events
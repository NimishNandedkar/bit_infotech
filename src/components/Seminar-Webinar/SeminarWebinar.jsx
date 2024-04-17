import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function SeminarWebinar() {
  
  const user = useSelector((state) => state.auth.status);
    
  if (!user) {
      // alert("Please login to upload project");
      return <Navigate to="/login" />;
  }

  return (
    
    <div>SeminarWebinar</div>
  )
}

export default SeminarWebinar
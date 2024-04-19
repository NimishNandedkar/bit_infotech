import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormDialog from '../Modal';

function Events() {

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.status);
    
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  } 
  , [user, navigate]);

  return (
    <>
    <div className='h-screen bg-gray-200'>
      <p className='text-5xl flex justify-center items-center'>Events</p><br />
      <div className="flex flex-col items-center justify-center">
      <FormDialog />
      </div>
    </div>
    </>
  )
}

export default Events
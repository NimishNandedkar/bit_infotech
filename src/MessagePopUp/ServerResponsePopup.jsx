import React, { useState, useEffect } from 'react';

const ServerResponsePopup = ({ message , isError, resetErrorAndSubmitted , isSubmitClicked}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
     
      // Check if isSubmitClicked is true, then set isVisible to true
    if (isSubmitClicked) {
      setIsVisible(true);
      // Set a timer to hide the popup after 3000 milliseconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        resetErrorAndSubmitted()
      }, 3000);
      // Clear the timer when the component unmounts or when isSubmitClicked changes
      return () => clearTimeout(timer);
    }
  }, [isSubmitClicked,resetErrorAndSubmitted]);

  console.log('serverResponse:', message);
  
  console.log("is Error ",isError);
  console.log("submit button clicked ", isSubmitClicked);

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
          <div className={`${isError ? 'bg-red-100 border-red-500  text-red-900' : 'bg-teal-100  border-teal-500  text-teal-900'} rounded-b border-t-4 spx-4 py-3 px-7 shadow-md transform translate-y-full transition-transform duration-500   ` }>
            <div className="flex items-center">
              <div className="mr-4">
                <svg className={`fill-current h-6 w-6 ${isError ? 'text-red-500' : 'text-teal-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
              </div>
              <div>
                <p className="font-bold">{message}</p>
                <p className="text-sm">Make sure you know how these changes affect you.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServerResponsePopup;


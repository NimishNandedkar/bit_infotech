
import React, { useEffect, useRef, useState } from 'react';

const DropdownButton = ({ dropDownContent, dropDownInitialValue, onSelect, isFormSubmitted, setIsFormSubmitted , isOpen }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(isOpen);


  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  

  useEffect(() => {
    if (isFormSubmitted) {
      setDropdownVisible(false);
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted, setIsFormSubmitted]);

  const courses = dropDownContent;

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      <input
        type="button"
        value={dropDownInitialValue}
        className="w-full cursor-pointer border-2 rounded-md px-4 py-2 my-5 mt-1 leading hover:border-blue-500 transition duration-150 ease-in-out sm:leading-5 resize-none focus:outline-none"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
      />

      {isDropdownVisible && (
        <div className="dropDownMenu absolute z-10 mt-2 py-2 w-full bg-white border border-blue-400 rounded-md shadow-lg overflow-y-auto max-h-40" style={{ scrollbarWidth: "thin" }}>
          {courses.map((course, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={()=>{
                onSelect(course);
                setDropdownVisible(false);
              }}
            >
              {course}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;


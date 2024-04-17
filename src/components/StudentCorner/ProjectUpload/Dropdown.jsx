import React, { useState, useRef, useEffect } from 'react';

const DropdownButton = ({ dropDownContent, InitialValue, onSelect }) => {

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropDownInitialValue, setdropDownInitialValue] = useState(InitialValue);

  
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

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option) => {
    setdropDownInitialValue(option);
    setDropdownVisible(false);
    onSelect(option); // Pass selected option back to parent component
    console.log(option);
  };

  const courses = dropDownContent;

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      <input
        type="button"
        value={dropDownInitialValue}
        className="w-full cursor-pointer border-2 rounded-md px-4 py-2 my-5 mt-1 leading hover:border-blue-500 transition duration-150 ease-in-out sm:leading-5 resize-none focus:outline-none"
        onClick={toggleDropdown}
      />
      
      {isDropdownVisible && (
        <div className="dropDownMenu absolute z-10 mt-2 py-2 w-full bg-white border rounded-md shadow-lg overflow-y-auto max-h-40" style={{ scrollbarWidth: "thin" }}>
          {/* Dropdown content goes here */}
          {courses.map((course, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={() => handleOptionClick(course)}
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

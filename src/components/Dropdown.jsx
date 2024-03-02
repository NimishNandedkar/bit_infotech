import React, { useState } from 'react';

const DropdownButton = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Courses");


  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    const dropDownMenu = document.getElementsByClassName("dropDownMenu")
    dropDownMenu.addEventListener("focusout", () => {
        setDropdownVisible(false);
      });
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);

  };

  const courses = ["Math", "Science", "History", "English"]; // Replace with data from backend

  return (
    <div className="relative inline-block w-full">
      <input
        type="button"
        value={selectedOption}
        className="w-full cursor-pointer border-2 rounded-md px-4 py-2 my-5 mt-1 leading hover:border-blue-500 transition duration-150 ease-in-out sm:leading-5 resize-none focus:outline-none"
        onClick={toggleDropdown}
      />
      
      {isDropdownVisible && (
        <div className="dropDownMenu absolute   z-10 mt-2 py-2 w-full bg-white border rounded-md shadow-lg overflow-y-auto max-h-40 " style={{ scrollbarWidth: "thin" }}>
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

import React, { useEffect, useState } from 'react';

const DropdownButton = ({ dropDownContent  , dropDownInitialValue , onSelect  ,  isFormSubmitted, setIsFormSubmitted}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption  ] = useState(dropDownInitialValue);

  

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    const dropDownMenus = document.getElementsByClassName("dropDownMenu");
    Array.from(dropDownMenus).forEach((menu) => {
      menu.addEventListener("focusout", () => {
        setDropdownVisible(false);
      });
      menu.addEventListener("focusin", () => {
        setDropdownVisible(true);
      });
    });  
  };



  const handleOptionClick = (option) => {
    onSelect(option);  // Pass Selected option back to parent 
    setSelectedOption(option);
    setDropdownVisible(false);

  };

  useEffect(() => {
    if (isFormSubmitted) {
      setSelectedOption(dropDownInitialValue);
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted, dropDownInitialValue, setIsFormSubmitted]);

  // console.log(dropDownContent);
  // const courses = ["Math", "Science", "History", "English"]; // Replace with data from backend
  const courses =  dropDownContent;

  return (
    <div className="relative inline-block w-full">
      <input
        type="button"
        value={selectedOption}
        className="w-full cursor-pointer border-2 rounded-md px-4 py-2 my-5 mt-1 leading hover:border-blue-500 transition duration-150 ease-in-out sm:leading-5 resize-none focus:outline-none"
        onClick={toggleDropdown}
        
      />
      
      {isDropdownVisible && (
        <div  id="dropDownMenu" className="dropDownMenu absolute   z-10 mt-2 py-2 w-full bg-white border rounded-md shadow-lg overflow-y-auto max-h-40 " style={{ scrollbarWidth: "thin" }}>
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



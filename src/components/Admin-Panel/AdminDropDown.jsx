import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDown ,  } from 'react-icons/bs';


const AdminDropDown = ({ title, links , icon:Icon , isOpen, onClick }) => {
  
  const toggleDropdown = () => {
    onClick(title); 
  };
  

 
  return (
    <div className="relative">
      <button
        className="py-2 px-4 hover:bg-blue-200 flex items-center rounded-xl transition-all duration-300  w-full justify-start"
        onClick={toggleDropdown}
        style={{ background: isOpen ? '#90cdf4' : '' }}
      >
       {Icon && <Icon className="mr-2 w-4" />} {title}
        <BsChevronDown className="ml-2 h-4 w-4 text-white transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>

      <div
        className={`flex flex-col mt-0.5 mb-2 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? 'h-auto max-h-screen opacity-100' : 'h-0 opacity-0'
          }`}
      >
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {link === 'divider' ? (
              <hr />
            ) : (
              <Link
                to={link.to}
                className="block py-2 px-4 hover:bg-blue-200"
              >
                {link.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminDropDown;


import React from 'react';

const InputField = ({ id, name, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      name={name}
      className="w-full border-2 rounded-md px-4 py-2 my-2  leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    
  );
};

export default InputField

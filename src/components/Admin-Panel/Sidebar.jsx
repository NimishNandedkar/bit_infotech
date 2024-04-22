
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminDropDown from './AdminDropDown';
import { FaBlog } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { CgWebsite } from "react-icons/cg";
import { MdEventNote } from "react-icons/md";

const Sidebar = () => {

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (dropdownTitle) => {
    
    setOpenDropdown(openDropdown === dropdownTitle ? null : dropdownTitle);
  };

  return (
    <div className="bg-gradient-to-t from-cyan-500 to-blue-600 text-white  text-center h-auto  w-3/12 p-1 rounded-r-2xl sm:w-56  ">
      <div className="my-3 p-0 text-black text-sm font-semibold rounded-xl flex flex-col  sm:block sm:text-lg ">
        <AdminDropDown 
          title="Blog" 
          links={[
            { to: '/admin/blog-manage', label: 'Manage Blog' },
            'divider',
            { to: '/admin/write-blog', label: 'Write Blog' }
          ]}
          icon={FaBlog}
          isOpen={openDropdown === "Blog"}
          onClick={() => handleDropdownClick("Blog")}
        />

        <AdminDropDown
          title="Student Corner"
          links={[
            { to: '/admin/student-corner-manage', label: 'Manage Student Corner' },
          ]}
          icon={PiStudentBold}
          isOpen={openDropdown === "Student Corner"}
          onClick={() => handleDropdownClick("Student Corner")}
        />

        <AdminDropDown
          title="Webinar/Seminar"
          links={[
            { to: '/admin/webinar-seminar-manage', label: 'Manage Webinar & Seminar' },'divider',
            { to: '/admin/create-webinar', label: 'Create Webinar' },'divider',
            { to: '/admin/create-seminar', label: 'Create Seminar' }
          ]}
          icon={CgWebsite }
          isOpen={openDropdown==="Webinar/Seminar"}
          onClick={()=>{handleDropdownClick("Webinar/Seminar")}}
        />

        <AdminDropDown
          title="Events"
          links={[
            { to: '/admin/events-manage', label: 'Manage Events' },'divider',
            { to: '/admin/create-events', label: 'Create Events' },'divider',
          ]}
          icon={MdEventNote }
          isOpen={openDropdown==="Events"}
          onClick={()=>{handleDropdownClick("Events")}}
        />


      </div>
    </div>
  );
};

export default Sidebar;

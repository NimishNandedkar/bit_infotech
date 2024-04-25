import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alertjsx from '../Alert/Alert';
import { useSelector } from 'react-redux';

export default function Confirm() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [RegisteredUsers, setRegisteredUsers] = useState([]);


  const userid = useSelector((state) => state.auth.userData._id);

  console.log(userid);







  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    async function getEventData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/webinars/get-webinar/${id}`, {
          withCredentials: true,
        });
        setData(response.data.data);
        console.log(response.data.data.registeredUsers);
        setRegisteredUsers(response.data.data.registeredUsers);
      } catch (error) {
        console.error('Error fetching webinars:', error);
      }
    }
    getEventData();
  }, [id]);

  const handleRegister = async () => {
    try {
      const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
        return cookies;
      }, {});
      const token = cookies.token;
      const encodedId = encodeURIComponent(id);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/webinars/webinar-register/${encodedId}`,
        { token: token },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setOpen(true);
      setMessage('Webinar registered successfully');
      setSeverity('success');
      setIsUserRegistered(true);
      // const getRegisteredUsers = response.data.data._id;
      // console.log(getRegisteredUsers);




      // navigate('/seminar-webinar');
      // console.log(videourl);
      // Update the state or perform any necessary actions after registration
    } catch (error) {
      console.error('Error registering webinars:', error);
    }
  };

  useEffect(() => {
    RegisteredUsers.forEach((user) => {
      console.log(user);
      if (user === userid) {
        setIsUserRegistered(true);
      }
    });
  }, [RegisteredUsers, userid]);

  console.log(RegisteredUsers);




  return (
    <>
      <Alertjsx duration={8000} handleClose={handleClose} message={message} open={open} severity={severity} />
      <div className="min-h-screen">
        <h1 className="text-2xl font-bold text-center my-5">Webinar Details</h1>
        <p className="text-center text-gray-500">Register for the webinar to get access to the event</p>
        <div className="bg-[#f8f9f9] w-90 mx-2 sm:w-3/5 sm:mx-auto rounded-xl p-2 mb-2 sm:mb-4 my-5">
          <h4 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
            {data?.title}
          </h4>
          <hr />
          <p className="text-grey-800 py-4 px-3 text-md sm:text-lg">
            {data?.description}
          </p>
          {isUserRegistered ?
            <a href={data.videoUrl} target='_blank' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Attend Webinar</a>
            :
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegister}>
              Register
            </button>
          }
        </div>
      </div>
    </>
  );

}

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import Alertjsx from '../Alert/Alert';
// import { useSelect } from '@material-tailwind/react';
// import { useSelector } from 'react-redux';

// export default function Confirm() {
  // const navigate = useNavigate();
  // const [data, setData] = useState("");
  // const { id } = useParams();

  // const [open, setOpen] = useState(false);
  // const [message, setMessage] = useState('');
  // const [severity, setSeverity] = useState('success');
  // const [isUserRegistered, setIsUserRegistered] = useState(false);
  // const [RegisteredUsers, setRegisteredUsers] = useState([]);


  // const userid = useSelector((state) => state.auth.userData._id);

  // console.log(userid);







  // const handleClose = () => {
  //   setOpen(false);
  // };
  // useEffect(() => {
  //   async function getEventData() {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/webinars/get-webinar/${id}`, {
  //         withCredentials: true,
  //       });
  //       setData(response.data.data);
  //       console.log(response.data.data.registeredUsers);
  //       setRegisteredUsers(response.data.data.registeredUsers);
  //     } catch (error) {
  //       console.error('Error fetching webinars:', error);
  //     }
  //   }
  //   getEventData();
  // }, [id]);

  // const handleRegister = async () => {
  //   try {
  //     const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
  //       const [name, value] = cookie.split('=').map(c => c.trim());
  //       cookies[name] = value;
  //       return cookies;
  //     }, {});
  //     const token = cookies.token;
  //     const encodedId = encodeURIComponent(id);
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/webinars/webinar-register/${encodedId}`,
  //       { token: token },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`
  //         }
  //       }
  //     );

  //     setOpen(true);
  //     setMessage('Webinar registered successfully');
  //     setSeverity('success');
  //     const getRegisteredUsers = response.data.data._id;
  //     console.log(getRegisteredUsers);




  //     // navigate('/seminar-webinar');
  //     // console.log(videourl);
  //     // Update the state or perform any necessary actions after registration
  //   } catch (error) {
  //     console.error('Error registering webinars:', error);
  //   }
  // };

//   useEffect(() => {
//     RegisteredUsers.forEach((user) => {
//       if (user === userid) {
//         setIsUserRegistered(true);
//       }
//     });
//   }, [RegisteredUsers, userid]);


//   return (
//     <>
//       <Alertjsx duration={8000} handleClose={handleClose} message={message} open={open} severity={severity} />
//       <div className="min-h-screen">
//         <h1 className="text-2xl font-bold text-center my-5">Webinar Details</h1>
//         <p className="text-center text-gray-500">Register for the webinar to get access to the event</p>
//         <div className="bg-[#f8f9f9] w-90 mx-2 sm:w-3/5 sm:mx-auto rounded-xl p-2 mb-2 sm:mb-4 my-5">
//           <h4 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
//             {data?.title}
//           </h4>
//           <hr />
//           <p className="text-grey-800 py-4 px-3 text-md sm:text-lg">
//             {data?.description}
//           </p>
//           {isUserRegistered ?
//             <a href={data.videoUrl} target='_blank' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Attend Webinar</a>
//             :
//             <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegister}>
//               Register
//             </button>
//           }
//         </div>
//       </div>
//     </>
//   );

// }
// Compare this snippet from src/components/Seminar-Webinar/Confirm.jsx:



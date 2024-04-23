// // import React, { useEffect, useState } from 'react'
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import FormDialog from '../Modal';

// // function SeminarWebinar() {

// //   const navigate = useNavigate();
// //   const user = useSelector((state) => state.auth.status);

// //   useEffect(() => {
// //     if (!user) {
// //       navigate('/login');
// //     }
// //   } 
// //   , [user, navigate]);

// //   return (
// //     <>
 
// //           <div className="max-w-7xl mx-auto">
// //             <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">
// //               All Active Webinar
// //             </p>
// //             <div className="py-10">
// //               {events.map((item) => (
// //                 <div key={item.$id} className="py-2">
// //                   <section className="text-gray-600 body-font">
// //                     <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
// //                       <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
// //                         <img
// //                           className="object-cover object-center rounded"
// //                           alt="hero"
// //                           src={item.url}
// //                         />
// //                       </div>
// //                       <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
// //                         <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
// //                           {item.title}
// //                         </h1>
// //                         <p className="mb-8 leading-relaxed">{item.description}</p>
// //                         <div className="flex items-center mb-2">
// //                           <p className="mb-8 leading-relaxed mx-2">
// //                             Type: {item.type}
// //                           </p>
// //                         </div>
// //                         <div className="flex items-center mb-2">
// //                           <p className="mb-8 leading-relaxed mx-2">
// //                             Audience: {item.audience}
// //                           </p>
// //                         </div>
// //                         <div className="flex justify-center">
// //                           <button
// //                             className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
// //                           >
// //                             Register
// //                           </button>
// //                           {item.createdBy === 1 /* Assuming 1 for user ID for demonstration */ ? (
// //                             <div>
// //                               <button
// //                                 className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
// //                               >
// //                                 View Registrations
// //                               </button>
// //                               <button
// //                                 className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
// //                               >
// //                                 Delete Event
// //                               </button>
// //                             </div>
// //                           ) : (
// //                             <div></div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </section>
// //                 </div>
// //               ))}
// //             </div>

// //         <div className="flex flex-col items-center justify-center">
// //           <FormDialog />
// //         </div>
// //       </div>
// //     </>
// //   )
// // }

// // export default SeminarWebinar



// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import Axios
// import FormDialog from '../Modal';
// import { ClassNames } from '@emotion/react';

// function SeminarWebinar() {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.status);
//   const [webinar, setWebinar] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       navigate('/login');
//     } else {
//       // Fetch events data from the server
//       // Example: fetchEvents();
//     }
//   }, [user, navigate]);


    
//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/webinars/get-webinar/`);
//         setWebinar(response.data.data);
//         // setLoading(false); // Set loading to false after data is fetched

//         console.log(response.data.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//         // setLoading(false); // Set loading to false in case of error
//       }
//   };

//   const handleRegister = async (webinarId) => {
//     try {
//       // Make a POST request to register the user for the webinar using Axios
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/webinars/webinar-register/`)

//       // Handle the response
//       if (response.status === 200) {
//         // Registration successful, display message or redirect user
//         console.log('Registration successful');
//         // You can display a success message to the user or redirect them to the webinar link
//       } else {
//         // Registration failed, handle error
//         console.error('Registration failed:', response.data.message);
//         // Display error message to the user
//       }
//     } catch (error) {
//       console.error('Error registering for webinar:', error.message);
//       // Display error message to the user
//     }
//   };

//   return (
//     <>
//       <div className="max-w-7xl mx-auto">
//         <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">All Active webinar</p>
//         <div className="py-10">
//           {webinar.map((item) => (
//             <div key={item._id} className="py-2">

//               <div className="bg-slate-200">{item.title}</div>
//               <div className="bg-slate-200">{item.category}</div>
//               <div className="bg-slate-200">{item.description}</div>
               
//               <button
//                 onClick={() => handleRegister(item._id)} // Pass webinar ID to handleRegister function
//                 className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
//               >
//                 Register
//               </button>
//               {/* Other event details */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default SeminarWebinar;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormDialog from '../Modal';
// import RegisterBtn from './RegisterBtn';
import { Button } from '@mui/material';

function SeminarWebinar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.status);
  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchWebinars();
    }
  }, [user, navigate]);

  const fetchWebinars = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/webinars/get-webinar/`);
      setWebinars(response.data.data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    }
  };

  const [data, setData] = useState(null);
  const { id } = useParams();

  // useEffect(() => {
  //   async function getEventData() {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/webinars/webinar-register/${id}`, {
  //         withCredentials: true,
  //       });
  //       setData(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   }
  //   getEventData();
  // }, []);

  // const handleRegisterUser = async (webinarId) => {
  //   try {
  //     const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
  //       const [name, value] = cookie.split('=').map(c => c.trim());
  //       cookies[name] = value;
  //       return cookies;
  //     }, {});
  //     const token = cookies.token;
  //     const encodedId = encodeURIComponent(webinarId);
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
  //     console.log(response);
  //     // Update the state or perform any necessary actions after registration
  //   } catch (error) {
  //     console.error('Error registering event:', error);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center py-5">All Active Webinars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mb-10">
        {webinars.map((webinar) => (
          <div key={webinar._id} className="bg-white shadow-lg rounded-lg overflow-hidden ">
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{webinar.title}</h2>
              <p className="text-gray-600 mb-4">{webinar.description}</p>
              <div className="flex justify-between items-center">
                <Button variant="contained" color="primary"href={`seminar-webinar/${webinar._id}`}>
                  Register
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default SeminarWebinar;


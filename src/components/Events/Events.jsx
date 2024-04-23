import React, { useEffect, useState } from 'react';
import FormDialog from '../Modal';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Events() {
  const [data, setData] = useState(null); // Initialize data state as null

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.status);


  useEffect(() => {
      if (!user) {
          navigate('/login');
      }
  }, [user, navigate]);

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/getEvents`, {
          withCredentials: true,
        });
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    getEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">
        All Active Events
      </p>
      <div className="py-10">
        {data !== null && data.map((item) => (
          <div key={item._id} className="py-2">
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img
                    className="object-cover object-center rounded"
                    alt="hero"
                    src={item.imageUrl}
                  />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {item.eventName}
                  </h1>
                  <p className="mb-8 leading-relaxed">{item.subject}</p>
                  <div className="flex items-center mb-2">
                    <p className="mb-8 leading-relaxed">
                      Event Date: {item.eventDate}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <NavLink
                      className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
                      to={`/event/${item._id}`}
                    >
                      Get Details
                    </NavLink>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;

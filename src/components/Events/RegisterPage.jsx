import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RegisterBtn from "./RegisterBtn";
import { Button } from "@mui/material";

import Alertjsx from "../Alert/Alert";
import { useSelector } from "react-redux";

export default function Event() {

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



  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getEventData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/getEvent/${id}`, {
          withCredentials: true,
        });
        setData(response.data.data);
        setRegisteredUsers(response.data.data.registeredUsers);
      } catch (error) {
        console.error('Error fetching events:', error);
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
        `${import.meta.env.VITE_API_BASE_URL}/events/registerEvent/${encodedId}`,
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
     
      // Update the state or perform any necessary actions after registration
    } catch (error) {
      console.error('Error registering event:', error);
    }
  };


  

  useEffect(() => {
    RegisteredUsers.forEach((user) => {
      console.log(user);
      if (user === userid) {
        setIsUserRegistered(true);
      }
    });
  }, [RegisteredUsers, userid, isUserRegistered]);

  console.log(RegisteredUsers);

  return (
    <>
    <Alertjsx duration={8000} handleClose={handleClose} message={message} open={open} severity={severity} />
    <div className="min-h-screen">
      <div className="bg-[#f8f9f9] w-90 mx-2 sm:w-3/5 sm:mx-auto rounded-xl p-2 mb-2 sm:mb-4 my-5">
        <img
          src={data?.imageUrl}
          alt="Event Image"
          className="object-cover object-center rounded"
        />
        <div className="w-3/4 p-5">
          <h1 className="text-black font-bold text-xl sm:text-4xl">
            {data?.eventName}
          </h1>
          <p className="text-gray-800 py-2 text-md sm:text-lg">
            Hosted by {data?.hostName}
          </p>
          <div className="flex flex-col sm:flex-row justify-between w-full py-1">
            <div className="flex flex-row pb-2">
              <div>
                <h3 className="text-gray-800 font-bold text-md sm:text-lg">
                  {data?.eventDate}
                </h3>
              </div>
            </div>
            <div className="flex flex-row pb-2">
              <div>
                <h3 className="text-black font-bold text-md sm:text-lg">
                  {data?.address}
                </h3>
                <span className="text-gray-700">
                  {data?.city}, {data?.state}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4"></div>
      </div>
      <div className=" w-full sm:w-3/5 mx-auto flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="w-90 mx-2  sm:w-2/3 sm:mx-0">
          <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2 mb-2 sm:mb-4">
            <h4 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
              Registration
            </h4>
            <hr />
            <p className="text-grey-800 py-4 px-3 text-md sm:text-lg">
              Hello! To join the event, please register below.
            </p>
            {isUserRegistered ? (
              <a
                target="_blank"
                className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded"
              >
                Aleready Registered
              </a>
            ) : (
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded"
                onClick={handleRegister}
              >
                Register
              </button>
            )}
          </div>
          <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2">
            <h4 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
              About Event
            </h4>
            <hr />
            <div className="px-3 py-5">
              <p>{data?.description}</p>
              <h1 className="text-lg font-bold py-5 text-gray-700">
                Our Sponsors
              </h1>
              <div className="flex flex-col text-md sm:text-lg py-5">
                <p className="text-black text-xl font-bold flex justify-center py">
                  {" "}
                  Follow us on
                </p>
                <span className="flex justify-center py-5 space-x-3">
                  <a href={data?.website} target="_blank">
                    Website
                  </a>
                  <a href={data?.twitter} target="_blank">
                    Twitter
                  </a>
                  <a href={data?.linkedin} target="_blank">
                    LinkedIn
                  </a>
                  <a href={data?.instagram} target="_blank">
                    Instagram
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-90 mx-2  sm:w-1/3 sm:mx-0">
          <div className="bg-[#f8f9f9]  mx-auto rounded-xl p-2 mb-2 sm:mb-4">
            <h3 className="text-black px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
              Location
            </h3>
            <hr />
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width="100%"
                  height="100%"
                  id="gmap_canvas"
                  src={`https://maps.google.com/maps?q=${data?.postal}&t=&z=10&ie=UTF8&iwloc=&output=embed`}
                  scrolling="no"
                ></iframe>
              </div>
            </div>
            <div>
              <p className="text-gray-700 font-bold p-2 text-md sm:text-lg">
                {data?.address}
              </p>
              <p className="text-black-700 p-2 text-md sm:text-lg">
                {data?.city}, {data?.state}, {data?.postal}
              </p>
            </div>
          </div>
          <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2 mb-2 sm:mb-4 divide-black">
            <h3 className="text-gray-700 px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
              Subject
            </h3>
            <hr className="divide-black" />
            <p className="text-black-700 p-2 text-md sm:text-lg">{data?.subject}</p>
          </div>
          <div className="bg-[#f8f9f9] mx-auto rounded-xl p-2 mb-2 sm:mb-4 divide-black">
            <h3 className="text-gray-700 px-3 pb-3 pt-1 font-bold text-md sm:text-lg">
              Host
            </h3>
            <hr className="divide-black" />
            <p className="text-black-700 p-2 text-md sm:text-lg">
              {data?.hostName}
            </p>
            <button
              className="w-full bg-[#f02e65] p-1 text-gray-200 hover:bg-[#990e3c] flex justify-center rounded-lg text-md sm:text-lg"
              onClick={() => alert("Host contact email: email@example.com")}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

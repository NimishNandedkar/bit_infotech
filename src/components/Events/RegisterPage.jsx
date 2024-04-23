import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisterBtn from "./RegisterBtn";

export default function Event() {



  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/getEvent/${id}`, {
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


  const handleClick = () => {

    async function registerEvent() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/events/registerEvent/${id}`, {
          withCredentials: true,
        });
        console.log(response);
        setData(response.data.data);

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    
    useEffect(() => {
      registerEvent();
    }, []); 
  }



  // Static data placeholders
  const docs = {
    url: "https://source.unsplash.com/random/1000x400",
    eventname: "Event Name",
    hostname: "Host Name",
    eventdate: "Event Date",
    address: "Event Address",
    city: "Event City",
    state: "Event State",
    description: "Event Description",
    website: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    postal: "390019", // Sample postal code
  };

  // Static sponsors data
  const sponsors = [
    { id: 1, name: "Sponsor 1", url: "#" },
    { id: 2, name: "Sponsor 2", url: "#" },
    { id: 3, name: "Sponsor 3", url: "#" },
  ];

  return (
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
           <RegisterBtn />
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
  );
}

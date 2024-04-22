import React, { useState } from 'react';
import FormDialog from '../Modal';
import { NavLink } from 'react-router-dom';

function Events() {
  const [events] = useState([
    {
      $id: 1,
      eventname: "Event 1",
      agenda: "Agenda for Event 1",
      url: "https://dummyimage.com/720x400",
      type: "Type 1",
      audience: "Audience 1",
      created: 1
    },
    {
      $id: 2,
      eventname: "Event 2",
      agenda: "Agenda for Event 2",
      url: "https://dummyimage.com/720x400",
      type: "Type 2",
      audience: "Audience 2",
      created: 2
    }
  ]);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">
          All Active Events
        </p>
        <div className="py-10">
          {events.map((item) => (
            <div key={item.$id} className="py-2">
              <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img
                      className="object-cover object-center rounded"
                      alt="hero"
                      src={item.url}
                    />
                  </div>
                  <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                      {item.eventname}
                    </h1>
                    <p className="mb-8 leading-relaxed">{item.agenda}</p>
                    <div className="flex items-center mb-2">
                      <p className="mb-8 leading-relaxed mx-2">
                        Type: {item.type}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <p className="mb-8 leading-relaxed mx-2">
                        Audience: {item.audience}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <NavLink
                        className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
                        // to={`/event/${item.$id}`}
                        to="/event/example"
                      >
                        Register
                      </NavLink>
                      {item.created === 1 /* Assuming 1 for user ID for demonstration */ ? (
                        <div>
                          <button
                            className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                          >
                            View Registrations
                          </button>
                          <button
                            className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                          >
                            Delete Event
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <FormDialog />
      </div>
    </>
  );
}

export default Events;

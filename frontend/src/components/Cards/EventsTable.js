import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

// components
export default function EventsTable({ color }) {
  const token = localStorage.getItem('token');

  const [events, setEvents] = useState(null);

  const getEvents = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(baseUrl + '/event', config).then((response) => {
      setEvents(response.data.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleStatusChange = (event) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    if (event.eventId) {
      const payload = {
        status: 'Active'
      };

      axios.post(baseUrl + '/event/' + event.eventId, payload, config)
        .then((response) => {
          toast.success("Event Registration Successful!");
          getEvents();
        }).catch((error) => {
          toast.error(error);
        });
    }
    else {
      const payload = {
        eventId: event.id
      };

      axios.post(baseUrl + '/event', payload, config)
        .then((response) => {
          toast.success("Event Registration Successful!");
          getEvents();
        }).catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full shadow-xl rounded " +
          (color === "light" ? "bg-white" : "bg-white text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Event Registration
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-10 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Event Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Event Description
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Event Image
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Organised By
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            {events?.length ?
            (<tbody>
              {events?.map((event, idx) => {
                return (<tr key={idx}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {event.title}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {event.description}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {event.image}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {event.user.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {event.status}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {event.status === 'Active' ?
                      <button
                        className={(event.status !== 'Active' ? 'bg-green px-3' : 'bg-material-red px-2') + " text-white active:bg-lightBlue-600 font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"}
                        type="button"
                        onClick={() => handleStatusChange(event)}
                      >
                        Register
                      </button>
                      :
                      <span>Registered</span>
                    }
                  </td>
                </tr>)
              })
              }
            </tbody>) : (
              <tbody className="text-md w-full text-center py-4">
                <tr><td> </td></tr>
                <tr>
                  <td colspan="6">
                    No Events to Show
                  </td>
                </tr>
                <tr><td> </td></tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

EventsTable.defaultProps = {
  color: "light",
};

EventsTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

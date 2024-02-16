/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

export default function VisitorSidebar() {
  const token = localStorage.getItem('token');

  const [ad, setAd] = useState('');

  const getAd = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(baseUrl + '/ad', config).then((response) => {
      setAd(response.data.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  useEffect(() => {
    getAd();
  }, []);

  return (
    <>
      {/* Navigation */}
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/vehicles") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/vehicles"
          >
            <i
              className={
                "fas fa-book mr-2 text-sm " +
                (window.location.href.indexOf("/vehicles") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Register Vehicles
          </Link>
        </li>

        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/driving-instructions") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/driving-instructions"
          >
            <i
              className={
                "fas fa-car mr-2 text-sm " +
                (window.location.href.indexOf("/driving-instructions") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Driving Instructions
          </Link>
        </li>

        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/timings") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/timings"
          >
            <i
              className={
                "fas fa-table mr-2 text-sm " +
                (window.location.href.indexOf("/timings") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Timings
          </Link>
        </li>

        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/register-event") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/register-event"
          >
            <i
              className={
                "fas fa-calendar-day mr-3 text-sm " +
                (window.location.href.indexOf("/register-event") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Event Registration
          </Link>
        </li>
        
        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/chat") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/chat"
          >
            <i
              className={
                "fas fa-comments mr-2 text-sm " +
                (window.location.href.indexOf("/chat") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Chat
          </Link>
        </li>
      </ul>
      {ad &&
      <ul className="md:flex-col md:min-w-full flex flex-col list-none absolute bottom-0">
        <li className="mb-4 flex items-center">
          <span className="text-xs uppercase font-bold mr-2">Advertisement
            <img
              src={ad.image}
              alt={ad.title}
              className="w-6 h-6"
            />
          </span>
          <span className="text-xs uppercase font-bold mr-2">{ad.title} - {ad.description}</span>
        </li>
      </ul>
      }
    </>
  );
}

/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function GardenManagerSidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      {/* Navigation */}
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/summary") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/summary"
          >
            <i
              className={
                "fas fa-home mr-2 text-sm " +
                (window.location.href.indexOf("/summary") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Home
          </Link>
        </li>

        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/garden-timings") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/garden-timings"
          >
            <i
              className={
                "fas fa-tree mr-2 text-sm " +
                (window.location.href.indexOf("/garden-timings") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Garden Timings
          </Link>
        </li>

        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/residents") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/residents"
          >
            <i
              className={
                "fas fa-user-friends mr-2 text-sm " +
                (window.location.href.indexOf("/residents") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Residents
          </Link>
        </li>

        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/visitors") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/visitors"
          >
            <i
              className={
                "fas fa-walking mr-2 text-sm " +
                (window.location.href.indexOf("/visitors") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Visitors
          </Link>
        </li>

        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/create-event") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/create-event"
          >
            <i
              className={
                "fas fa-calendar-alt mr-2 text-sm " +
                (window.location.href.indexOf("/create-event") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Events
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
    </>
  );
}

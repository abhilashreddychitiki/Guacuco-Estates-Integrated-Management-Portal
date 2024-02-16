/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function SecurityManagerSidebar() {
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
            to="/dashboard/dashboard/summary"
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
              (window.location.href.indexOf("/security") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/security"
          >
            <i
              className={
                "fas fa-key mr-2 text-sm " +
                (window.location.href.indexOf("/security") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Security
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
              (window.location.href.indexOf("/generate-reports") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
            to="/dashboard/generate-reports"
          >
            <i
              className={
                "fas fa-chart-line mr-2 text-sm " +
                (window.location.href.indexOf("/generate-reports") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Generate Reports
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

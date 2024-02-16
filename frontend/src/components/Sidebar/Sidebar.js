/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import ResidentSidebar from "./ResidentSidebar";
import VisitorSidebar from "./VisitorSidebar";
import BuildingManagerSidebar from "./BuildingManagerSidebar";
import GardenManagerSidebar from "./GardenManagerSidebar";
import PoolManagerSidebar from "./PoolManagerSidebar";
import SecurityManagerSidebar from "./SecurityManagerSidebar";

export default function Sidebar() {
  const role = localStorage.getItem('role');

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  let RenderedSidebar = '';
  if(role.includes('resident')) {
    RenderedSidebar = <ResidentSidebar />;
  }
  else if(role.includes('visitor')) {
    RenderedSidebar = <VisitorSidebar />;
  }
  else if(role.includes('building_manager')) {
    RenderedSidebar = <BuildingManagerSidebar />;
  }
  else if(role.includes('garden_manager')) {
      RenderedSidebar = <GardenManagerSidebar />;
  }
  else if(role.includes('pool_manager')) {
      RenderedSidebar = <PoolManagerSidebar />;
  }
  else if(role.includes('security_manager')) {
      RenderedSidebar = <SecurityManagerSidebar />;
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-72 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="flex text-blueGray-700 mr-0 whitespace-nowrap text-sm uppercase font-bold mt-2 px-0 items-center"
            to="/"
          >
            <img className="mr-2" src={require("assets/img/logo.png").default} alt="Logo" width="40" height="40" />Terrazas De Guacuco
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="flex text-left text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 items-center"
                    to="/"
                  >
                    <img className="mr-2" src={require("assets/img/logo.png").default} alt="Logo" width="40" height="40" />Terrazas De Guacuco
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}
            {RenderedSidebar}
          </div>
          </div>
        </nav>
    </>
    );
}

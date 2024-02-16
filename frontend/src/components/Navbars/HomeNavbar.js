/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-blueGray-700 text-lg font-bold leading-relaxed flex mr-4 py-2 whitespace-nowrap uppercase"
            >
              <img className="mr-2" src="logo.png" alt="Logo" width="40" height="40"/>Terrazas de Guacuco
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a href="/about-us" className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  About Us
                </a>
              </li>
              <li className="flex items-center">
                <a href="/services" className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  Services
                </a>
              </li>
              <li className="flex items-center">
                <a href="/blogs" className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  Blogs
                </a>
              </li>
              <li className="flex items-center">
                <a href="/contact-us" className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                  Contact Us
                </a>
              </li>
              <li className="flex items-center">
                {token && role ? 
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/dashboard"
                >
                  <i className="fas fa-user-secret text-lg leading-lg"/>
                  <span className="lg:hidden inline-block ml-2">Dashboard</span>
                </a>
                :
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/auth"
                >
                  <i className="fas fa-lock text-lg leading-lg"/>
                  <span className="lg:hidden inline-block ml-2">Login / Sign Up</span>
                </a>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

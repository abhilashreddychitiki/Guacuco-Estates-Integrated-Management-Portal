import React from "react";
import { createPopper } from "@popperjs/core";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

const UserDropdown = () => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logout = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post(baseUrl + '/logout', {}, config)
    .then((response) => {
      clearStorage();
      toast.success(response.data.message);
      history.push('/auth');
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong!");
    });
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/avatar.png").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          to="#"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={logout}
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default UserDropdown;

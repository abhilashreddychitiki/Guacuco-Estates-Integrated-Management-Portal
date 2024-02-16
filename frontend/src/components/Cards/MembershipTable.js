import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';

// components
export default function MembershipTable({ color }) {
  const token = localStorage.getItem('token');

  const [memberships, setMemberships] = useState(null);

  const getMemberships = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(baseUrl + '/membership', config).then((response) => {
      setMemberships(response.data.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  useEffect(() => {
    getMemberships();
  }, []);

  const handleStatusChange = (membership) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    if (membership.membershipId) {
      const payload = {
        status: membership.status === 'Active' ? 'Inactive' : 'Active'
      };

      axios.post(baseUrl + '/membership/' + membership.membershipId, payload, config)
        .then((response) => {
          toast.success("Membership Status updated Successfully!");
          getMemberships();
        }).catch((error) => {
          toast.error(error);
        });
    }
    else {
      const payload = {
        timingId: membership.id
      };

      axios.post(baseUrl + '/membership', payload, config)
        .then((response) => {
          toast.success("Membership Status updated Successfully!");
          getMemberships();
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
                Membership Details
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
                    "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Facility
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Location
                </th>
                <th
                  className={
                    "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Days of the Week
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Timings
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
                    "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            {memberships?.length ?
            <tbody>
              {memberships?.map((membership, idx) => {
                return (<tr key={idx}>
                  <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {membership.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {membership.activity}
                  </td>
                  <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {membership.weekDays}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {membership.startTime} to {membership.endTime}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {membership.status}
                  </td>
                  <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className={(membership.status !== 'Active' ? 'bg-green px-3' : 'bg-material-red px-2') + " text-white active:bg-lightBlue-600 font-bold uppercase text-xs py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"}
                      type="button"
                      onClick={() => handleStatusChange(membership)}
                    >
                      {membership.status === 'Active' ? 'Leave' : 'Join'} Membership
                    </button>
                  </td>
                </tr>)
              })
              }
            </tbody>
            :
            <tbody className="text-md w-full text-center py-4">
              <tr><td> </td></tr>
              <tr>
                <td colspan="6">
                  No Memberships to Show
                </td>
              </tr>
              <tr><td> </td></tr>
            </tbody>
            }
          </table>
        </div>
      </div>
    </>
  );
}

MembershipTable.defaultProps = {
  color: "light",
};

MembershipTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

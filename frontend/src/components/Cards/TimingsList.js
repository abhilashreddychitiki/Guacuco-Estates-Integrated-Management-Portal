import React from "react";
import PropTypes from "prop-types";

// components
export default function TimingsList(props) {

  const handleEditChange = (timingId) => {
    const data = {
      id: timingId,
      action: 'edit'
    };
    props.onAction(data);
  };

  const handleStatusChange = (timingId) => {
    const data = {
      id: timingId,
      action: 'status'
    }
    props.onAction(data);
  };

  return (
    <>
      {props.timings?.length > 0 &&
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full shadow-xl rounded " +
            (props.color === "light" ? "bg-white" : "bg-white text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (props.color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  {props.activity} Timings
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
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    ID
                  </th>
                  <th
                    className={
                      "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    {props.activity} Name
                  </th>
                  <th
                    className={
                      "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Days of the Week
                  </th>
                  <th
                    className={
                      "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Timings
                  </th>
                  <th
                    className={
                      "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Status
                  </th>
                  <th
                    className={
                      "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.timings.map((timing, idx) => {
                  return (<tr key={idx}>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {timing.id}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {timing.name}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {timing.weekDays}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {timing.startTime} to {timing.endTime}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {timing.status}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mr-4"
                        type="button"
                        onClick={() => handleEditChange(timing.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleStatusChange(timing.id)}
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>)
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
}

TimingsList.defaultProps = {
  color: "light",
};

TimingsList.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

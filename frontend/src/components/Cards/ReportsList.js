import React from "react";
import PropTypes from "prop-types";

// components
export default function ReportsList(props) {
  return (
    <>
      {props.reports?.length > 0 &&
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
                  Reports Generated
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
                    Report Name
                  </th>
                  <th
                    className={
                      "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Date Range
                  </th>
                  <th
                    className={
                      "px-12 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (props.color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Filter
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
                </tr>
              </thead>
              <tbody>
                {props.reports.map((report, idx) => {
                  report.startDate = new Date(report.startDate).toLocaleString('en-GB', {day: "2-digit", month: "short", year: "numeric"}).replace('/', '-').replace('/', '-').toUpperCase();
                  report.endDate = new Date(report.endDate).toLocaleString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace('/', '-').replace('/', '-').toUpperCase();
                  return (<tr key={idx}>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {report.id}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {report.name}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {report.startDate} to {report.endDate}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" style={{textTransform: 'capitalize'}}>
                      {report.filter}
                    </td>
                    <td className="border-t-0 px-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {report.status === 'Processing' ? <span>Processing</span> :
                        <a
                          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                          type="button"
                          href={report.filePath}
                        >
                          Download
                        </a>
                      }
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

ReportsList.defaultProps = {
  color: "light",
};

ReportsList.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

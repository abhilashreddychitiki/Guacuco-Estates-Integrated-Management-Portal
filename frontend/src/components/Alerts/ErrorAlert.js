import React from "react";

export default function ErrorAlert({ message }) {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <>
      {showAlert ? (
        <div
          className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
        >
          <span className="text-xl inline-block align-middle" style={{marginRight: 8}}>
            <i className="fas fa-ban" />
          </span>
          <span className="inline-block text-xs align-middle" style={{marginRight: 8}}>
            {message}
          </span>
          {/* <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
            style={{marginRight: 20}}
          >
            <span>×</span>
          </button> */}
        </div>
      ) : null}
    </>
  );
};
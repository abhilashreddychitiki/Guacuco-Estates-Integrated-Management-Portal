import { useState, useEffect, React } from 'react';
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function DashboardNavbar() {
  const role = localStorage.getItem('role').replace('_', ' ');
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleString([], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace('/', '-').replace('/', '-').toUpperCase();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto text-white flex md:flex-nowrap flex-wrap ml-10">
          <span><b style={{textTransform: 'capitalize'}}>{role}</b><b> | {formattedDate}</b></span>
        </div>
        <div className="w-full mx-auto items-center flex md:flex-nowrap flex-wrap md:px-10 px-4 justify-end">
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}

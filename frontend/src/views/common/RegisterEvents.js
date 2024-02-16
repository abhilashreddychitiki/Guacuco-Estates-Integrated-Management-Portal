import React from "react";

// components

import EventsTable from "components/Cards/EventsTable";

export default function RegisterEvents() {
  return (
    <>
      <div className="flex flex-wrap w-full px-4">
        <EventsTable />
      </div>
    </>
  );
}

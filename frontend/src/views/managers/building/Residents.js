import React from "react";

// components
import ManageResidents from "components/Cards/Managers/ManageResidents";

export default function Residents() {
  return (
    <>
      <div className="flex flex-wrap w-full px-4">
        <ManageResidents />
      </div>
    </>
  );
}

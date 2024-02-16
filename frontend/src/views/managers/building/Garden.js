import React from "react";

// components
import ManageGarden from "components/Cards/Managers/ManageGarden";

export default function Garden() {
  return (
    <>
      <div className="flex flex-wrap w-full px-4">
        <ManageGarden />
      </div>
    </>
  );
}

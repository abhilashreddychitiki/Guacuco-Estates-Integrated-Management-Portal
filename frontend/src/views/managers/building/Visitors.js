import React from "react";

// components
import ManageVisitors from "components/Cards/Managers/ManageVisitors";

export default function Visitors() {
  return (
    <>
      <div className="flex flex-wrap w-full px-4">
        <ManageVisitors />
      </div>
    </>
  );
}

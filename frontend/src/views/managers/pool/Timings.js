import React from "react";

// components
import ManageTimings from "components/Cards/ManageTimings";

export default function PoolTimings() {
  return (
    <>
      <div className="flex flex-wrap w-full px-4">
        <ManageTimings
          activity='Pool'
        />
      </div>
    </>
  );
}

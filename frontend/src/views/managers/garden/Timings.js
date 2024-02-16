import React from "react";

// components
import ManageTimings from "components/Cards/ManageTimings";

export default function GardenTimings() {
  return (
    <>
      <div className="flex flex-wrap w-full px-4">
        <ManageTimings
          activity='Garden'
        />
      </div>
    </>
  );
}

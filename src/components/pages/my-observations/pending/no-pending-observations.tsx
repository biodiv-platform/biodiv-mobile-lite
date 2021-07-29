import "./pending.css";

import React from "react";

export default function NoPendingObservations() {
  return (
    <div className="no-pending">
      <div>
        <img src="/next-assets/done.svg" />
        <p>No Pending Observations</p>
      </div>
    </div>
  );
}

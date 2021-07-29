import "./offline-screen.css";

import React from "react";
import useGlobalState from "@hooks/use-global-state";

export default function OfflineScreen({ children }) {
  const { isOnline } = useGlobalState();

  return isOnline ? (
    children
  ) : (
    <div className="offline-screen">
      <div>
        <img src="/next-assets/offline.svg" />
        <p>You are offline</p>
      </div>
    </div>
  );
}

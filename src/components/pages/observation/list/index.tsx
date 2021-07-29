import OfflineScreen from "@components/core/offline-screen";
import React from "react";
import ObservationList from "./list";

export default function ObservationListPageComponent() {
  return (
    <OfflineScreen>
      <ObservationList />
    </OfflineScreen>
  );
}

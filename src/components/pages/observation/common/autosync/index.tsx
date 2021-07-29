import { DB_CONFIG } from "@static/observation-create";
import React from "react";
import IndexedDBProvider from "use-indexeddb";

import OfflineSync from "./offline-sync";

export function AutoSync() {
  return (
    <IndexedDBProvider config={DB_CONFIG}>
      <OfflineSync />
    </IndexedDBProvider>
  );
}

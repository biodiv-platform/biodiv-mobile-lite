import { Tab, Tabs } from "@components/core/simple-tabs";
import { MyObservationsListProvider } from "@hooks/use-my-observations-list";
import { cloudUploadOutline, imagesOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { PendingList } from "./pending";
import { Uploaded } from "./uploaded";

export default function MyObservationPageComponent() {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs value={tabIndex} onChange={setTabIndex}>
      <Tab icon={cloudUploadOutline} label={t("myObservations.pending")}>
        <PendingList />
      </Tab>
      <Tab icon={imagesOutline} label={t("myObservations.uploaded")}>
        <MyObservationsListProvider>
          <Uploaded />
        </MyObservationsListProvider>
      </Tab>
    </Tabs>
  );
}

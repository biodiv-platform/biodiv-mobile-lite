import PageWrapper from "@components/core/page-wrapper";
import MyObservationsPageComponent from "@components/pages/my-observations";
import { DB_CONFIG } from "@static/observation-create";
import React from "react";
import { useTranslation } from "react-i18next";
import IndexedDBProvider from "use-indexeddb";

export const MyObservationsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("myObservations.title")}>
      <IndexedDBProvider config={DB_CONFIG}>
        <MyObservationsPageComponent />
      </IndexedDBProvider>
    </PageWrapper>
  );
};

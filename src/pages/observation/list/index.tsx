import PageWrapper from "@components/core/page-wrapper";
import ObservationListPageComponent from "@components/pages/observation/list";
import { ObservationListProvider } from "@hooks/use-observation-list";
import React from "react";
import { useTranslation } from "react-i18next";

export const ObservationListPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("observation.list.title")}>
      <ObservationListProvider>
        <ObservationListPageComponent />
      </ObservationListProvider>
    </PageWrapper>
  );
};

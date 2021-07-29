import PageWrapper from "@components/core/page-wrapper";
import ObservationCreatePageComponent from "@components/pages/observation/create";
import React from "react";
import { useTranslation } from "react-i18next";

export const ObservationCreatePage = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("observation.add_observation")}>
      <ObservationCreatePageComponent />
    </PageWrapper>
  );
};

import PageWrapper from "@components/core/page-wrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import ShowPageComponent from "@components/pages/observation/show";
import { RouteComponentProps } from "react-router";

interface ShowPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const ShowPage: React.FC<ShowPageProps> = ({ match }) => {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("observation.show")} showBackButton={true}>
      <ShowPageComponent observationId={match.params.id} />
    </PageWrapper>
  );
};

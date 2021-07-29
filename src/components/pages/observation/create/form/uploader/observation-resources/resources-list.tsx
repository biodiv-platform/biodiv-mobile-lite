import "./uploader.css";

import React from "react";
import { useTranslation } from "react-i18next";

import useObservationCreate from "../use-observation-resources";
import DropTarget from "./drop-target";
import ResourceCard from "./resource-card";

interface ResourcesListProps {
  showHint?: boolean;
}

export default function ResourcesList({ showHint }: ResourcesListProps) {
  const { observationAssets } = useObservationCreate();
  const { t } = useTranslation();

  return (
    <div className="ion-padding">
      {showHint && <div className="ion-margin-bottom">💡 {t("form.description.resources")}</div>}
      <div>
        {observationAssets?.map((r, index) => (
          <ResourceCard resource={r} key={r.hashKey} index={index} />
        ))}
        <DropTarget />
      </div>
    </div>
  );
}

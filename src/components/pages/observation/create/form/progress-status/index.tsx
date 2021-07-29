import "./progress.css";

import { SYNC_SINGLE_OBSERVATION_DONE, SYNC_SINGLE_OBSERVATION_ERROR } from "@static/events";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { useTranslation } from "react-i18next";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";

const STATUS = {
  NONE: 0,
  SUCCESS: 1,
  FAILURE: 2
};

export default function ProgressStatus() {
  const [status, setStatus] = useState(STATUS.NONE);

  const history = useHistory();
  const { t } = useTranslation();

  useListener(() => setStatus(STATUS.FAILURE), [SYNC_SINGLE_OBSERVATION_ERROR]);
  useListener(() => setStatus(STATUS.SUCCESS), [SYNC_SINGLE_OBSERVATION_DONE]);

  switch (status) {
    case STATUS.SUCCESS:
      return (
        <div className="progress-screen">
          <div>
            <img src="/next-assets/done.svg" />
            <p>{t("observation.status.success")}</p>
          </div>
        </div>
      );

    case STATUS.FAILURE:
      return (
        <div className="progress-screen">
          <div>
            <img src="/next-assets/save.svg" />
            <p>{t("observation.status.failure")}</p>
            <IonButton onClick={() => history.replace("/my-observations")}>
              Pending Observations
            </IonButton>
          </div>
        </div>
      );

    default:
      return (
        <div className="progress-screen">
          <div>
            <img src="/next-assets/hourglass.svg" />
            <p>{t("observation.status.default")}</p>
          </div>
        </div>
      );
  }
}

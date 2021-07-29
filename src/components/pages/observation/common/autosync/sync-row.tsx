import { IonBadge, IonButton } from "@ionic/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Flex } from "reflexbox";

import { SyncInfo } from "./offline-sync";

interface SyncRowProps {
  syncInfo: SyncInfo;
  pendingObservation;
  deleteObservation;
}

export default function SyncRow({ syncInfo, pendingObservation, deleteObservation }: SyncRowProps) {
  const { t } = useTranslation();
  const { data, id } = pendingObservation;
  const thumb = useMemo(
    () =>
      data?.resources?.[0]?.blob
        ? window.URL.createObjectURL(data?.resources?.[0]?.blob)
        : undefined,
    []
  );

  const title = `${
    data?.recoData?.taxonCommonName || data?.recoData.taxonScientificName || t("unknown")
  } `;

  const isDone = syncInfo.successful.includes(id);
  const isFailed = syncInfo.failed.includes(id);
  const isUploading = !isDone && !isFailed && syncInfo.current === id;

  const handleOnDelte = () => deleteObservation(id);

  return (
    <div className="pending-observation-box">
      <img src={thumb} />
      <div>
        <Flex mb={2}>
          <Box mr={2}>{title}</Box>
          {isUploading && <IonBadge color="warning">{t("observation.sync.uploading")}</IonBadge>}
          {isDone && <IonBadge color="success">{t("observation.sync.done")}</IonBadge>}
          {/* {isFailed && <IonBadge color="danger">{t("observation.sync.failed")}</IonBadge>} */}
        </Flex>
        <small>{data?.reverseGeocoded}</small>
        <Flex>
          <IonButton
            color="danger"
            size="small"
            disabled={isDone || isUploading}
            onClick={handleOnDelte}
          >
            {t("common.delete")}
          </IonButton>
          {isDone && (
            <Box as="a" p={2} href={`/observation/show/${syncInfo.successMap[id]}`}>
              View
            </Box>
          )}
        </Flex>
      </div>
    </div>
  );
}

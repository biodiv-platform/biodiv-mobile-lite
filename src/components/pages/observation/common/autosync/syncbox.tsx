import "./autosync.css";

import { useDisclosure } from "@hooks/use-disclosure";
import { IonIcon } from "@ionic/react";
import { chevronUp, closeOutline } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

import { SyncInfo } from "./offline-sync";
import SyncRow from "./sync-row";

interface SyncBoxProps {
  syncInfo: SyncInfo;
  pendingObservations;
  deleteObservation;
  onClose;
}

export default function SyncBox({
  syncInfo,
  pendingObservations,
  deleteObservation,
  onClose
}: SyncBoxProps) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const { t } = useTranslation();

  return (
    <div className="syncbox-container">
      <div className="fadeInUp">
        <div className="header">
          <div className="text">{t("observation.sync.title")}</div>
          <div className="icons">
            <IonIcon
              aria-label={t("common.toggle")}
              className="sync-min-max"
              style={isOpen ? { transform: "rotate(180deg)" } : {}}
              icon={chevronUp}
              onClick={onToggle}
            />
            <IonIcon
              aria-label={t("common.close")}
              className="sync-close"
              icon={closeOutline}
              onClick={onClose}
            />
          </div>
        </div>
        {isOpen && (
          <div className="content fade">
            {pendingObservations.map((pendingObservation) => (
              <SyncRow
                key={pendingObservation.id}
                pendingObservation={pendingObservation}
                syncInfo={syncInfo}
                deleteObservation={deleteObservation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

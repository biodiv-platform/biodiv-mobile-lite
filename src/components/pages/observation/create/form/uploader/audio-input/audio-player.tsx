import { IonButton } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AudioPlayer({ src, onConfirm, onCancel }) {
  const { t } = useTranslation();

  return (
    <div className="fade">
      <audio controls={true} autoPlay={false}>
        <source src={src} type="audio/wav" />
      </audio>
      <IonButton type="button" onClick={onConfirm}>
        {t("form.use_in_observation")}
      </IonButton>
      <IonButton type="button" onClick={onCancel}>
        {t("common.cancel")}
      </IonButton>
    </div>
  );
}

import { IonButton, IonIcon } from "@ionic/react";
import { resizeMultiple } from "@utils/image";
import { cloudUploadOutline, stopwatchOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import useObservationCreate from "../use-observation-resources";

export const accept = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "video/*",
  "audio/*",
  "application/zip",
  "application/x-zip-compressed"
];

export default function DropTarget() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();
  const { addAssets } = useObservationCreate();

  const handleOnDrop = async (files) => {
    setIsProcessing(true);
    const resizedAssets = await resizeMultiple(files);

    addAssets(resizedAssets, true);
    setIsProcessing(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleOnDrop,
    accept
  });

  return (
    <div className="droptarget" {...getRootProps()}>
      <input {...getInputProps()} />
      {isProcessing ? (
        <div>
          <IonIcon size="large" icon={stopwatchOutline} />
          <div>{t("form.uploader.processing")}</div>
        </div>
      ) : isDragActive ? (
        <div>
          <IonIcon size="large" icon={cloudUploadOutline} />
          <div>{t("form.uploader.label_release")}</div>
        </div>
      ) : (
        <div>
          {t("form.uploader.label")}
          <div className="ion-padding">{t("common.or")}</div>
          <IonButton>{t("form.uploader.browse")}</IonButton>
        </div>
      )}
    </div>
  );
}

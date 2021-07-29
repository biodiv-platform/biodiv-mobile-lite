import { AspectRatio } from "@components/core/aspect-ratio";
import { IonIcon } from "@ionic/react";
import { resizeMultiple } from "@utils/image";
import { addOutline, cloudUploadOutline, stopwatchOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

import { accept } from "../observation-resources/drop-target";
import useObservationCreate from "../use-observation-resources";

export default function DropTarget() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();
  const { addAssets } = useObservationCreate();

  const handleOnDrop = async (files) => {
    setIsProcessing(true);
    const resizedAssets = await resizeMultiple(files);

    addAssets(resizedAssets, false);
    setIsProcessing(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleOnDrop,
    accept
  });

  return (
    <AspectRatio ratio={1}>
      <div className="drop-target-box" {...getRootProps()} data-dropping={isDragActive}>
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
          <p>
            <IonIcon size="large" icon={addOutline} />
          </p>
        )}
      </div>
    </AspectRatio>
  );
}

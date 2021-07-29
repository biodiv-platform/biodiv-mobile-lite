import AudioRecorder from "@components/core/audio-recoarder";
import { getAssetObject } from "@utils/image";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import useObservationCreate from "../use-observation-resources";
import AudioPlayer from "./audio-player";

export default function AudioInput({ onDone }) {
  const { t } = useTranslation();
  const { addAssets } = useObservationCreate();
  const [audioFile, setAudioFile] = useState<File>();
  const [audioFileURL, setAudioFileURL] = useState<string>();

  const onStop = (blob) => {
    setAudioFile(
      new File([blob], `${nanoid()}.wav`, {
        type: blob.type,
        lastModified: Date.now()
      })
    );
    setAudioFileURL(URL.createObjectURL(blob));
  };

  const onConfirm = () => {
    addAssets([getAssetObject(audioFile)], true);
    setAudioFile(undefined);
    onDone();
  };

  const onCancel = () => setAudioFile(undefined);

  return (
    <div className="ion-padding">
      <div className="ion-margin-bottom">ℹ️ {t("form.description.audio")}</div>
      {audioFile ? (
        <AudioPlayer src={audioFileURL} onConfirm={onConfirm} onCancel={onCancel} />
      ) : (
        <AudioRecorder mediaRecorderOptions={{ bitsPerSecond: 500 }} onStop={onStop} />
      )}
    </div>
  );
}

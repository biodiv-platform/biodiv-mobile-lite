import { IonButton, IonIcon } from "@ionic/react";
import { playOutline, stopOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useTimer } from "use-timer";

const pad = (number) => number.toString().toString().padStart(2, "0");

const SecondsToMinutes = ({ totalSeconds }) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  return (
    <>
      {pad(minutes)}:{pad(seconds)}
    </>
  );
};

interface IRecorderProps {
  mediaRecorderOptions: MediaRecorderOptions;
  onStop: (blob: Blob) => void;
  onPermissionDenied?: () => void;
  endTime?: number;
}

export default function AudioRecorder({
  onStop,
  onPermissionDenied,
  mediaRecorderOptions,
  endTime = 120
}: IRecorderProps) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaChunks = useRef<Blob[]>([]);
  const { t } = useTranslation();

  const getMediaStream = async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
    } catch (e) {
      onPermissionDenied && onPermissionDenied();
      console.error(e);
    }
  };

  const onRecordingActive = ({ data }: BlobEvent) => {
    mediaChunks.current.push(data);
  };

  const onRecordingStop = () => {
    const blob = new Blob(mediaChunks.current, { type: "audio/wav" });
    onStop(blob);
  };

  const startRecording = async () => {
    if (!mediaStream.current) {
      await getMediaStream();
    }
    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current, mediaRecorderOptions);
      mediaRecorder.current.ondataavailable = onRecordingActive;
      mediaRecorder.current.onstop = onRecordingStop;
      mediaRecorder.current.onerror = console.error;
      mediaRecorder.current.start();
      start();
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      reset();
    }
  };

  const { time, start, reset, status } = useTimer({ endTime, onTimeOver: stopRecording });

  return (
    <div className="fade">
      <div className="recorder">
        <SecondsToMinutes totalSeconds={time} />
      </div>
      <IonButton
        disabled={status === "RUNNING"}
        className="ion-margin-end ion-margin-top"
        onClick={startRecording}
        type="button"
      >
        <IonIcon icon={playOutline} /> {t("form.audio.start")}
      </IonButton>
      <IonButton
        disabled={status !== "RUNNING"}
        className="ion-margin-top"
        onClick={stopRecording}
        type="button"
      >
        <IonIcon icon={stopOutline} /> {t("form.audio.stop")}
      </IonButton>
    </div>
  );
}

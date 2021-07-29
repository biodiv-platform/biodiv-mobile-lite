import { Tab, Tabs } from "@components/core/simple-tabs";
import { FieldError } from "@components/form/common";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { TOGGLE_PHOTO_SELECTOR } from "@static/events";
import { checkmarkOutline, imagesOutline, logoYoutube, micOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

import AudioInput from "./audio-input";
import FromURL from "./from-url";
import MyUploads from "./my-uploads";
import ResourcesList from "./observation-resources/resources-list";
import useObservationCreate from "./use-observation-resources";

export interface IDropzoneProps {
  name: string;
  isCreate?: boolean;
  children?;
}

const DropzoneField = ({ name }: IDropzoneProps) => {
  const { observationAssets } = useObservationCreate();
  const [tabIndex, setTabIndex] = useState(0);
  const { t } = useTranslation();

  const { field, fieldState } = useController({ name });

  useEffect(() => {
    observationAssets?.length && field.onChange(observationAssets);
  }, []);

  useDidUpdateEffect(() => {
    field.onChange(observationAssets);
  }, [observationAssets]);

  useEffect(() => {
    emit(TOGGLE_PHOTO_SELECTOR, tabIndex !== 0);
  }, [tabIndex]);

  const onSelectionDone = () => setTabIndex(0);

  return (
    <div>
      <Tabs value={tabIndex} onChange={setTabIndex}>
        <Tab icon={checkmarkOutline} label={t("form.selected_media")}>
          <ResourcesList showHint={true} />
        </Tab>
        <Tab icon={imagesOutline} label={t("form.my_uploads")}>
          <MyUploads onDone={onSelectionDone} />
        </Tab>
        <Tab icon={micOutline} label={t("form.audio.title")}>
          <AudioInput onDone={onSelectionDone} />
        </Tab>
        <Tab icon={logoYoutube} label={t("form.from_url")}>
          <FromURL onDone={onSelectionDone} />
        </Tab>
      </Tabs>
      <FieldError children={JSON.stringify(fieldState?.error?.message)} />
    </div>
  );
};

export default DropzoneField;

import { CheckboxField } from "@components/form/checkbox";
import { SubmitButton } from "@components/form/submit-button";
import SITE_CONFIG from "@configs/site-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDisclosure } from "@hooks/use-disclosure";
import {
  RESOURCES_UPLOADING,
  SYNC_SINGLE_OBSERVATION,
  TOGGLE_PHOTO_SELECTOR
} from "@static/events";
import { dateToUTC } from "@utils/date";
import React, { useState } from "react";
import { emit, useListener } from "react-gbus";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import ObservationCustomFieldForm from "./custom-field-form";
import DateInputs from "./date";
import GroupSelector from "./groups";
import LocationPicker from "./location";
import { setLastData } from "./location/use-last-location";
import ProgressStatus from "./progress-status";
import Recodata from "./recodata";
import Uploader from "./uploader";

export default function ObservationCreateForm() {
  const { t } = useTranslation();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [isSelectedImages, setIsSelectedImages] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState();
  const [customFieldList] = useState();

  const parseDefaultCustomField = (list) => {
    return list?.map(
      ({
        customFields: { fieldType, dataType, name, id: customFieldId },
        isMandatory: isRequired,
        displayOrder,
        defaultValue,
        cfValues
      }) => ({
        value: null,
        isRequired,
        label: name,
        customFieldId,
        defaultValue,
        displayOrder,
        fieldType,
        dataType,
        options: cfValues.map(({ values, id, iconURL }) => ({
          value: id,
          label: values,
          iconURL,
          userGroupId: 0,
          fieldType
        }))
      })
    );
  };

  useListener(
    (isUploading) => {
      setIsSubmitDisabled(isUploading);
    },
    [RESOURCES_UPLOADING]
  );

  useListener((e) => setIsSelectedImages(e), [TOGGLE_PHOTO_SELECTOR]);

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        sGroup: Yup.number().required(),
        helpIdentify: Yup.boolean().required(),

        // recoData
        taxonCommonName: Yup.string().nullable(),
        scientificNameTaxonId: Yup.mixed().nullable(),
        taxonScientificName: Yup.string().nullable(),
        recoComment: Yup.string().nullable(),
        confidence: Yup.number().nullable(),
        languageId: Yup.mixed().nullable(),

        // Extra
        notes: Yup.string().nullable(),
        tags: Yup.array().nullable(),

        // Date and Location
        observedOn: Yup.string().required(),
        dateAccuracy: Yup.string().required(),
        observedAt: Yup.string().required(),
        reverseGeocoded: Yup.string().required(),
        locationScale: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        useDegMinSec: Yup.boolean(),
        hidePreciseLocation: Yup.boolean(),

        resources: Yup.array().min(1).required(),
        terms: Yup.boolean().oneOf([true], "The terms and conditions must be accepted."),

        //custom field data
        customFields: Yup.array().of(
          Yup.object().shape({
            isRequired: Yup.boolean(),
            value: Yup.mixed().when("isRequired", {
              is: true,
              then: Yup.mixed().required(),
              otherwise: Yup.mixed().nullable()
            })
          })
        )
      })
    ),
    defaultValues: {
      sGroup: undefined,
      helpIdentify: false,

      taxonCommonName: null,
      scientificNameTaxonId: null,
      taxonScientificName: null,
      recoComment: null,
      confidence: null,
      languageId: SITE_CONFIG.LANG.DEFAULT_ID,

      notes: null,
      tags: [],

      dateAccuracy: "ACCURATE",
      observedAt: "",
      reverseGeocoded: "",
      locationScale: "APPROXIMATE",
      latitude: 0,
      longitude: 0,
      useDegMinSec: false,
      hidePreciseLocation: false,

      resources: [],
      terms: true,

      customFields: parseDefaultCustomField(customFieldList)
    }
  });

  const { fields }: any = useFieldArray({
    control: hForm.control,
    name: "customFields"
  });

  const handleOnSubmit = async ({
    taxonCommonName,
    scientificNameTaxonId,
    taxonScientificName,
    recoComment,
    confidence,
    languageId: lId,
    tags,
    customFields,
    terms,
    ...rest
  }) => {
    const observedOn = dateToUTC(rest.observedOn).format();
    const payload = {
      ...rest,
      observedOn,
      fromDate: observedOn,
      toDate: observedOn,
      helpIdentify: !taxonCommonName && !taxonScientificName,
      recoData: {
        taxonCommonName,
        scientificNameTaxonId,
        taxonScientificName,
        recoComment,
        confidence,
        languageId: lId
      },
      factValuePairs: {},
      factValueStringPairs: {},
      userGroupId: [],
      tags,
      protocol: "SINGLE_OBSERVATION",
      basisOfRecords: "HUMAN_OBSERVATION",
      obsvLanguageId: SITE_CONFIG.LANG.DEFAULT_ID,
      useDegMinSec: false,
      degMinSec: null
    };
    setLastData(rest.latitude, rest.longitude, rest.observedAt, fields, customFields);
    emit(SYNC_SINGLE_OBSERVATION, {
      observation: payload,
      instant: true
    });
    onClose();
  };

  return isOpen ? (
    <div>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <Uploader name="resources" />
          <div hidden={isSelectedImages}>
            <Recodata />
            <GroupSelector />
            <LocationPicker />
            <DateInputs />
            {customFieldList && <ObservationCustomFieldForm fields={fields} />}
            <CheckboxField name="terms" label={t("form.terms")} />
            <SubmitButton isDisabled={isSubmitDisabled}>
              {t("observation.add_observation")}
            </SubmitButton>
          </div>
        </form>
      </FormProvider>
    </div>
  ) : (
    <ProgressStatus />
  );
}

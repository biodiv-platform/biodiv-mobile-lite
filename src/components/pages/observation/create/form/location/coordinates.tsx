import { CheckboxField } from "@components/form/checkbox";
import ErrorMessage from "@components/form/common/error-message";
import { IonInput } from "@ionic/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box, Flex } from "reflexbox";

interface ICoordinatesProps {
  show: boolean;
  fk;
  coordinates;
  setCoordinates;
}

export default function CoordinatesInput({
  show,
  fk,
  coordinates: { lat, lng },
  setCoordinates
}: ICoordinatesProps) {
  const form = useFormContext();
  const { t } = useTranslation();

  const setLat = (e) => {
    const value = e.target.value;
    setCoordinates({ lat: value, lng });
  };

  const setLng = (e) => {
    const value = e.target.value;
    setCoordinates({ lng: value, lat });
  };

  return (
    <div hidden={!show}>
      <Box
        mb={4}
        data-invalid={
          (form.formState.errors[fk.latitude.name] || form.formState.errors[fk.longitude.name]) &&
          true
        }
        isRequired={true}
      >
        <label htmlFor="coordinates">{t("observation.coordinates")}</label>

        <Flex id="coordinates">
          <IonInput
            id="lat"
            placeholder={t("observation.latitude")}
            value={lat}
            onChange={setLat}
          />
          <IonInput
            id="lng"
            placeholder={t("observation.longitude")}
            value={lng}
            onChange={setLng}
          />
        </Flex>
        <ErrorMessage name={fk.latitude.name} errors={form.formState.errors} />
        <ErrorMessage name={fk.longitude.name} errors={form.formState.errors} />
      </Box>
      <CheckboxField name="hidePreciseLocation" label={t("observation.hide_precise_location")} />
    </div>
  );
}

import { IonInput } from "@ionic/react";
import React from "react";
import { useController } from "react-hook-form";
import MobileInput from "react-phone-number-input";

import SITE_CONFIG from "@configs/site-config";
import { FieldWrapper } from "./common";

interface PhoneNumberInputFieldProps {
  name;
  label?;
  disabled?: boolean;
  hint?: string;
  placeholder?: string;
}

export const PhoneNumberInputField: React.FC<PhoneNumberInputFieldProps> = ({
  name,
  label,
  disabled,
  hint,
  placeholder
}) => {
  const { field, fieldState } = useController({
    name,
    defaultValue: "" // to prevent uncontrolled to controlled error
  });

  return (
    <FieldWrapper label={label} hint={hint} fieldState={fieldState}>
      <MobileInput
        id={name}
        inputComponent={IonInput}
        placeholder={placeholder}
        countrySelectProps={{ unicodeFlags: true }}
        defaultCountry={SITE_CONFIG.MAP.COUNTRY}
        disabled={disabled}
        value={field.value}
        onIonBlur={field.onBlur}
        onChange={() => null}
        onIonChange={(e) => field.onChange(e.detail?.value)}
      />
    </FieldWrapper>
  );
};

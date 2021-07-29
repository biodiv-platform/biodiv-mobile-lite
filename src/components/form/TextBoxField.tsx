import { IonInput } from "@ionic/react";
import React from "react";
import { useController } from "react-hook-form";

import { FieldWrapper } from "./common";

interface TextBoxFieldProps {
  name;
  label?;
  type?;
  disabled?: boolean;
  hint?: string;
  placeholder?: string;
  isRequired?;
}

export function TextBoxField({
  name,
  label,
  type,
  disabled,
  hint,
  placeholder,
  isRequired
}: TextBoxFieldProps) {
  const { field, fieldState } = useController({
    name,
    defaultValue: "" // to prevent uncontrolled to controlled error
  });

  return (
    <FieldWrapper label={label} hint={hint} fieldState={fieldState} isRequired={isRequired}>
      <IonInput
        name={name}
        type={type}
        placeholder={placeholder}
        onBlur={field.onBlur}
        value={field.value}
        spellCheck={false}
        onIonBlur={field.onBlur}
        onIonChange={(e) => field.onChange(e.detail.value)}
        disabled={disabled}
      />
    </FieldWrapper>
  );
}

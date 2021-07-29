import { IonCheckbox, IonLabel } from "@ionic/react";
import React from "react";
import { useController } from "react-hook-form";

import { FieldWrapper } from "./common";

interface ITextBoxProps {
  name: string;
  label: string;
  disabled?: boolean;
  isRequired?: boolean;
  hint?: string;
}

export const CheckboxField = ({ name, label, hint, disabled, isRequired }: ITextBoxProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState
  } = useController({ name });

  return (
    <FieldWrapper hint={hint} fieldState={fieldState} isRequired={isRequired}>
      <IonCheckbox
        className="ion-margin-end"
        checked={value}
        disabled={disabled}
        onIonBlur={onBlur}
        onIonChange={(e) => onChange(e.detail?.checked)}
      />
      <IonLabel text-wrap>{label}</IonLabel>
    </FieldWrapper>
  );
};

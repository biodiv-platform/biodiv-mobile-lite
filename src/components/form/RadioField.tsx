import { IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from "@ionic/react";
import React from "react";
import { useController } from "react-hook-form";
import { Flex } from "reflexbox";

import { FieldWrapper } from "./common";

interface RadioFieldProps {
  name;
  label?;
  hint?: string;
  options?;
}

export function RadioField({ name, label, hint, options }: RadioFieldProps) {
  const { field, fieldState } = useController({
    name,
    defaultValue: "" // to prevent uncontrolled to controlled error
  });

  return (
    <FieldWrapper label={label} hint={hint} fieldState={fieldState}>
      <IonList>
        <Flex
          as={IonRadioGroup}
          value={field.value}
          onIonChange={(e) => field.onChange(e.detail.value)}
        >
          {options.map((option) => (
            <IonItem key={option.value}>
              <IonLabel>{option.label}</IonLabel>
              <IonRadio slot="start" value={option.value} />
            </IonItem>
          ))}
        </Flex>
      </IonList>
    </FieldWrapper>
  );
}

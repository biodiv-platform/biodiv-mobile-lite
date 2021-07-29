import "./styles.css";

import { IonItem, IonLabel, IonText } from "@ionic/react";
import React from "react";
import { Box } from "reflexbox";

export const FieldHint: React.FC = ({ children }) =>
  children ? (
    <IonText className="error-text" color="medium">
      {children}
    </IonText>
  ) : null;

export const FieldError: React.FC = ({ children }) =>
  children ? (
    <IonText className="error-text" color="danger">
      {children}
    </IonText>
  ) : null;

interface FieldWrapperProps {
  label?;
  hint?;
  fieldState?;
  children;
  isRequired?;
  hidden?;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  hint,
  fieldState,
  children,
  isRequired,
  hidden
}) => (
  <div hidden={hidden}>
    <IonItem aria-invalid={fieldState.invalid}>
      {label && (
        <IonLabel position="stacked">
          {label}
          {isRequired && <Box as="span" color="red" ml={2} children="*" />}
        </IonLabel>
      )}
      {children}
    </IonItem>
    <FieldHint children={hint} />
    <FieldError children={fieldState?.error?.message} />
  </div>
);

import { IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";

interface ISubmitButtonProps {
  children;
  leftIcon?;
  rightIcon?;
  isDisabled?;
  colorScheme?;
  mb?;
  w?;
  mt?;
}

export const SubmitButton = ({
  children,
  isDisabled,
  colorScheme = "primary",
  ...rest
}: ISubmitButtonProps) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(isDisabled);
  }, [isDisabled]);

  return (
    <IonButton
      color={colorScheme}
      type="submit"
      expand="block"
      disabled={disabled}
      className="ion-margin"
      {...rest}
    >
      {children}
    </IonButton>
  );
};

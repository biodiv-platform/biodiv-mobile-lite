import useGlobalState from "@hooks/use-global-state";
import { IonLoading } from "@ionic/react";
import React from "react";

export function GlobalLoading() {
  const { isLoading } = useGlobalState();

  return <IonLoading isOpen={isLoading} message="Please wait..." />;
}

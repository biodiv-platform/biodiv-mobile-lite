import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";

export function FabButton() {
  const history = useHistory();

  const goToObservationCreate = () => history.push("/observation/create");

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={goToObservationCreate}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
}

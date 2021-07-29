import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import React from "react";

interface PageWrapperProps {
  title;
  children;
  showBackButton?;
}

export default function PageWrapper({ title, children, showBackButton }: PageWrapperProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {showBackButton ? <IonBackButton defaultHref="/" /> : <IonMenuButton />}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
}

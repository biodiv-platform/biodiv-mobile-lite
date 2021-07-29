import "./menu.css";

import useGlobalState from "@hooks/use-global-state";
import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle
} from "@ionic/react";
import { getLocalIcon, getUserImage } from "@utils/media";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Img } from "react-image";
import { appPages } from "./pages";

export const Menu: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn, user } = useGlobalState();
  const { t } = useTranslation();

  return (
    <IonMenu contentId="main" type="overlay" disabled={!isLoggedIn}>
      <IonContent>
        <IonList id="inbox-list">
          <IonItem className="ion-margin-bottom">
            <IonAvatar slot="start">
              <Img
                src={[
                  getUserImage(user?.profile_pic, user?.name),
                  getLocalIcon("default-user", "user")
                ]}
              />
            </IonAvatar>
            <IonLabel>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </IonLabel>
          </IonItem>
          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? "selected" : ""}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{t(appPage.title)}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

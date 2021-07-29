import "./card.css";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonLabel,
  IonAvatar,
  IonChip
} from "@ionic/react";
import { Img } from "react-image";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { getUserImage, getLocalIcon } from "@utils/media";

export const ObservationCard = ({
  commonName,
  scientificName,
  thumbnail,
  observationId,
  user,
  showUser = true
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const navigate = () => {
    history.replace(`/observation/show/${observationId}`);
  };

  return (
    <IonCard onClick={navigate}>
      <div className="observation-thumb">
        <Img src={thumbnail} />
        {showUser && (
          <div className="user-avatar">
            <IonChip className="avatar-chip">
              <IonAvatar>
                <Img
                  src={[
                    getUserImage(user?.profilePic, user?.name),
                    getLocalIcon("default-user", "user")
                  ]}
                />
              </IonAvatar>
              <IonLabel>{user?.name}</IonLabel>
            </IonChip>
          </div>
        )}
      </div>
      <IonCardHeader>
        <IonCardTitle>{scientificName || t("unknown")}</IonCardTitle>
        <IonCardSubtitle>{commonName || t("unknown")}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

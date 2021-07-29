import {
  IonAvatar,
  IonBadge,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/react";
import { TAXON_BADGE_COLORS } from "@static/constants";
import { getSpeciesGroupNameById } from "@utils/basic";
import { formatDateReadableFromUTC } from "@utils/date";
import { getLocalIcon, getUserImage } from "@utils/media";
import React from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import { Box, Flex } from "reflexbox";

import GMap from "./gmap";
import Slides from "./slides";

export default function ObservationShowContainer({ data }) {
  const { t } = useTranslation();

  return (
    <div>
      <IonCardHeader>
        <IonCardTitle>{data?.recoIbp?.scientificName || t("unknown")}</IonCardTitle>
        <IonCardSubtitle className="card-heading">
          {data?.recoIbp?.commonName || t("unknown")}
        </IonCardSubtitle>
      </IonCardHeader>
      {data?.recoIbp?.status && (
        <Box as={IonBadge} color={TAXON_BADGE_COLORS[data?.recoIbp?.status]} mb={3}>
          {data?.recoIbp?.status}
        </Box>
      )}
      <Slides
        resources={data?.observationResource}
        speciesGroup={getSpeciesGroupNameById(data?.observation?.groupId)}
      />

      <Box as={IonChip} mx={2} my={3} className="avatar">
        <IonAvatar>
          <Img
            src={[
              getUserImage(data?.authorInfo?.profilePic, data?.authorInfo?.name),
              getLocalIcon("default-user", "user")
            ]}
          />
        </IonAvatar>
        <IonLabel>{data?.authorInfo?.name}</IonLabel>
      </Box>

      <IonList>
        <IonItem>
          <IonLabel>{t("show.name")}</IonLabel>
          <div>
            {data?.recoIbp?.scientificName || t("unknown")}
            <br />
            {data?.recoIbp?.commonName || t("unknown")}
          </div>
        </IonItem>

        <IonItem>
          <IonLabel>{t("show.group")}</IonLabel>
          <Flex alignItems="center">
            <Box
              as="img"
              mr={2}
              height="2rem"
              width="2rem"
              src={getLocalIcon(getSpeciesGroupNameById(data?.observation?.groupId))}
            />
            {getSpeciesGroupNameById(data?.observation?.groupId) || t("unknown")}
          </Flex>
        </IonItem>

        <IonItem>
          <IonLabel>{t("common.observed_on")}</IonLabel>
          <div>{formatDateReadableFromUTC(data?.observation?.fromDate)}</div>
        </IonItem>

        <IonItem>
          <IonLabel>{t("show.created_on")}</IonLabel>
          <div>{formatDateReadableFromUTC(data?.observation?.createdOn)}</div>
        </IonItem>

        <IonItem>
          <IonLabel>{t("show.place")}</IonLabel>
          <div>{data?.observation?.placeName || t("unknown")}</div>
        </IonItem>
      </IonList>

      <GMap lat={data?.observation?.latitude} lng={data?.observation?.longitude} />
    </div>
  );
}

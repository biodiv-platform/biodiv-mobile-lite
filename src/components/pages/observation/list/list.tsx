import { FabButton } from "@components/core/fab-button";
import { ObservationCard } from "@components/core/observation-card";
import useObservationList from "@hooks/use-observation-list";
import {
  IonCol,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonSpinner
} from "@ionic/react";
import { getLocalIcon, getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React, { useEffect } from "react";

export default function ObservationList() {
  const { isLoading, loadMore, observations } = useObservationList();

  useEffect(() => {
    loadMore(true);
  }, []);

  async function searchNext($event: CustomEvent<void>) {
    await loadMore();
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  return (
    <>
      <FabButton />

      {isLoading && <IonSpinner className="spinner" name="crescent" />}

      <IonGrid>
        <IonRow className="ion-align-items-center">
          {observations?.map((data) => (
            <IonCol sizeXs="12" sizeMd="6" sizeLg="4" key={data?.observationId}>
              <ObservationCard
                commonName={data?.recoIbp?.commonName}
                scientificName={data?.recoIbp?.scientificName}
                observationId={data?.observationId}
                thumbnail={[
                  getResourceThumbnail(RESOURCE_CTX.OBSERVATION, data?.thumbnail, "?h=300"),
                  getLocalIcon(data?.speciesGroup)
                ]}
                user={data?.user}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <IonInfiniteScroll threshold="100px" disabled={isLoading} onIonInfinite={searchNext}>
        <IonInfiniteScrollContent loadingSpinner="circles" loadingText="Loading..." />
      </IonInfiniteScroll>
    </>
  );
}

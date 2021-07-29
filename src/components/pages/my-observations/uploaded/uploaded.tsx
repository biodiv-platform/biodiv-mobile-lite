import "./uploaded.css";

import { ObservationCard } from "@components/core/observation-card";
import useGlobalState from "@hooks/use-global-state";
import useMyObservationsList from "@hooks/use-my-observations-list";
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

export const UploadedList = () => {
  const { user, isOnline } = useGlobalState();
  const { isLoading, loadMore, observations } = useMyObservationsList();

  useEffect(() => {
    loadMore(true);
  }, []);

  async function searchNext($event: CustomEvent<void>) {
    await loadMore();
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  return (
    <div>
      {isOnline && (
        <>
          {isLoading && <IonSpinner className="spinner" name="crescent" />}
          <IonGrid>
            <IonRow className="ion-align-items-center">
              {observations?.map((data) => (
                <IonCol sizeXs="12" sizeMd="6" sizeLg="4" key={data?.observationId}>
                  <ObservationCard
                    commonName={data?.recoData?.taxonCommonName}
                    scientificName={data?.recoData?.taxonScientificName}
                    observationId={data?.observationId}
                    thumbnail={[
                      getResourceThumbnail(RESOURCE_CTX.OBSERVATION, data?.thumbnail, "?h=300"),
                      getLocalIcon(data?.speciesGroup)
                    ]}
                    user={{ name: user?.name, profilePic: user?.profile_pic }}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          <IonInfiniteScroll threshold="100px" disabled={isLoading} onIonInfinite={searchNext}>
            <IonInfiniteScrollContent loadingText="Loading..." />
          </IonInfiniteScroll>
        </>
      )}
    </div>
  );
};

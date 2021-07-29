import { ObservationCard } from "@components/core/observation-card";
import useGlobalState from "@hooks/use-global-state";
import { IDBPendingObservation } from "@interfaces/custom";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { STORE } from "@static/observation-create";
import { getLocalIcon } from "@utils/media";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { useIndexedDBStore } from "use-indexeddb";

import NoPendingObservations from "./no-pending-observations";

export const PendingList = () => {
  const [observations, setObservations] = useImmer({ l: undefined as any });
  const { user } = useGlobalState();

  const { getAll: getAllObservations } = useIndexedDBStore<IDBPendingObservation>(
    STORE.PENDING_OBSERVATIONS
  );

  const fetchAssets = async () => {
    const data = await getAllObservations();
    setObservations((_draft) => {
      _draft.l = data.map((o) => ({
        ...o,
        thumbnail: window.URL.createObjectURL(o.data?.resources?.[0]?.blob)
      }));
    });
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        {observations.l &&
          (observations.l.length ? (
            observations.l.map(({ id, data, thumbnail }) => (
              <IonCol sizeXs="12" sizeMd="6" sizeLg="4" key={id}>
                <ObservationCard
                  commonName={data?.recoData?.taxonCommonName}
                  scientificName={data?.recoData?.taxonScientificName}
                  observationId={data?.observationId}
                  thumbnail={[thumbnail, getLocalIcon(data?.speciesGroup)]}
                  user={{ name: user?.name, profilePic: user?.profile_pic }}
                  showUser={false}
                />
              </IonCol>
            ))
          ) : (
            <NoPendingObservations />
          ))}
      </IonRow>
    </IonGrid>
  );
};

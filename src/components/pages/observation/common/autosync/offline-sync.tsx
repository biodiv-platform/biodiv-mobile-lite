import { useDisclosure } from "@hooks/use-disclosure";
import useGlobalState from "@hooks/use-global-state";
import { AssetStatus, IDBObservationAsset, IDBPendingObservation } from "@interfaces/custom";
import { axUploadObservationResource } from "@services/files.service";
import { axCreateObservation } from "@services/observation.service";
import {
  SYNC_SINGLE_OBSERVATION,
  SYNC_SINGLE_OBSERVATION_DONE,
  SYNC_SINGLE_OBSERVATION_ERROR
} from "@static/events";
import { STORE } from "@static/observation-create";
import notification, { NotificationType } from "@utils/notification";
import React, { useEffect, useState } from "react";
import { emit, useListener } from "react-gbus";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useImmer } from "use-immer";
import { useIndexedDBStore } from "use-indexeddb";

import SyncBox from "./syncbox";

export interface SyncInfo {
  current: number | null;
  failed: any[];
  successful: any[];
  successMap: Record<string, unknown>;
}

export default function OfflineSync() {
  const { isOnline } = useGlobalState();
  const { t } = useTranslation();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [pendingObservations, setPendingObservations] = useState<any[]>([]);
  const [syncInfo, setSyncInfo] = useImmer<SyncInfo>({
    current: null,
    failed: [],
    successful: [],
    successMap: {}
  });
  const { update, deleteByID: deleteResource } = useIndexedDBStore<IDBObservationAsset>(
    STORE.ASSETS
  );
  const {
    add: addObservation,
    getAll: getAllObservations,
    deleteByID: deleteObservation,
    getByID: getObservation
  } = useIndexedDBStore<IDBPendingObservation>(STORE.PENDING_OBSERVATIONS);

  const trySyncSingleObservation = async ({ observation, instant, id = -1 }) => {
    let idbID = id;

    if (instant) {
      try {
        idbID = await addObservation({ data: observation } as any);
      } catch (e) {
        console.error("addObservationIDB", e);
      }
    } else {
      setSyncInfo((_draft) => {
        _draft.current = idbID;
      });
    }

    try {
      for (const resource of observation.resources) {
        await update({ ...resource, isUsed: 1 });
      }
    } catch (e) {
      console.error("updateResourceIDB", e);
    }

    try {
      await Promise.all(
        observation.resources
          .filter((r) => r.status !== AssetStatus.Uploaded)
          .map(axUploadObservationResource)
      );
      const { success, data } = await axCreateObservation(observation);
      if (success) {
        await deleteObservation(idbID);
        for (const resource of observation.resources) {
          await deleteResource(resource.id);
        }

        if (instant) {
          notification(
            t("observation.points_gained", {
              points: data?.activityCount
            }),
            NotificationType.Success
          );
          emit(SYNC_SINGLE_OBSERVATION_DONE);
          history.replace(`/observation/show/${data.observation.id}`);
        } else {
          setSyncInfo((_draft) => {
            _draft.successMap[idbID] = data.observation.id;
            _draft.successful.push(idbID);
          });
        }
      } else {
        emit(SYNC_SINGLE_OBSERVATION_ERROR);
        setSyncInfo((_draft) => {
          _draft.failed.push(idbID);
        });
      }
    } catch (e) {
      emit(SYNC_SINGLE_OBSERVATION_ERROR);
      setSyncInfo((_draft) => {
        _draft.failed.push(idbID);
      });
      console.error(e);
    }
  };

  useListener(trySyncSingleObservation, [SYNC_SINGLE_OBSERVATION]);

  const trySyncPendingObservations = async () => {
    const poList = await getAllObservations();
    setPendingObservations(poList);
    const poIds = poList.map((o) => o.id);

    onOpen();

    for (const poId of poIds) {
      const po = await getObservation(poId);
      if (po) {
        trySyncSingleObservation({
          observation: po.data,
          instant: false,
          id: po?.id
        });
      }
    }

    setSyncInfo((_draft) => {
      _draft.current = null;
    });
  };

  useEffect(() => {
    if (isOnline && document.hasFocus()) {
      trySyncPendingObservations();
    }
  }, [isOnline]);

  const handleOnDeleteObservation = (poId) => {
    deleteObservation(poId);
    setPendingObservations(pendingObservations.filter(({ id }) => id !== poId));
  };

  return (
    <div>
      {isOpen && pendingObservations.length > 0 && (
        <SyncBox
          syncInfo={syncInfo}
          pendingObservations={pendingObservations}
          deleteObservation={handleOnDeleteObservation}
          onClose={onClose}
        />
      )}
      {!isOnline && <div>{t("common.offline")}</div>}
    </div>
  );
}

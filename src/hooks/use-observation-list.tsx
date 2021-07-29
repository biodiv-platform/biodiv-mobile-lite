import React, { createContext, useContext, useState } from "react";
import { useImmer } from "use-immer";

import { axGetListData } from "../services/observation.service";

interface ObservationListContextProps {
  observations?;
  loadMore?;
  isLoading?;
}

interface ObservationListProviderProps {
  children;
}

const ObservationListContext = createContext<ObservationListContextProps>(
  {} as ObservationListContextProps
);

const OBSERVATIONS_SIZE = 10;

export const ObservationListProvider = ({ children }: ObservationListProviderProps) => {
  const [observations, setObservations] = useImmer<any>({ l: [], offset: 0 });
  const [isLoading, setIsLoading] = useState<boolean>();

  const loadMore = async (reset?) => {
    setIsLoading(true);

    if (reset) {
      setObservations((_draft) => {
        _draft.l = [];
      });
    }

    const { success, data } = await axGetListData({
      sort: "created_on",
      max: OBSERVATIONS_SIZE,
      view: "list_minimal",
      offset: observations.offset,
      mediaFilter: "no_of_images"
    });
    if (success) {
      setObservations((_draft) => {
        _draft.l.push(...data?.observationListMinimal);
        _draft.offset = _draft.offset + OBSERVATIONS_SIZE;
      });
    }

    setIsLoading(false);
  };

  return (
    <ObservationListContext.Provider
      value={{
        observations: observations.l,
        loadMore,
        isLoading
      }}
    >
      {children}
    </ObservationListContext.Provider>
  );
};

export default function useObservationList() {
  return useContext(ObservationListContext);
}

import React, { createContext, useContext, useState } from "react";
import { useImmer } from "use-immer";
import { axGetMyObservations } from "@services/observation.service";
import useGlobalState from "./use-global-state";

interface MyObservationsListContextProps {
  observations?;
  loadMore?;
  isLoading?;
}

interface MyObservationsListProviderProps {
  children;
}

const MyObservationsListContext = createContext<MyObservationsListContextProps>(
  {} as MyObservationsListContextProps
);

const OBSERVATIONS_SIZE = 10;

export const MyObservationsListProvider = ({ children }: MyObservationsListProviderProps) => {
  const [observations, setObservations] = useImmer<any>({ l: [], offset: 0 });
  const [isLoading, setIsLoading] = useState<boolean>();
  const { isLoggedIn, user } = useGlobalState();

  const loadMore = async (reset?) => {
    if (isLoggedIn) {
      setIsLoading(true);
      const { success, data } = await axGetMyObservations({
        userId: user.id,
        sort: "created_on",
        max: OBSERVATIONS_SIZE,
        view: "list_minimal",
        offset: observations.offset
      });

      if (success) {
        setObservations((_draft) => {
          if (reset) {
            _draft.l = [];
          }
          _draft.l.push(...data?.observationListMinimal);
          _draft.offset = _draft.offset + OBSERVATIONS_SIZE;
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <MyObservationsListContext.Provider
      value={{
        observations: observations.l,
        loadMore,
        isLoading
      }}
    >
      {children}
    </MyObservationsListContext.Provider>
  );
};

export default function useMyObservationsList() {
  return useContext(MyObservationsListContext);
}

import { Network } from "@capacitor/network";
import { StatusBar } from "@capacitor/status-bar";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axGetLangList, axGetspeciesGroups } from "@services/observation.service";
import { axGetLicenseList } from "@services/resource.service";
import { timeOut } from "@utils/basic";
import { Storage } from "@utils/storage";
import JWTDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { emit, useListener } from "react-gbus";

import { EVENTS, STORAGE_KEYS } from "../static/constants";

interface GlobalStateContextProps {
  initializeStorage;
  user?;
  setUser;
  isLoggedIn: boolean;
  isOnline;

  isLoading?;
  setIsLoading?;
}

interface GlobalStateProviderProps {
  children;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({} as GlobalStateContextProps);

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [user, setUser] = useState<any>({ init: false });
  const [isLoading, setIsLoading] = useState<boolean>();

  const isLoggedIn = useMemo(() => !!user.id, [user]);

  useListener(
    ({ BAToken, BRToken }) => {
      const decoded: any = JWTDecode(BAToken);
      setUser({
        ...decoded,
        id: parseInt(decoded.id),
        accessToken: BAToken,
        refreshToken: BRToken,
        init: true
      });
    },
    [EVENTS.AUTH.SUCCESS]
  );

  const initializeStorage = async () => {
    const BAToken = Storage.get(STORAGE_KEYS.BA_TOKEN);
    const BRToken = Storage.get(STORAGE_KEYS.BR_TOKEN);

    const { success: s1, data: languages } = await axGetLangList();
    const { success: s2, data: licenses } = await axGetLicenseList();
    const { success: s3, data: speciesGroups } = await axGetspeciesGroups();

    // fetch dynamic data for offline usage
    s1 && Storage.set(STORAGE_KEYS.LANGUAGES, languages);
    s2 && Storage.set(STORAGE_KEYS.LICENSES, licenses);
    s3 && Storage.set(STORAGE_KEYS.SPECIES_GROUPS, speciesGroups);

    if (BAToken) {
      emit(EVENTS.AUTH.SUCCESS, {
        BAToken: BAToken,
        BRToken: BRToken
      });
    } else {
      setUser({ init: true });
    }
  };

  useEffect(() => {
    initializeStorage();
    setNetworkListener();
  }, []);

  const setNetworkListener = async () => {
    try {
      Network.addListener("networkStatusChange", async ({ connected }) => {
        await timeOut();
        setIsOnline(connected);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnNetworkChange = async () => {
    try {
      if (isOnline) {
        StatusBar.setBackgroundColor({ color: "#34c759" });
        await timeOut();
        StatusBar.setBackgroundColor({ color: "#000000" });
      } else {
        StatusBar.setBackgroundColor({ color: "#ff3b30" });
      }
    } catch (e) {
      console.error("Not device", e);
    }
  };

  useDidUpdateEffect(() => {
    handleOnNetworkChange();
  }, [isOnline]);

  return (
    <GlobalStateContext.Provider
      value={{
        initializeStorage,

        user,
        setUser,
        isOnline,
        isLoggedIn,

        isLoading,
        setIsLoading
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default function useGlobalState() {
  return useContext(GlobalStateContext);
}

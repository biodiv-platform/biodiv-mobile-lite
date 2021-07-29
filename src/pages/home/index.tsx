import useGlobalState from "@hooks/use-global-state";
import { IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

export const HomePage = () => {
  const { user, isLoggedIn } = useGlobalState();
  const history = useHistory();

  useEffect(() => {
    if (user.init) {
      history.replace(isLoggedIn ? "/observation/list" : "/login");
    }
  }, [user.init]);

  return <IonPage />;
};

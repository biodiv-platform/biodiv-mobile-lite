import useGlobalState from "@hooks/use-global-state";
import { Storage } from "@utils/storage";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

export function LogoutPage() {
  const history = useHistory();
  const { setUser } = useGlobalState();

  useEffect(() => {
    Storage.clear();
    setUser({ init: true });
    history.replace("/login");
  }, []);

  return <div></div>;
}

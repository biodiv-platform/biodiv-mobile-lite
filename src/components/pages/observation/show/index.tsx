import "./show.css";

import useGlobalState from "@hooks/use-global-state";
import { axGetObservationById } from "@services/observation.service";
import React, { useEffect, useState } from "react";

import ObservationShowContainer from "./container";

export default function ShowPageComponent({ observationId }) {
  const [data, setData] = useState<any>();
  const { setIsLoading } = useGlobalState();

  const getObservationInfo = async () => {
    setIsLoading(true);
    const { success, data } = await axGetObservationById(observationId);
    if (success) {
      setData(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getObservationInfo();
  }, []);

  return data ? <ObservationShowContainer data={data} /> : null;
}

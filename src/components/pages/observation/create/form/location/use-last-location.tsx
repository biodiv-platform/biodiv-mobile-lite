import { STORAGE_KEYS } from "@static/constants";
import { EXIF_GPS_FOUND } from "@static/events";
import { Storage } from "@utils/storage";
import { useEffect, useState } from "react";
import { emit } from "react-gbus";

export default function useLastLocation() {
  const [has, setHas] = useState(false);
  const [lastLocation, setLastLocation] = useState<any>({});

  useEffect(() => {
    const ll = Storage.get(STORAGE_KEYS.LAST_LOCATION);
    if (ll) {
      setHas(true);
      setLastLocation(ll);
    }
  }, []);

  const set = (data) => setLastLocation(data);

  const use = (e) => {
    e.preventDefault();
    emit(EXIF_GPS_FOUND, lastLocation);
    setHas(false);
  };

  return {
    has,
    value: lastLocation,
    set,
    use
  };
}

export const setLastData = (lat, lng, address, customFields, customFieldValues) => {
  Storage.set(STORAGE_KEYS.LAST_LOCATION, { lat, lng, address });
  customFields.map(({ customFieldId }, index) => {
    const value = customFieldValues[index].value;
    Storage.set(`cf-${customFieldId}`, { value });
  });
};

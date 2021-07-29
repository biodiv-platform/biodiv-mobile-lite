import "./location.css";

import ErrorMessage from "@components/form/common/error-message";
import { SelectInputField } from "@components/form/select";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { IonButton, IonItem, IonLabel, IonToggle } from "@ionic/react";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import { EXIF_GPS_FOUND } from "@static/events";
import { AUTOCOMPLETE_FIELDS, GEOCODE_OPTIONS, GMAP_LIBRARIES } from "@static/location";
import { translateOptions } from "@utils/i18n";
import { getMapCenter, reverseGeocode } from "@utils/location";
import React, { useEffect, useMemo, useState } from "react";
import { useListener } from "react-gbus";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { LOCATION_ACCURACY_OPTIONS } from "../options";
import CoordinatesInput from "./coordinates";
import LocationMap from "./map";
import useLastLocation from "./use-last-location";

const LocationPicker = () => {
  const form = useFormContext();
  const { t } = useTranslation();
  const { isOnline } = useGlobalState();
  const { latitude: lat, longitude: lng, zoom: initialZoom } = useMemo(() => getMapCenter(4), []);
  const [hideLocationPicker, setHideLocationPicker] = useState(true);
  const ll = useLastLocation();
  const translatedLocationOptions = useMemo(
    () => translateOptions(t, LOCATION_ACCURACY_OPTIONS),
    []
  );

  const FK = {
    observedAt: {
      name: "observedAt",
      label: t("observation.observed_at")
    },
    reverseGeocoded: {
      name: "reverseGeocoded"
    },
    locationScale: {
      name: "locationScale",
      label: t("observation.location_scale")
    },
    latitude: {
      name: "latitude",
      label: t("observation.latitude")
    },
    longitude: {
      name: "longitude",
      label: t("observation.longitude")
    }
  };

  const watchLatLng = form.watch([FK.latitude.name, FK.longitude.name, "resources"]);

  const defaultValues = form.control.defaultValuesRef.current;

  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState({ lat, lng });
  const [searchBoxRef, setSearchBoxRef] = useState<any>();
  const [suggestion, setSuggestion] = useState<any>();
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: defaultValues[FK.latitude.name],
    lng: defaultValues[FK.longitude.name]
  });
  const [observedAtText, setObservedAtText] = useState(defaultValues[FK.observedAt.name]);

  useEffect(() => {
    if (suggestion) {
      const point = {
        lat: suggestion.geometry.location.lat(),
        lng: suggestion.geometry.location.lng()
      };
      setZoom(18);
      setCenter(point);
      setObservedAtText(suggestion.formatted_address);
      setCoordinates(point);
    }
  }, [suggestion]);

  useEffect(() => {
    if (coordinates) {
      form.setValue(FK.latitude.name, coordinates.lat, { shouldDirty: true });
      form.setValue(FK.longitude.name, coordinates.lng, { shouldDirty: true });
    }
  }, [coordinates]);

  useEffect(() => {
    form.setValue(FK.observedAt.name, observedAtText, { shouldDirty: true });
    form.setValue(FK.reverseGeocoded.name, observedAtText, { shouldDirty: true });
  }, [observedAtText]);

  useListener(
    async (pos) => {
      if (coordinates.lat === 0 && coordinates.lng === 0) {
        setCoordinates(pos);
        if (pos.address) {
          setObservedAtText(pos.address);
        } else {
          reverseGeocode(pos).then((r) => r.length && setObservedAtText(r[0].formatted_address));
        }
      }
    },
    [EXIF_GPS_FOUND]
  );

  useEffect(() => {
    form.register(FK.observedAt.name);
    form.register(FK.reverseGeocoded.name);
    form.register(FK.latitude.name);
    form.register(FK.longitude.name);
  }, [form.register]);

  useEffect(() => {
    if (watchLatLng["resources"]?.length > 0) {
      setHideLocationPicker(watchLatLng["latitude"] > 0 && watchLatLng["longitude"] > 0);
    }
  }, [watchLatLng]);

  const handleOnSearchChange = (e) => {
    setObservedAtText(e.target.value);
  };

  const handleOnSearchSelected = async () => {
    setSuggestion(searchBoxRef.getPlace());
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      form.setValue(FK.latitude.name, latitude);
      form.setValue(FK.longitude.name, longitude);
    });
  };

  return (
    <LoadScriptNext
      id="observation-create-map-script-loader"
      googleMapsApiKey={SITE_CONFIG.TOKENS.GMAP}
      region={SITE_CONFIG.MAP.COUNTRY}
      libraries={GMAP_LIBRARIES}
    >
      <>
        {!isOnline && !hideLocationPicker && (
          <IonButton color="danger" onClick={getCurrentLocation}>
            Click Here for Manual Coordinates
          </IonButton>
        )}
        <div>
          <div style={{ gridColumn: "1/4" }}>
            <div
              data-invalid={
                (form.formState.errors[FK.observedAt.name] ||
                  form.formState.errors[FK.latitude.name] ||
                  form.formState.errors[FK.longitude.name]) &&
                true
              }
            >
              <IonItem>
                <IonLabel position="stacked" color="primary">
                  {FK.observedAt.label}
                  {ll.has && (
                    <button title={ll.value?.address} onClick={ll.use}>
                      {t("observation.last_location")}
                    </button>
                  )}
                </IonLabel>
                <div className="rs-container">
                  <Autocomplete
                    onLoad={setSearchBoxRef}
                    onPlaceChanged={handleOnSearchSelected}
                    options={GEOCODE_OPTIONS}
                    fields={AUTOCOMPLETE_FIELDS}
                  >
                    <input
                      id="places-search"
                      value={observedAtText}
                      onChange={handleOnSearchChange}
                      placeholder={t("observation.location_placeholder")}
                    />
                  </Autocomplete>

                  <IonItem class="ion-no-padding">
                    <IonToggle checked={isOpen} onIonChange={() => setIsOpen((state) => !state)} />
                    <IonLabel>{t(isOpen ? "form.map.show" : "form.map.hide")}</IonLabel>
                  </IonItem>
                  <CoordinatesInput
                    show={isOpen}
                    fk={FK}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                  />
                  <LocationMap
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    isOpen={isOpen}
                    onTextUpdate={setObservedAtText}
                    zoom={zoom}
                    center={center}
                  />
                </div>
              </IonItem>
              <ErrorMessage name={FK.observedAt.name} errors={form.formState.errors} />
              {!isOpen && (
                <>
                  <ErrorMessage name={FK.latitude.name} errors={form.formState.errors} />
                  <ErrorMessage name={FK.longitude.name} errors={form.formState.errors} />
                </>
              )}
            </div>
          </div>
        </div>
        <SelectInputField
          {...FK.locationScale}
          shouldPortal={true}
          options={translatedLocationOptions}
        />
      </>
    </LoadScriptNext>
  );
};

export default LocationPicker;

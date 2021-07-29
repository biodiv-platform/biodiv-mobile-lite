import "./drop-target.css";

import { useCheckboxGroup } from "@chakra-ui/checkbox";
import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "reflexbox";

import { MY_UPLOADS_SORT } from "../../options";
import useObservationCreate from "../use-observation-resources";
import Checkbox from "./checkbox";
import DropTarget from "./drop-target";

const MyUploadsImages = ({ onDone }) => {
  const { assets, observationAssets, resourcesSortBy, setResourcesSortBy } = useObservationCreate();
  const { t } = useTranslation();

  const handleOnSort = (e) => {
    setResourcesSortBy(e.detail.value);
  };

  const { getCheckboxProps } = useCheckboxGroup({
    value: observationAssets?.map((o) => o.hashKey)
  });

  return assets ? (
    <div>
      <Box p={3} mb={2}>
        💡 {t("form.description.my_uploads")}
      </Box>
      <Box mb={3}>
        <IonItem>
          <IonLabel>Sort By</IonLabel>
          <IonSelect value={resourcesSortBy} placeholder="Select One" onIonChange={handleOnSort}>
            {MY_UPLOADS_SORT.map((o) => (
              <IonSelectOption key={o.value} value={o.value}>
                {t(`form.my_uploads_sort.${o.label}`)}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </Box>

      <Box px={3} mb={3}>
        <IonButton type="button" onClick={onDone}>
          {t("form.use_in_observation")}
        </IonButton>
      </Box>

      <Box px={3} mb={3}>
        <div className="uploaded-asset-list">
          <DropTarget />
          {assets.map((asset) => (
            <Checkbox
              key={asset.hashKey}
              asset={asset}
              {...getCheckboxProps({ value: asset.hashKey })}
            />
          ))}
        </div>
      </Box>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MyUploadsImages;

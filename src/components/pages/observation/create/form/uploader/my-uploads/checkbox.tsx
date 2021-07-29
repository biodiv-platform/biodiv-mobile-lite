import { useCheckbox } from "@chakra-ui/checkbox";
import { AspectRatio } from "@components/core/aspect-ratio";
import useGlobalState from "@hooks/use-global-state";
import { IonIcon, IonText } from "@ionic/react";
import { trashBin } from "ionicons/icons";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { getImageThumb } from "../observation-resources/resource-card";
import StatusIcon from "../statusicon";
import useObservationCreate from "../use-observation-resources";

const Checkbox = (props: any) => {
  const { user } = useGlobalState();
  const { t } = useTranslation();

  const imageURL = useMemo(() => getImageThumb(props.asset, user?.id), []);

  const { addToObservationAssets, removeObservationAsset, removeAsset } = useObservationCreate();

  const handleOnChange = (e) => {
    e.target.checked
      ? addToObservationAssets(props.asset.hashKey)
      : removeObservationAsset(props.asset.hashKey);
  };

  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  return (
    <label className="fade" aria-checked={props.isChecked}>
      <input {...getInputProps()} onChange={handleOnChange} />
      <AspectRatio ratio={1} {...getCheckboxProps()} className="check-container">
        <div className="check-img-box">
          <IonText color="danger" className="remove fade">
            <button
              type="button"
              hidden={props.isChecked}
              aria-label={t("common.delete")}
              style={{ background: "transparent", color: "var(--ion-color-danger)" }}
              onClick={() => removeAsset(props.asset)}
              children={<IonIcon icon={trashBin} />}
            />
          </IonText>
          <StatusIcon type={props.asset.status} />
          <img src={imageURL} alt={props.asset.fileName} className="check-img" />
        </div>
      </AspectRatio>
    </label>
  );
};

export default Checkbox;

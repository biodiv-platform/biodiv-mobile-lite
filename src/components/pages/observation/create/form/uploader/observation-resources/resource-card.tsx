import useGlobalState from "@hooks/use-global-state";
import { AssetStatus, IDBObservationAsset } from "@interfaces/custom";
import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { RESOURCE_SIZE } from "@static/constants";
import { ASSET_TYPES, LOCAL_ASSET_PREFIX } from "@static/observation-create";
import { getResourceThumbnail, getYoutubeImage, RESOURCE_CTX } from "@utils/media";
import { closeOutline, star, starOutline } from "ionicons/icons";
import React, { useMemo } from "react";
import Rating from "react-rating";

import StatusIcon from "../statusicon";
import useObservationCreate from "../use-observation-resources";

interface IResourceCardProps {
  resource: IDBObservationAsset;
  index: number;
}

export const getImageThumb = (resource, userID) => {
  if (resource.status === AssetStatus.Uploaded) {
    return resource.type.match(ASSET_TYPES.VIDEO) && resource.url
      ? getYoutubeImage(resource.url)
      : resource.path.match(LOCAL_ASSET_PREFIX)
      ? getResourceThumbnail(
          RESOURCE_CTX.MY_UPLOADS,
          userID + resource.path,
          RESOURCE_SIZE.RECENT_THUMBNAIL
        ) // MyUploads
      : getResourceThumbnail(resource.context, resource.path, RESOURCE_SIZE.DEFAULT);
  }
  return URL.createObjectURL(resource.blob);
};

export default function ResourceCard({ resource, index }: IResourceCardProps) {
  const { removeObservationAsset, updateObservationAsset, licensesList } = useObservationCreate();
  const { user } = useGlobalState();

  const imageURL = useMemo(() => getImageThumb(resource, user?.id), []);

  return (
    <div className="resource-card ion-margin-bottom" key={resource.hashKey}>
      <div className="resource-img-container ion-margin-bottom">
        <img className="resource-img" src={imageURL} />
        <StatusIcon type={resource.status} />
      </div>
      <IonIcon
        icon={closeOutline}
        size="large"
        className="close-button"
        onClick={() => removeObservationAsset(resource.hashKey)}
      />
      <IonList>
        <IonItem>
          <IonLabel>License</IonLabel>
          <IonSelect
            value={resource.licenseId}
            placeholder="Select One"
            name={`opt-${resource.id}`}
            onIonChange={(e) =>
              updateObservationAsset(index, resource.hashKey, "licenseId", e.detail.value)
            }
          >
            {licensesList.map((license) => (
              <IonSelectOption key={license.value} value={license.value}>
                {license.label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Caption</IonLabel>
          <IonInput
            name={`caption-${resource.id}`}
            defaultValue={resource.caption}
            onIonChange={(e) =>
              updateObservationAsset(index, resource.hashKey, "caption", e.detail?.value)
            }
          />
        </IonItem>
        <IonItem>
          <IonLabel>Rating</IonLabel>
          <div className="rating">
            <Rating
              initialRating={resource.rating}
              onChange={(v) => updateObservationAsset(index, resource.hashKey, "rating", v)}
              emptySymbol={<IonIcon icon={starOutline} />}
              fullSymbol={<IonIcon icon={star} />}
            />
          </div>
        </IonItem>
      </IonList>
    </div>
  );
}

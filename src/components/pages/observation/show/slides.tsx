import { IonSlide, IonSlides } from "@ionic/react";
import { Img } from "react-image";
import { getLocalIcon, getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";

const slideOpts = {
  speed: 400
};

export default function Slides({ resources = [] as any, speciesGroup }) {
  return (
    <IonSlides pager={true} options={slideOpts}>
      {resources.map(({ resource }) => (
        <IonSlide>
          <Img
            src={
              [
                getResourceThumbnail(RESOURCE_CTX.OBSERVATION, resource?.fileName, "?h=300"),
                getLocalIcon(speciesGroup)
              ] as any
            }
          />
        </IonSlide>
      ))}
    </IonSlides>
  );
}

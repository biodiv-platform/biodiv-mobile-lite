import { OBSERVATION_FALLBACK } from "@static/inline-images";
import { ASSET_TYPES } from "@static/observation-create";

import { ENDPOINT } from "../static/constants";

export const RESOURCE_CTX = {
  OBSERVATION: "OBSERVATION",
  MY_UPLOADS: "MY_UPLOADS",
  SPECIES: "SPECIES",
  USERGROUPS: "USERGROUPS"
};

const RESOURCE_CTX_MAP = {
  SPECIES: "img",
  OBSERVATION: "observations",
  SPECIES_FIELD: "img",
  MY_UPLOADS: "myUploads",
  USERGROUPS: "userGroups"
};
const cleanSlashes = (path) => path.split("//").join("/");

export const getResourceThumbnail = (resourceType, resourceUrl, size = "?w=300") => {
  return resourceUrl
    ? `${ENDPOINT.FILES}/get/crop/${RESOURCE_CTX_MAP[resourceType]}/${resourceUrl}${size}`
    : undefined;
};

export const getLocalIcon = (icon, type = "species") =>
  `/next-assets/${type}/${icon || "Unknown"}.svg`;

export const getSuggestionIcon = (resourceUrl) => {
  return resourceUrl ? `${ENDPOINT.FILES}/get${cleanSlashes(resourceUrl)}?w=50` : undefined;
};

export const getYouTubeId = (url) => {
  let ID = "";
  try {
    url = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      return;
    }
  } catch (e) {
    console.error(e);
  }
  return ID;
};

export const getYoutubeImage = (resourceUrl: string, size = "hqdefault") => {
  const ytid = getYouTubeId(resourceUrl);
  return ytid ? `https://i.ytimg.com/vi/${ytid}/${size}.jpg` : undefined;
};

export const getFallbackByMIME = (mime) => {
  const type = mime ? mime.toString().split("/")[0] : null;
  switch (type) {
    case ASSET_TYPES.IMAGE:
      return OBSERVATION_FALLBACK.PHOTO;

    case ASSET_TYPES.AUDIO:
      return OBSERVATION_FALLBACK.AUDIO;

    case ASSET_TYPES.VIDEO:
      return OBSERVATION_FALLBACK.VIDEO;

    default:
      return OBSERVATION_FALLBACK.DEFAULT;
  }
};

export const getUserImage = (resourceUrl, name, w = 50) => {
  return resourceUrl
    ? resourceUrl.startsWith("http")
      ? resourceUrl
      : `${ENDPOINT.FILES}get/crop/users${resourceUrl}?w=${w}`
    : `/next-assets/user/default-user.svg`;
};

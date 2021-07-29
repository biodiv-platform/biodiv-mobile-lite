import SITE_CONFIG from "@configs/site-config";

export const ENDPOINT = {
  ESMODULE: `${SITE_CONFIG.SITE.API_ENDPOINT}esmodule-api/api`,
  FILES: `${SITE_CONFIG.SITE.API_ENDPOINT}files-api/api`,
  OBSERVATION: `${SITE_CONFIG.SITE.API_ENDPOINT}observation-api/api`,
  RESOURCES: `${SITE_CONFIG.SITE.API_ENDPOINT}resources-api/api`,
  USER: `${SITE_CONFIG.SITE.API_ENDPOINT}user-api/api`,
  USERGROUP: `${SITE_CONFIG.SITE.API_ENDPOINT}userGroup-api/api`,
  UTILITY: `${SITE_CONFIG.SITE.API_ENDPOINT}utility-api/api`
};

export const STORAGE_KEYS = {
  BA_TOKEN: "BAToken",
  BR_TOKEN: "BRToken",
  LANGUAGES: "languages",
  LICENSES: "licenses",
  SPECIES_GROUPS: "speciesGroups",
  LAST_LOCATION: "last_loc"
};

export const EVENTS = {
  AUTH: {
    SUCCESS: "auth_success"
  }
};

export const VERIFICATION_TYPE = [
  {
    label: "Email",
    value: "EMAIL"
  },
  {
    label: "Mobile",
    value: "MOBILE"
  }
];

export const VERIFICATION_MODE = {
  MANUAL: "manual",
  OAUTH_GOOGLE: "oauth-google"
};

export const TAXON_BADGE_COLORS = {
  ACCEPTED: "success",
  WORKING: "warning",
  CLEAN: "primary",
  RAW: "tertiary",
  SYNONYM: "tertiary"
};

export const RESOURCE_TYPE = {
  OBSERVATION: "observation"
};

export const RESOURCE_SIZE = {
  APPLE_TOUCH: "?h=180&w=180&crop=fit&preserve=true",
  DEFAULT: "?h=200",
  LIST_THUMBNAIL: "?h=300",
  MANIFEST: "${icon}?h=${size}&w=${size}&crop=fit&preserve=true",
  PREVIEW: "?h=500",
  RECENT_THUMBNAIL: "?h=135",
  THUMBNAIL: "?h=34",
  TWITTER: "?w=600&h=330&fit=center&preserve=true"
};

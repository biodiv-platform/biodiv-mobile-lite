import { STORAGE_KEYS } from "@static/constants";
import { Storage } from "@utils/storage";
import { nanoid } from "nanoid";

export const getByPath = (obj, path) => {
  path.split(".").forEach(function (level) {
    if (!obj) {
      return;
    }
    obj = obj[level];
  });

  return obj;
};

export const compiledMessage = (templateString: string, templateVariables) => {
  return templateVariables
    ? templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g])
    : templateString;
};

export const getSpeciesGroupNameById = (id: string) => {
  return Storage.get(STORAGE_KEYS.SPECIES_GROUPS).find((o) => o.id == id)?.name;
};

export const normalizeFileName = (s) => `${nanoid()}_${s.replace(/([^a-z0-9\.\s]+)/gi, "-")}`;

export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    if (!window.FileReader) {
      reject(new Error("no fileReader object available"));
    }

    const reader: any = new window.FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      resolve(reader.result?.split(",")[1]);
    };
  });
};

export const timeOut = async (ms = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

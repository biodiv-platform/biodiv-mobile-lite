import { IDBObservationAsset } from "@interfaces/custom";
import { ENDPOINT, RESOURCE_TYPE } from "@static/constants";
import { blobToBase64 } from "@utils/basic";
import { http } from "@utils/http";

export const axListMyUploads = async (module = RESOURCE_TYPE.OBSERVATION) => {
  try {
    const { data } = await http.get({
      url: `${ENDPOINT.FILES}/upload/my-uploads`,
      params: { module }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axRemoveMyUploads = async ({ path }) => {
  try {
    await http.post({
      url: `${ENDPOINT.FILES}/upload/remove-file`,
      data: { path }
    });

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axUploadObservationResource = async (resource: IDBObservationAsset) => {
  try {
    const fileb64 = await blobToBase64(resource.blob);

    const payload = {
      hash: resource.hashKey,
      module: "observation",
      file: fileb64,
      filename: resource.fileName
    };

    const { data } = await http.post({
      url: `${ENDPOINT.FILES}/upload/my-uploads/mobile`,
      data: payload
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const axBulkUploadObservationResource = async (resource: IDBObservationAsset) => {
  const formData = new FormData();
  formData.append("folder", "myUploads");
  formData.append("module", "OBSERVATION");
  formData.append("upload", resource.blob, resource.fileName);

  const { data } = await http.post({
    url: `${ENDPOINT.FILES}/upload/bulk-upload`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" }
  });

  return data;
};

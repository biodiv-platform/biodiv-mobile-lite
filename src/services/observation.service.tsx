import { http, plainHttp } from "@utils/http";

import { ENDPOINT } from "../static/constants";

export const axGetListData = async (params, index = "extended_observation", type = "_doc") => {
  try {
    const { data } = await plainHttp.get({
      url: `${ENDPOINT.OBSERVATION}/v1/observation/list/${index}/${type}`,
      params
    });
    return { success: true, data };
  } catch (e) {
    return { success: false, data: {} };
  }
};

export const axQueryTagsByText = async (query) => {
  try {
    const { data } = await http.get({
      url: `${ENDPOINT.OBSERVATION}/v1/observation/tags/autocomplete`,
      params: { phrase: query }
    });
    return { success: true, data };
  } catch (e) {
    console.error(e.response.data.message);
    return { success: false, data: [] };
  }
};

export const axCreateObservation = async ({
  resources,
  customFieldList: customFieldData,
  ...payload
}) => {
  try {
    const { data } = await http.post({
      url: `${ENDPOINT.OBSERVATION}/v1/observation/create`,
      data: {
        ...payload,
        resources: resources.map((r) => ({
          path: r.path,
          url: r.url,
          type: r.type,
          caption: r.caption,
          rating: r.rating,
          licenseId: r.licenseId,
          languageId: r.languageId
        }))
      }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axGetLangList = async () => {
  try {
    const { data } = await plainHttp.get({
      url: `${ENDPOINT.OBSERVATION}/v1/observation/language`,
      params: { isDirty: "false" }
    });
    return { success: true, data: data.map((l) => ({ label: l.name, value: l.id })) };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axGetspeciesGroups = async () => {
  try {
    const { data } = await plainHttp.get({
      url: `${ENDPOINT.OBSERVATION}/v1/observation/species/all`
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axGetMyObservations = async (
  params,
  index = "extended_observation",
  type = "_doc"
) => {
  try {
    const { data } = await plainHttp.get({
      url: `${ENDPOINT.OBSERVATION}/v1/observation/list/${index}/${type}`,
      params
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

export const axGetObservationById = async (observationId) => {
  try {
    const { data } = await plainHttp.get({
      url: `${ENDPOINT.OBSERVATION}/v1/observation/show/${observationId}`
    });
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: {} };
  }
};

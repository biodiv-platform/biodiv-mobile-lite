import { ENDPOINT } from "@static/constants";
import { plainHttp } from "@utils/http";

export const axSearchSpeciesByText = async (text, field) => {
  try {
    const { data } = await plainHttp.get({
      url: `${ENDPOINT.ESMODULE}/v1/services/auto-complete/etd/er`,
      params: { text, field }
    });

    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, data: [] };
  }
};

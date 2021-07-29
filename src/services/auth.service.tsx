import { plainHttp } from "@utils/http";

import { ENDPOINT } from "../static/constants";

/**
 * Acquires initial tokens against provided credentials
 *
 * @param {username: string, password: string} body
 * @returns {*}
 */
export const axLogin = async (payload) => {
  try {
    const { data } = await plainHttp.post({
      url: `${ENDPOINT.USERGROUP}/v1/group/login`,
      data: payload,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    return { success: true, data };
  } catch (e) {
    return { success: false, data: e.response.data };
  }
};

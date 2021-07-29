import { Http as IHttp, HttpOptions } from "@capacitor-community/http";
import { ENDPOINT } from "@static/constants";

import { getParsedUser, isTokenExpired } from "./auth";

/**
 * Renews `access_token` if expired
 *
 * @param {string} refreshToken
 * @returns {string}
 */
const axRenewToken = async (refreshToken: string) => {
  const res = await IHttp.post({
    url: `${ENDPOINT.USER}/v1/authenticate/refresh-tokens`,
    params: { refreshToken }
  });
  return res.data.accessToken;
};

/**
 * Returns `access_token`
 *
 * @returns {string}
 */
export const getBearerToken = async () => {
  try {
    const user = await getParsedUser();
    const isExpired = isTokenExpired(user.exp);
    const finalToken = isExpired ? await axRenewToken(user.refreshToken) : user.accessToken;
    return `Bearer ${finalToken}`;
  } catch (e) {
    return false;
  }
};

const preRequest = async (options: HttpOptions, notJSON?) => {
  const token = await getBearerToken();

  if (token) {
    options.headers = {
      Authorization: token,
      ...(notJSON ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {})
    };
  } else {
    if (!options?.params?.skipRefresh) {
      throw -1;
    }
  }

  if (options?.params?.ctx) {
    delete options.params.ctx;
    delete options.params.skipRefresh;
  }

  return options;
};

/**
 * This is to mainly support isomorphic capecitor to make native http requests when in mobile to avoid CORS issue
 */
export const http = {
  get: async (options: HttpOptions) => {
    const newOptions = await preRequest(options, true);
    return IHttp.get(newOptions);
  },
  post: async (options: HttpOptions, notJSON?) => {
    const newOptions = await preRequest(options, notJSON);
    return IHttp.post(newOptions);
  },
  put: async (options: HttpOptions, notJSON?) => {
    const newOptions = await preRequest(options, notJSON);
    return IHttp.put(newOptions);
  }
};

export const plainHttp = IHttp;

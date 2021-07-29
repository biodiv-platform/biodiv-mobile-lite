import JWTDecode from "jwt-decode";
import { Storage } from "@utils/storage";
import { STORAGE_KEYS } from "@static/constants";

export const getParsedUser = async () => {
  const accessToken = Storage.get(STORAGE_KEYS.BA_TOKEN);
  const refreshToken = Storage.get(STORAGE_KEYS.BR_TOKEN);

  if (accessToken) {
    const decoded: any = JWTDecode(accessToken);
    return {
      ...decoded,
      id: parseInt(decoded.id),
      accessToken,
      refreshToken
    };
  }

  return {};
};

export const isTokenExpired = (exp) => {
  const currentTime = Date.now() / 1000;
  return exp ? exp < currentTime : true;
};

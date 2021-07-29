import { getYouTubeId } from "@utils/media";
import { plainHttp } from "@utils/http";
import { ENDPOINT } from "@static/constants";

export const axGetYouTubeInfo = async (url) => {
  try {
    const ytID = getYouTubeId(url);
    const { data } = await plainHttp.get({
      url: `${ENDPOINT.UTILITY}/v1/services/youtube/${ytID}`
    });
    return { success: true, title: data };
  } catch (e) {
    return { success: false };
  }
};

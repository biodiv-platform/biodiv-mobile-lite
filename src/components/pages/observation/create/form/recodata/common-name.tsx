import SITE_CONFIG from "@configs/site-config";
import { IonBadge } from "@ionic/react";
import { axSearchSpeciesByText } from "@services/esmodule.service";
import { TAXON_BADGE_COLORS } from "@static/constants";
import { getLocalIcon, getSuggestionIcon } from "@utils/media";
import React from "react";
import { Img } from "react-image";
import { components } from "react-select";
import { Box, Flex } from "reflexbox";

export const CommonNameOption = ({ children, ...props }) => {
  const hiddenIcon = !props.data["__isNew__"];
  return (
    <components.Option {...props}>
      <Flex isInline={true} alignItems="center">
        {hiddenIcon && (
          <Img className="img-2" src={[getSuggestionIcon(props.data.icon), props.data.group]} />
        )}
        <Box ml={2}>
          <Flex alignItems="center">
            {children}
            {props.data.lang && <IonBadge color="danger">{props.data.lang}</IonBadge>}
          </Flex>
          {props.data.sLabel && (
            <Box fontSize="sm" lineHeight="1rem">
              {props.data.sLabel}
              <Box as={IonBadge} color={TAXON_BADGE_COLORS[props.data.sStatus]} ml={1}>
                {props.data.sStatus}
              </Box>
              <Box as={IonBadge} color={TAXON_BADGE_COLORS[props.data.sPosition]} ml={1}>
                {props.data.sPosition}
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
    </components.Option>
  );
};

export const getCommonNameOption = (cv, mcv, updateScientific = true) => ({
  value: cv.name,
  label: cv.name,
  sValue: mcv.id,
  sLabel: mcv.name,
  sStatus: mcv.status,
  sPosition: mcv.position,
  icon: mcv.repr_image_url,
  groupId: mcv.group_id,
  lang: cv.language_name,
  langId: cv.language_id || SITE_CONFIG.LANG.DEFAULT_ID,
  group: getLocalIcon(mcv.group_name),
  updateScientific
});

export const onCommonNameQuery = async (q) => {
  if (q.length < 3) {
    return;
  }
  const { data }: any = await axSearchSpeciesByText(q, "common_name");

  return data.reduce(
    (macc, mcv) =>
      (mcv.common_names || []).reduce((acc, cv) => {
        const iOpts: any[] = [];
        if (cv.name?.toLowerCase().includes(q.toLowerCase())) {
          iOpts.push(getCommonNameOption(cv, mcv));
        }
        return [...acc, ...iOpts];
      }, macc),
    []
  );
};

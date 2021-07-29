import { ExtendedTaxonDefinition } from "@interfaces/esmodule";
import { IonBadge } from "@ionic/react";
import { axSearchSpeciesByText } from "@services/esmodule.service";
import { TAXON_BADGE_COLORS } from "@static/constants";
import SCI_RANK from "@static/sci-rank";
import { getLocalIcon, getSuggestionIcon } from "@utils/media";
import React from "react";
import { components } from "react-select";
import { Box, Flex } from "reflexbox";

export const ScientificNameOption = ({ children, ...props }) => {
  const hiddenIcon = !props.data["__isNew__"];
  return (
    <components.Option {...props}>
      <Flex isInline={true} alignItems="center">
        {hiddenIcon && <Box as="img" boxSize="2rem" src={getSuggestionIcon(props.data.icon)} />}
        <Box>
          {children}
          {props.data.acceptedNames && <Box color="gray">{props.data.acceptedNames}</Box>}
          <Flex isInline={true} mt={1} spacing={2}>
            <IonBadge>{props.data.rank}</IonBadge>
            <IonBadge color={TAXON_BADGE_COLORS[props.data.status]}>{props.data.status}</IonBadge>
            <IonBadge color={TAXON_BADGE_COLORS[props.data.position]}>
              {props.data.position}
            </IonBadge>
          </Flex>
        </Box>
      </Flex>
    </components.Option>
  );
};

export const onScientificNameQuery = async (q, valueKey = "id") => {
  if (q.length < 3) {
    return;
  }
  const { data }: { data: ExtendedTaxonDefinition[] } = await axSearchSpeciesByText(q, "name");
  return data.map((o) => ({
    value: o[valueKey],
    label: o.name,
    position: o.position,
    status: o.status,
    groupId: o.group_id,
    acceptedNames:
      Array.isArray(o.accepted_names) && o.accepted_names.length ? o.accepted_names[0] : "",
    rank: SCI_RANK[o.rank || 0],
    group: getLocalIcon(o.group_name),
    raw: o
  }));
};

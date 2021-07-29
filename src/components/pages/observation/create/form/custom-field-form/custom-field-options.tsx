import { getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React, { useMemo } from "react";
import { components } from "react-select";
import { Box, Flex } from "reflexbox";

export default function CustomFieldOption(props) {
  const imageURL = useMemo(
    () => getResourceThumbnail(RESOURCE_CTX.USERGROUPS, props.data.iconURL),
    [props.data.iconURL]
  );
  return (
    <components.Option {...props}>
      <Flex alignItems="center">
        <Box as="img" mr={2} height="2rem" width="2rem" src={imageURL} />
        <div>{props.data.label}</div>
      </Flex>
    </components.Option>
  );
}

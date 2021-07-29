import { SelectInputField } from "@components/form/select";
import { STORAGE_KEYS } from "@static/constants";
import { getLocalIcon } from "@utils/media";
import { Storage } from "@utils/storage";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { components } from "react-select";
import { Box, Flex } from "reflexbox";

const CustomOption = ({ children, ...props }) => (
  <components.Option {...props}>
    <Flex alignItems="center">
      <Box as="img" mr={2} height="2rem" width="2rem" src={getLocalIcon(props.data.label)} />
      <div>{children}</div>
    </Flex>
  </components.Option>
);

export default function GroupSelector() {
  const { t } = useTranslation();

  const options: any = useMemo(
    () =>
      Storage.get(STORAGE_KEYS.SPECIES_GROUPS).map((o) => ({
        label: o.name,
        value: o.id
      })),
    []
  );

  return (
    <SelectInputField
      name="sGroup"
      label={t("form.species_groups")}
      options={options}
      optionComponent={CustomOption}
      shouldPortal={true}
      isControlled={true}
    />
  );
}

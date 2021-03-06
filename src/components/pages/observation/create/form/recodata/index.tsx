import { CheckboxField } from "@components/form/checkbox";
import { SelectInputField } from "@components/form/select";
import { SelectAsyncInputField } from "@components/form/select-async";
import { STORAGE_KEYS } from "@static/constants";
import { Storage } from "@utils/storage";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CommonNameOption, getCommonNameOption, onCommonNameQuery } from "./common-name";
import { onScientificNameQuery, ScientificNameOption } from "./scientific-name";

export default function Recodata() {
  const form = useFormContext();
  const helpIdentify = form.watch("helpIdentify");
  const languages = Storage.get(STORAGE_KEYS.LANGUAGES);

  const { t } = useTranslation();
  const scientificRef: any = useRef(null);
  const langRef: any = useRef(null);
  const [commonNameOptions, setCommonNameOptions] = useState<any[]>([]);

  const onCommonNameChange = ({ sLabel, sValue, lang, langId, groupId, updateScientific }) => {
    if (langId) {
      langRef.current.select.onChange(
        { value: langId, label: lang },
        { name: langRef.current.select.props.inputId }
      );
    }
    if ((sLabel || sValue) && updateScientific) {
      scientificRef.current.select.onChange(
        { value: sValue, label: sLabel, groupId },
        { name: scientificRef.current.select.props.inputId }
      );
    }
  };

  const onScientificNameChange = ({ label, value, groupId, raw }) => {
    if (value === label) {
      form.setValue("scientificNameTaxonId", null);
    }
    form.setValue("taxonScientificName", label);
    if (groupId) {
      if (raw?.common_names) {
        setCommonNameOptions(raw.common_names.map((cn) => getCommonNameOption(cn, raw, false)));
      }
      form.setValue("sGroup", groupId);
    }
  };

  useEffect(() => {
    form.register("taxonScientificName");
  }, [form.register]);

  return (
    <>
      <CheckboxField name="helpIdentify" label={t("observation.help_identify")} />
      <div hidden={helpIdentify}>
        <SelectAsyncInputField
          name="taxonCommonName"
          label={t("observation.common_name")}
          disabled={helpIdentify}
          onQuery={onCommonNameQuery}
          options={commonNameOptions}
          optionComponent={CommonNameOption}
          placeholder={t("observation.min_three_chars")}
          onChange={onCommonNameChange}
        />
        <SelectInputField
          name="obsvLanguageId"
          label={t("form.language")}
          options={languages}
          disabled={helpIdentify}
          shouldPortal={true}
          selectRef={langRef}
        />
        <SelectAsyncInputField
          name="scientificNameTaxonId"
          label={t("observation.scientific_name")}
          disabled={helpIdentify}
          onQuery={onScientificNameQuery}
          optionComponent={ScientificNameOption}
          placeholder={t("observation.min_three_chars")}
          onChange={onScientificNameChange}
          selectRef={scientificRef}
        />
      </div>
    </>
  );
}

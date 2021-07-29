import { DatePickerField } from "@components/form/datepicker";
import { RichTextareaField } from "@components/form/rich-textarea";
import { SelectInputField } from "@components/form/select";
import { SelectAsyncInputField } from "@components/form/select-async";
import { axQueryTagsByText } from "@services/observation.service";
import { translateOptions } from "@utils/i18n";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { DATE_ACCURACY_OPTIONS } from "../options";

const onTagsQuery = async (q) => {
  const { data } = await axQueryTagsByText(q);
  return data.map((tag) => ({ label: tag.name, value: tag.id, version: tag.version }));
};

export default function DateInputs({ showTags = true }) {
  const { t } = useTranslation();
  const translatedDateOptions = useMemo(() => translateOptions(t, DATE_ACCURACY_OPTIONS), []);

  return (
    <>
      <DatePickerField
        name="observedOn"
        label={t("common.observed_on")}
        isRequired={true}
        subscribe={true}
      />
      <SelectInputField
        name="dateAccuracy"
        label={t("form.date_accuracy")}
        options={translatedDateOptions}
      />
      {showTags && (
        <SelectAsyncInputField
          name="tags"
          label={t("form.tags")}
          hint={t("form.tags_hint")}
          multiple={true}
          onQuery={onTagsQuery}
          mb={2}
        />
      )}
      <RichTextareaField name="notes" label={t("observation.notes")} />
    </>
  );
}

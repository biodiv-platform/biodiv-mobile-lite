import { CheckboxField } from "@components/form/checkbox";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import CustomFieldLastValue from "./custom-field-last-value";
import CustomInputField from "./custom-input-field";

export default function ObservationCustomFieldForm({ fields }) {
  const { setValue } = useFormContext();
  const { t } = useTranslation();

  return (
    <div>
      <div>📜 {t("observation.custom_fields")}</div>

      {fields.map(({ label, isRequired, fieldType, dataType, options, customFieldId }, index) => {
        const fieldName = `customFields.${index}.value`;

        return (
          <div key={index}>
            <CustomInputField
              label={label}
              isRequired={isRequired}
              fieldType={fieldType}
              dataType={dataType}
              options={options}
              name={fieldName}
            />
            <CustomFieldLastValue id={customFieldId} name={fieldName} set={setValue} />
            <div hidden={true}>
              <CheckboxField name={`customFields.${index}.isRequired`} label={label} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

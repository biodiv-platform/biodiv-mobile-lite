import React from "react";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

import { FieldWrapper } from "./common";
import { ClearIndicator, selectStyles } from "./configs";

interface SelectMultipleProps {
  name: string;
  label: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  options?: any[];
  optionComponent?: any;
  selectRef?;
  isRequired?: boolean;
}

const DefaultOptionComponent = (p) => <components.Option {...p} />;

export const SelectMultipleInputField = ({
  name,
  label,
  hint,
  optionComponent = DefaultOptionComponent,
  options = [],
  disabled,
  selectRef,
  isRequired
}: SelectMultipleProps) => {
  const { field, fieldState } = useController({ name });
  const initialValue = options.filter((v) => (field.value || []).includes(v.value));

  return (
    <FieldWrapper label={label} hint={hint} fieldState={fieldState} isRequired={isRequired}>
      <div className="rs-container">
        <Select
          id={name}
          inputId={name}
          onChange={(o) => field.onChange(o ? o.map(({ value }) => value) : [])}
          onBlur={field.onBlur}
          options={options}
          components={{
            Option: optionComponent,
            ClearIndicator
          }}
          formatCreateLabel={(v) => `Add "${v}"`}
          defaultValue={initialValue}
          isSearchable={true}
          isMulti={true}
          isDisabled={disabled}
          styles={selectStyles}
          ref={selectRef}
        />
      </div>
    </FieldWrapper>
  );
};

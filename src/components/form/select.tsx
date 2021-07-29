import React from "react";
import { useController } from "react-hook-form";
import Select, { components } from "react-select";

import { FieldWrapper } from "./common";
import { ClearIndicator, selectStyles } from "./configs";

interface SelectInputFieldProps {
  name: string;
  label: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  options?: any[];
  optionComponent?: any;
  selectRef?;
  isRequired?: boolean;
  isControlled?: boolean;
  onChangeCallback?;
  shouldPortal?;
  hidden?;
}
const DefaultOptionComponent = (p) => <components.Option {...p} />;

export const SelectInputField = ({
  name,
  label,
  hint,
  options = [],
  disabled,
  selectRef,
  optionComponent = DefaultOptionComponent,
  isRequired,
  isControlled,
  shouldPortal,
  onChangeCallback,
  hidden
}: SelectInputFieldProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FieldWrapper
      label={label}
      hidden={hidden}
      hint={hint}
      fieldState={fieldState}
      isRequired={isRequired}
    >
      <div className="rs-container">
        <Select
          id={name}
          inputId={name}
          onChange={(o) => {
            field.onChange(o.value);
            onChangeCallback && onChangeCallback(o.value);
          }}
          onBlur={field.onBlur}
          options={options}
          components={{
            Option: optionComponent,
            ClearIndicator
          }}
          menuPortalTarget={shouldPortal && document.body}
          isSearchable={true}
          isDisabled={disabled}
          styles={selectStyles}
          {...{
            [isControlled ? "value" : "defaultValue"]: options.find((o) => o.value === field.value)
          }}
          ref={selectRef}
        />
      </div>
    </FieldWrapper>
  );
};

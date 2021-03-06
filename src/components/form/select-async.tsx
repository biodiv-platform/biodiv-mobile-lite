import debounce from "debounce-promise";
import React, { useEffect, useMemo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import AsyncSelectCreatable from "react-select/async-creatable";

import { FieldWrapper } from "./common";
import { ClearIndicator, selectStyles } from "./configs";

interface ISelectProps {
  name: string;
  label?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  options?: any[];
  multiple?: boolean;
  style?: any;
  onQuery?: any;
  debounceTime?: number;
  optionComponent?: any;
  placeholder?: string;
  isCreatable?: boolean;
  onChange?;
  eventCallback?;
  selectRef?;
  isRequired?: boolean;
  isClearable?;
  resetOnSubmit?;
}

const dummyOnQuery = (q) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ label: `async-${q}`, value: "vx" }]);
    }, 1000);
  });

const DefaultOptionComponent = (p) => <components.Option {...p} />;

export const SelectAsyncInputField = ({
  name,
  label,
  hint,
  options = [],
  multiple = false,
  disabled = false,
  optionComponent = DefaultOptionComponent,
  debounceTime = 200,
  placeholder,
  onChange,
  eventCallback,
  isCreatable,
  selectRef,
  isRequired,
  onQuery = dummyOnQuery,
  resetOnSubmit = true,
  isClearable = true
}: ISelectProps) => {
  const form = useFormContext();
  const { field, fieldState } = useController({ name });
  const Select = useMemo(() => (isCreatable ? AsyncSelectCreatable : AsyncSelect), [isCreatable]);

  const onQueryDebounce = debounce(onQuery, debounceTime);
  const [selected, setSelected] = useState(
    field.value ? (multiple ? field.value : { value: field.value }) : null
  );

  useEffect(() => {
    field.onChange(multiple ? selected : selected?.value);
    if (onChange && selected) {
      onChange(selected);
    }
  }, [selected]);

  const handleOnChange = (value, event) => {
    eventCallback ? eventCallback(value, event, setSelected) : setSelected(value);
  };

  useEffect(() => {
    if (resetOnSubmit && form.formState.submitCount) {
      setSelected(multiple ? [] : null);
    }
  }, [form.formState.submitCount]);

  return (
    <FieldWrapper label={label} hint={hint} fieldState={fieldState} isRequired={isRequired}>
      <div className="rs-container">
        <Select
          name={name}
          inputId={name}
          menuPortalTarget={document.body}
          formatCreateLabel={(v) => `Add "${v}"`}
          isMulti={multiple}
          defaultOptions={options}
          loadOptions={onQueryDebounce}
          components={{
            Option: optionComponent,
            ClearIndicator,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
          }}
          value={selected}
          isSearchable={true}
          isDisabled={disabled}
          isClearable={isClearable}
          onChange={handleOnChange}
          placeholder={placeholder || label}
          noOptionsMessage={() => null}
          styles={selectStyles}
          ref={selectRef}
        />
      </div>
    </FieldWrapper>
  );
};

import QuillInput from "@components/core/quill-input";
import React from "react";
import { useController } from "react-hook-form";

import { FieldWrapper } from "./common";

interface IRichTextareaProps {
  name: string;
  label?: string;
  hint?: string;
}

export const RichTextareaField = ({ name, label, hint }: IRichTextareaProps) => {
  const { field, fieldState } = useController({ name });

  return (
    <FieldWrapper label={label} hint={hint} fieldState={fieldState}>
      <div className="rs-container">
        <QuillInput value={field.value} onChange={field.onChange} />
      </div>
    </FieldWrapper>
  );
};

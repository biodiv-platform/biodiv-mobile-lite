import { getByPath } from "@utils/basic";
import React from "react";

export default function ErrorMessage({ errors, name }) {
  const errorText = getByPath(errors, `${name}.message`);
  return <div>{errorText}</div>;
}

export const ErrorMessageMulti = ({ errors, name }) => (
  <div>
    {Array.isArray(errors[name])
      ? errors[name].map((e) => e && e?.status?.message)
      : errors[name]?.message}
  </div>
);

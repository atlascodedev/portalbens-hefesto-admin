import { TextField } from "@material-ui/core";
import { connect, useFormikContext } from "formik";
import React from "react";
import { FormFieldComponentProps } from "../Root";

interface Props {}

const StringFormField = ({
  formFieldType,
  label,
  name,
  value = "",
  onChange,
  error,
  helperText,
  id,
  onBlur,
  ...props
}: FormFieldComponentProps) => {
  return (
    <TextField
      onBlur={onBlur}
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      error={error ? true : false}
      helperText={helperText}
    />
  );
};

export default StringFormField;

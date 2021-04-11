import { TextField } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import { FormFieldComponentProps } from "../Root";

interface Props {}

const PhoneFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  setFieldValue,
  value,
  error,
}: FormFieldComponentProps) => {
  const handlePhoneValueChange = (value: any) => {
    setFieldValue(name, value, true);
  };

  return (
    <div>
      <NumberFormat
        format={"(##) #-####-####"}
        variant="outlined"
        value={value}
        name={name}
        customInput={TextField}
        label={label}
        id={id}
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        onValueChange={({ floatValue, formattedValue, value }) =>
          handlePhoneValueChange(formattedValue)
        }
      />
    </div>
  );
};

export default PhoneFormField;

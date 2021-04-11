import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";
import { FormFieldComponentProps } from "../Root";

const SwitchFormField = ({
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
  selectValues,
}: FormFieldComponentProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => {
              checked
                ? setFieldValue(name, true, false)
                : setFieldValue(name, false, false);
            }}
            name={name}
          />
        }
        labelPlacement="bottom"
        label={label}
        style={{ color: "rgba(0, 0, 0, 0.54)" }}
      />
    </FormGroup>
  );
};

export default SwitchFormField;

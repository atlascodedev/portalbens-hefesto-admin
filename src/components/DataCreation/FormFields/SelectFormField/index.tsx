import React from "react";
import { FormFieldComponentProps } from "../Root";
import styled from "styled-components";
import { MenuItem, TextField } from "@material-ui/core";

const SelectFormRootContainer = styled.div`
  width: 250px;
`;

const SelectFormField = ({
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
  selectValues = [],
}: FormFieldComponentProps) => {
  return (
    <SelectFormRootContainer>
      <TextField
        fullWidth
        variant="outlined"
        select
        id={id}
        label={label}
        name={name}
        value={value || ""}
      error={error}
        helperText={helperText}
        onBlur={onBlur}
        onChange={onChange}
      >
        {selectValues.map((value, index) => {
          return (
            (
              <MenuItem style={{ width: "100%" }} value={value} key={index}>
                {value.toString()}
              </MenuItem>
            ) || (
              <div style={{ padding: "10px" }}> Nenhuma opção encontrada</div>
            )
          );
        })}
      </TextField>
    </SelectFormRootContainer>
  );
};

export default SelectFormField;

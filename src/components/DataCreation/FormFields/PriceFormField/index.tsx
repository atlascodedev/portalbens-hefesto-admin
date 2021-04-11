import { TextField } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import { FormFieldComponentProps } from "../Root";

const PriceFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  value,
  error,
  setFieldValue,
}: FormFieldComponentProps) => {
  const handlePriceChange = (value: any) => {
    setFieldValue(name, value, true);
  };

  return (
    <div>
      <NumberFormat
        variant="outlined"
        thousandSeparator={","}
        value={value}
        decimalScale={2}
        allowNegative={false}
        prefix={"R$"}
        fixedDecimalScale={true}
        customInput={TextField}
        label={label}
        name={name}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        id={id}
        onValueChange={({ floatValue, formattedValue, value }) =>
          handlePriceChange(floatValue)
        }
      />
    </div>
  );
};

export default PriceFormField;

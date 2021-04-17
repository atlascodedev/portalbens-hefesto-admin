import { SvgIcon, TextField } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import React from "react";
import NumberFormat from "react-number-format";
import { FormFieldComponentProps } from "../Root";
import ListBaseFormFieldLayout, {
  ListFormItemLayout,
} from "../StringArrayFormField/styles";
import { InstallmentFormFieldWrapper } from "./styles";

const InstallmentsListFormField = ({
  formFieldType,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  validateField,
  value,
}: FormFieldComponentProps) => {
  const handleInsertField = () => {
    setFieldValue(name, [...value, ""], false);
  };

  const handleRemoveAtIndex = (indexArg: number) => {
    let currentFieldArray: any[] = [...value];

    currentFieldArray.splice(indexArg, 1);

    console.log(currentFieldArray);

    setFieldValue(name, [...currentFieldArray], true);
  };

  return (
    <ListBaseFormFieldLayout insertField={handleInsertField} label={"Label"}>
      {(value as any[]).length > 0 ? (
        (value as any[]).map((value, index: number) => {
          return (
            <ListFormItemLayout
              key={index}
              alignCenter
              removeField={() => handleRemoveAtIndex(index)}
            >
              <InstallmentFormFieldWrapper>
                <NumberFormat
                  className="installmentNumber"
                  variant="outlined"
                  label="Número de parcelas"
                  isNumericString
                  value={value[index]?.["installmentMonths"]}
                  customInput={TextField}
                  name={`${name}.${index}.installmentMonths`}
                  onValueChange={({ floatValue, formattedValue, value }) => {
                    setFieldValue(`${name}.${index}.installmentMonths`, value);
                  }}
                />
                <SvgIcon component={Clear} />

                <NumberFormat
                  value={value[index]?.["installmentValue"]}
                  name={`${name}.${index}.installmentValue`}
                  onValueChange={({ floatValue, formattedValue, value }) => {
                    setFieldValue(
                      `${name}.${index}.installmentValue`,
                      floatValue
                    );
                  }}
                  className="installmentValue"
                  variant="outlined"
                  label="Valor das parcelas"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  allowNegative={false}
                  fixedDecimalScale={true}
                  prefix={"R$"}
                  decimalScale={2}
                  customInput={TextField}
                />
              </InstallmentFormFieldWrapper>
            </ListFormItemLayout>
          );
        })
      ) : (
        <div style={{ textAlign: "start" }}>
          Parece que ainda não há nenhum item na lista.
        </div>
      )}
    </ListBaseFormFieldLayout>
  );
};

export default InstallmentsListFormField;

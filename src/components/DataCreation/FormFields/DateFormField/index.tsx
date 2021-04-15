import React from "react";
import { FormFieldComponentProps } from "../Root";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { format, isDate, isExists } from "date-fns";
import { isValid } from "date-fns/esm";

const DateFormField = React.memo(
  ({
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
    error,
  }: FormFieldComponentProps) => {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            helperText={helperText}
            inputVariant="outlined"
            error={Boolean(helperText)}
            label={label}
            name={name}
            onBlur={onBlur}
            required
            minDateMessage={`A data deve ser maior que ${format(
              new Date(),
              "dd/MM/yyyy",
              {
                locale: ptBR,
              }
            )}`}
            onChange={(date: MaterialUiPickersDate) => {
              if (!isValid(date)) {
                setFieldError(name, "É preciso inserir uma data válida");
                setFieldTouched(name, true, true);
              }

              setFieldValue(name, date, true);
            }}
            value={value}
            placeholder={"10/10/2018"}
            minDate={new Date()}
            format={"dd/MM/yyyy"}
          />
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
);

export default DateFormField;

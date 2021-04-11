import React from "react";
import {
  CheckboxField,
  RadioField,
} from "../../../../config/collections.config";
import { FormFieldDictionary } from "../../../../dictionaries";
import { FormFieldTypes } from "../../../../dictionaries/types";

interface RootFormFieldProps {
  formFieldType: FormFieldTypes;
  label: string;
  name: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  validateField: (field: string) => void;
  onChange: (...args: any[]) => void;
  onBlur: (...args: any[]) => void;
  value: any;
  error?: boolean;
  helperText: any;
  id: string;
  selectValues?: string[];
  radioOptions?: RadioField[];
  checkboxOptions?: CheckboxField[];
}

export interface FormFieldComponentProps extends RootFormFieldProps {}

const RootFormField = ({
  formFieldType,
  label,
  name,
  onChange,
  onBlur,
  setFieldValue,
  setFieldError,
  validateField,
  setFieldTouched,
  value,
  error,
  helperText,
  id,
  selectValues = [],
  radioOptions = [],
  checkboxOptions = [],
}: RootFormFieldProps) => {
  const FormFieldDynamic = FormFieldDictionary[formFieldType];

  return (
    <FormFieldDynamic
      validateField={validateField}
      setFieldError={setFieldError}
      setFieldTouched={setFieldTouched}
      setFieldValue={setFieldValue}
      onBlur={onBlur}
      id={id}
      checkboxOptions={checkboxOptions}
      radioOptions={radioOptions}
      error={error}
      value={value}
      onChange={onChange}
      label={label}
      formFieldType={formFieldType}
      name={name}
      selectValues={selectValues}
      helperText={helperText}
    />
  );
};

export default RootFormField;

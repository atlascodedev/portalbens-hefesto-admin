import { Button, TextField, Tooltip } from "@material-ui/core";
import { FieldArray, Form } from "formik";
import React from "react";
import { FormFieldComponentProps } from "../Root";
import { TextFieldWrapper } from "../TextFormField";
import ListFormFieldLayout from "./styles";

const StringArrayFormField = ({
  name,
  formFieldType,
  helperText,
  id,
  label,
  onBlur,
  onChange,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  validateField,
  value,
  error,
}: FormFieldComponentProps) => {
  const handleAddNewField = () => {
    setFieldValue(name, [...value, ""], false);
  };

  const handleRemoveLast = () => {
    let currentValueArray: any[] = [...value];

    currentValueArray.pop();

    setFieldValue(name, [...currentValueArray], false);
  };

  return (
    <div>
      <ListFormFieldLayout />   
    </div>
    // <TextFieldWrapper>
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       border: "1px solid rgba(93, 109, 124, 0.6)",
    //       padding: "35px",
    //       borderRadius: "6px",
    //       transition: "all 0.5s ease",
    //     }}
    //   >
    //     {value.length > 0 ? (
    //       value.map((item: any, index: number) => {
    //         return (
    //           <TextField
    //             style={{ marginBottom: "10px" }}
    //             variant="outlined"
    //             onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //               setFieldValue(`${name}.${index}`, event.target.value)
    //             }
    //             key={index}
    //             name={`${name}.${index}`}
    //             label={label}
    //           />
    //         );
    //       })
    //     ) : (
    //       <div style={{ textAlign: "center" }}>
    //         {" "}
    //         Ainda não há nenhum item na lista, clique em adicionar para começar.
    //       </div>
    //     )}

    //     <div
    //       style={{ marginTop: "15px", display: "flex", flexDirection: "row" }}
    //     >
    //       <div style={{ marginRight: "10px" }}>
    //         <Button
    //           onClick={handleAddNewField}
    //           color="primary"
    //           variant="contained"
    //         >
    //           Adicionar
    //         </Button>
    //       </div>

    //       <div style={{ marginLeft: "10px" }}>
    //         <Tooltip
    //           title={
    //             value.length <= 0 ? "Não há mais nenhum item para remover" : ""
    //           }
    //         >
    //           <span>
    //             <Button
    //               disabled={Boolean(value.length <= 0)}
    //               onClick={handleRemoveLast}
    //               color="primary"
    //               variant="outlined"
    //             >
    //               Remover último
    //             </Button>
    //           </span>
    //         </Tooltip>
    //       </div>
    //     </div>
    //   </div>
    // </TextFieldWrapper>
  );
};

export default StringArrayFormField;

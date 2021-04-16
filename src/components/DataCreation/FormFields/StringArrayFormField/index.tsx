import { Button, ListItemAvatar, TextField, Tooltip } from "@material-ui/core";
import { FieldArray, Form } from "formik";
import { indexOf } from "lodash";
import React from "react";
import { FormFieldComponentProps } from "../Root";
import { TextFieldWrapper } from "../TextFormField";
import ListFormFieldLayout, { ListFormItemLayout } from "./styles";

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

  const handleRemoveAtIndex = (indexArg: number) => {
    let currentFieldArray: any[] = [...value];

    currentFieldArray.splice(indexArg, 1);

    console.log(currentFieldArray);

    setFieldValue(name, [...currentFieldArray], true);
  };

  return (
    <div>
      <ListFormFieldLayout insertField={handleAddNewField}>
        {(value as any[]).length > 0 ? (
          (value as any[]).map((value, index: number) => {
            return (
              <ListFormItemLayout
                key={index}
                removeField={() => handleRemoveAtIndex(index)}
              >
                <TextField
                  helperText={helperText}
                  error={error}
                  value={`${value}`}
                  name={`${name}.${index}`}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue(`${name}.${index}`, event.target.value)
                  }
                  style={{
                    minWidth: "75%",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                  label="Campo aqui"
                />
              </ListFormItemLayout>
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>
            Parece que ainda não há nenhum item na lista.
          </div>
        )}
      </ListFormFieldLayout>
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

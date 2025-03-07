// src/components/DynamicField.js
import React from "react";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";
import CustomSelect from "./CustomSelect";
import CustomRadio from "./CustomRadio";
import CustomCheckbox from "./CustomCheckbox";
import CustomCheckboxGroup from "./CustomCheckboxGroup";
import CustomFileUpload from "./CustomFileUpload";
import {
  required as requiredValidator,
  email,
  phone,
  noNumbers,
  requiredCheckbox,
  requiredFile,
  requiredCheckboxGroup,
  requiredRadio,
  dateNotInFuture,
} from "../validators";

const DynamicField = ({ fieldData }) => {
  const { id, label, type, placeholder, required, options, accept } = fieldData;

  const getValidator = () => {
    return (value) => {
      if (required && !value) {
        return "This field is required";
      }
      if (!value) return undefined;

      if (id === "firstName") {
        return noNumbers(value);
      }
      if (type === "email") {
        return email(value);
      }
      if (type === "tel") {
        return phone(value);
      }
      if (id === "dob") {
        return dateNotInFuture(value);
      }
      return undefined;
    };
  };

  switch (type) {
    case "text":
    case "email":
    case "tel":
    case "date":
      return (
        <CustomInput
          field={id}
          label={label}
          type={type}
          placeholder={placeholder}
          required={required}
          validate={getValidator()}
        />
      );
    case "textarea":
      return (
        <CustomTextArea
          field={id}
          label={label}
          placeholder={placeholder}
          required={required}
          validate={required ? requiredValidator : undefined}
        />
      );
    case "select":
      return (
        <CustomSelect
          field={id}
          label={label}
          options={options}
          required={required}
        />
      );
    case "radio":
      return (
        <CustomRadio
          field={id}
          label={label}
          options={options}
          required={required}
          validate={required ? requiredRadio : undefined}
        />
      );
    case "checkbox":
      return (
        <CustomCheckbox
          field={id}
          label={label}
          required={required}
          validate={required ? requiredCheckbox : undefined}
        />
      );
    case "checkbox-group":
      return (
        <CustomCheckboxGroup
          field={id}
          label={label}
          options={options}
          required={required}
          validate={required ? requiredCheckboxGroup : undefined}
        />
      );
    case "file":
      return (
        <CustomFileUpload
          field={id}
          label={label}
          accept={accept}
          required={required}
          validate={required ? requiredFile : undefined}
        />
      );
    default:
      return null;
  }
};

export default DynamicField;

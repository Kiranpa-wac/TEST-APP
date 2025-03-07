import React from 'react';
import { useField } from 'informed';
import { required } from '../validators';

const CustomTextArea = ({ field, label, placeholder, required: isRequired, ...rest }) => {
  const { fieldApi, fieldState } = useField({ field, validate: isRequired ? required : undefined });
  
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">{label}</label>
      <textarea
        id={field}
        placeholder={placeholder}
        value={fieldState.value || ''}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        onBlur={() => fieldApi.setTouched(true)}
        {...rest}
        className="form-control"
      />
      {fieldState.error && <div className="text-danger">{fieldState.error}</div>}
    </div>
  );
};

export default CustomTextArea;

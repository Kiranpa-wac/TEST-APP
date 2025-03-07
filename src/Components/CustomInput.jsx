import React from 'react';
import { useField } from 'informed';
import { required, email, phone, noNumbers } from '../validators';

const CustomInput = ({ field, label, type = 'text', placeholder, required, validate, ...rest }) => {
  const { fieldApi, fieldState } = useField({ field, validate });
  
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">{label}</label>
      <input 
        id={field}
        type={type}
        placeholder={placeholder}
        required={required}
        value={fieldState.value || ''}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        onBlur={() => fieldApi.setTouched(true)}
        {...(type === 'date' && { max: new Date().toISOString().split('T')[0] })}
        {...rest}
        className="form-control"
      />
      {fieldState.error && <div className="text-danger">{fieldState.error}</div>}
    </div>
  );
};

export default CustomInput;

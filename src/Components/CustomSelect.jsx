import React from 'react';
import { useField } from 'informed';
import { required } from '../validators';

const CustomSelect = ({ field, label, options, required: isRequired, ...rest }) => {
  const { fieldApi, fieldState } = useField({ field, validate: isRequired ? required : undefined });
  
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">{label}</label>
      <select
        id={field}
        value={fieldState.value || ''}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        onBlur={() => fieldApi.setTouched(true)}
        required={isRequired}
        {...rest}
        className="form-select"
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {fieldState.error && <div className="text-danger">{fieldState.error}</div>}
    </div>
  );
};

export default CustomSelect;

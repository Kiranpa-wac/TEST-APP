import React from 'react';
import { useField } from 'informed';

const CustomCheckbox = ({ field, label, required, validate, ...rest }) => {
  const { fieldApi, fieldState } = useField({ field, validate });
  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        id={field}
        required={required}
        checked={fieldState.value || false}
        onChange={(e) => fieldApi.setValue(e.target.checked)}
        {...rest}
        className="form-check-input"
      />
      <label className="form-check-label" htmlFor={field}>
        {label}
      </label>
      {fieldState.error && <div className="text-danger">{fieldState.error}</div>}
    </div>
  );
};

export default CustomCheckbox;

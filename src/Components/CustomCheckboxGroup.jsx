import React from "react";
import { useField } from "informed";

const CustomCheckboxGroup = ({ field, label, options, required, validate }) => {
  const { fieldApi, fieldState } = useField({ field, validate });
  const currentValues = fieldApi.getValue() || [];

  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);

    fieldApi.setValue(newValues);
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div>
        {options.map(opt => (
          <div className="form-check form-check-inline" key={opt.value}>
            <input
              type="checkbox"
              id={`${field}-${opt.value}`}
              value={opt.value}
              required={required && currentValues.length === 0}
              onChange={handleChange}
              checked={currentValues.includes(opt.value)}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor={`${field}-${opt.value}`}>
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {fieldState.error && <div className="text-danger">{fieldState.error}</div>}
    </div>
  );
};

export default CustomCheckboxGroup;
import React from 'react';
import { useField } from 'informed';

const CustomRadio = ({ field, label, options, required, validate }) => {
  const { fieldApi, fieldState } = useField({ field, validate });
  const currentValue = fieldApi.getValue();
  
  return (
    <div style={{ marginBottom: '15px' }}>
      <label>{label}</label>
      <div>
        {options.map(opt => (
          <label key={opt.value} style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name={field}
              value={opt.value}
              checked={currentValue === opt.value}
              required={required}
              onChange={() => fieldApi.setValue(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {fieldState.error && <span style={{ color: 'red' }}>{fieldState.error}</span>}
    </div>
  );
};

export default CustomRadio;
    
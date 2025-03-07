
export const required = value =>
    value ? undefined : 'This field is required';
  
 
  export const email = value => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : 'Invalid email address';
  };
  
  
  export const phone = value => {
    if (!value) return undefined;
    
    const phoneRegex = /^[0-9\-\+\s\(\)]{10,15}$/;
    return phoneRegex.test(value) ? undefined : 'Invalid phone number';
  };
  
  export const noNumbers = value => {
    if (!value) return undefined;

    const noNumberRegex = /^[^0-9]*$/;
    return noNumberRegex.test(value) ? undefined : 'Numbers are not allowed';
  };

// For radio fields
export const requiredRadio = value =>
  value ? undefined : 'Please select an option';

// For file uploads
export const requiredFile = value =>
  value ? undefined : 'File is required';

// For checkbox groups (checks if at least one is selected)
export const requiredCheckboxGroup = value =>
  Array.isArray(value) && value.length > 0 ? undefined : 'Please select at least one option';

// For single checkboxes (e.g., terms & conditions)
export const requiredCheckbox = value =>
  value ? undefined : 'You must accept the terms and conditions';

export const dateNotInFuture = (value) => {
  if (!value) return undefined;
  const inputDate = new Date(value);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return inputDate > today ? 'Date of birth cannot be in the future' : undefined;
};

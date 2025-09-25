import React, { useId, forwardRef } from 'react';

const Select = forwardRef(
  ({ options, label, className = "", placeholder = "Select an option", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="mb-1 block font-medium">{label}</label>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
});

export default Select;

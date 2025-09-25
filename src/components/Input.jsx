import React, { useId, forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, type = "text", className = "", error = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          px-3 py-2 rounded-lg w-full 
          bg-white text-black 
          border border-gray-300 
          outline-none 
          focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300
          placeholder-gray-400 
          transition duration-300 ease-in-out
          ${className}
        `}
        ref={ref}
        id={id}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;

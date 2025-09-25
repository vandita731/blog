import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-5 py-2.5 
        rounded-lg 
        ${bgColor} ${textColor} 
        font-semibold 
        transition 
        duration-300 
        ease-in-out 
        hover:brightness-110 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-1 
        focus:ring-indigo-400 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

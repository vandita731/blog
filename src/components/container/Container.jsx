import React from 'react';

function Container({ children }) {
  // Full width container with responsive padding
  return <div className="w-full px-6 lg:px-12">{children}</div>;
}

export default Container;
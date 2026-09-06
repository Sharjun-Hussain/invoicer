import React from 'react';

const BaseTemplate2 = ({ children, width = "794px", height = "1123px", className = "", isPrint = false }) => {
  const printStyle = isPrint
    ? { width, height }
    : { width: "380px", height: "auto", minHeight: "570px" };
  
  // Load company logo from settings
  const companySettings = localStorage.getItem('companySettings');
  const logo = companySettings ? JSON.parse(companySettings).logo : null;
  
  return (
    <div
      className={`bg-white rounded-lg shadow-lg mx-auto relative ${className}`}
      style={printStyle}
    >
      {logo && !isPrint && (
        <div className="absolute top-2 left-2 z-10">
          <img
            src={logo}
            alt="Company Logo"
            className="h-12 w-auto object-contain"
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default BaseTemplate2;

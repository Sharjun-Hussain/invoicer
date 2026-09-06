import React from 'react';

const BaseTemplate = ({ data, children }) => {
  // Load company logo from settings
  const companySettings = localStorage.getItem('companySettings');
  const logo = companySettings ? JSON.parse(companySettings).logo : null;

  return (
    <div
      className="bg-white rounded-lg shadow-lg mx-auto relative"
      style={{ width: "794px", height: "1123px" }}
    >
      {logo && (
        <div className="absolute top-4 left-4 z-10">
          <img
            src={logo}
            alt="Company Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default BaseTemplate;

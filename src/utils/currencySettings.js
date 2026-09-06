export const getCurrencySettings = () => {
  const savedSettings = localStorage.getItem('invoiceSettings');
  
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    return {
      currencySymbol: settings.currencySymbol || 'Rs.',
      currencyCode: settings.currencyCode || 'LKR',
      locale: settings.locale || 'en-LK',
      invoicePrefix: settings.invoicePrefix || 'INV',
      taxLabel: settings.taxLabel || 'Tax',
      defaultTaxRate: settings.defaultTaxRate || 0
    };
  }
  
  // Default to Sri Lankan Rupees
  return {
    currencySymbol: 'Rs.',
    currencyCode: 'LKR',
    locale: 'en-LK',
    invoicePrefix: 'INV',
    taxLabel: 'Tax',
    defaultTaxRate: 0
  };
};

export const formatCurrencyWithSettings = (amount) => {
  const settings = getCurrencySettings();
  return `${settings.currencySymbol} ${parseFloat(amount).toFixed(2)}`;
};

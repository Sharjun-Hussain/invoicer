export const formatCurrency = (amount, minimumFractionDigits = 2) => {
  return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits }).format(amount);
};

import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template11 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto min-h-[800px] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-violet-400 to-purple-500 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"></div>

        {/* Header */}
        <div className="relative flex justify-between items-start mb-10">
          <div>
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full mb-2">
              INVOICE #{invoice.number}
            </div>
            <h1 className="text-3xl font-black text-gray-800">{yourCompany.name || 'Your Company'}</h1>
            <p className="text-gray-500 mt-1">{yourCompany.address}</p>
            <p className="text-gray-500">{yourCompany.phone}</p>
          </div>
          <div className="text-right bg-gray-50 p-4 rounded-xl">
            <p className="text-gray-600"><span className="text-gray-400">Date:</span> {invoice.date}</p>
            <p className="text-gray-600"><span className="text-gray-400">Due:</span> {invoice.paymentDate}</p>
          </div>
        </div>

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-5 rounded-2xl">
            <h3 className="text-rose-500 font-bold text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              BILL TO
            </h3>
            <p className="font-semibold text-gray-800">{billTo.name}</p>
            <p className="text-gray-600 text-sm">{billTo.address}</p>
            <p className="text-gray-600 text-sm">{billTo.phone}</p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-2xl">
            <h3 className="text-violet-500 font-bold text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              SHIP TO
            </h3>
            <p className="font-semibold text-gray-800">{shipTo.name}</p>
            <p className="text-gray-600 text-sm">{shipTo.address}</p>
            <p className="text-gray-600 text-sm">{shipTo.phone}</p>
          </div>
        </div>

        {/* Items */}
        <div className="mb-10 relative">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-4 text-left text-gray-400 text-xs uppercase tracking-wider font-medium">Description</th>
                <th className="py-4 text-center text-gray-400 text-xs uppercase tracking-wider font-medium">Qty</th>
                <th className="py-4 text-right text-gray-400 text-xs uppercase tracking-wider font-medium">Rate</th>
                <th className="py-4 text-right text-gray-400 text-xs uppercase tracking-wider font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    {item.description && (
                      <div className="text-sm text-gray-400">{item.description}</div>
                    )}
                  </td>
                  <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-4 text-right text-gray-600">{formatCurrency(item.amount)}</td>
                  <td className="py-4 text-right font-semibold text-gray-800">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-80">
            <div className="flex justify-between py-2 text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between py-2 text-gray-600">
                <span>Tax ({taxPercentage}%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 mt-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl px-4">
              <span className="font-bold">Total Due</span>
              <span className="font-bold text-lg">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Additional Notes</h3>
            <p className="text-gray-600 text-sm">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center text-sm text-gray-400">
          <p>Developed By: Inzeedo (PVT) Ltd. | Your Trusted Partner for Specialized Software Solutions</p>
          <p>Contact us for customized solutions: +94785706441</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template11;
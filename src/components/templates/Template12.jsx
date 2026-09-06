import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template12 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-emerald-50 p-8 max-w-4xl mx-auto min-h-[800px]">
        {/* Header with nature theme */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-emerald-800">{yourCompany.name || 'Your Company'}</h1>
              <p className="text-emerald-600 mt-1">{yourCompany.address}</p>
              <p className="text-emerald-600">{yourCompany.phone}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-800 font-semibold">Invoice</span>
              </div>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-emerald-700"><span className="text-emerald-500">No:</span> {invoice.number}</p>
                <p className="text-emerald-700"><span className="text-emerald-500">Date:</span> {invoice.date}</p>
                <p className="text-emerald-700"><span className="text-emerald-500">Due:</span> {invoice.paymentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-emerald-400">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-sm font-bold">B</span>
              </div>
              <h3 className="font-semibold text-emerald-800">Bill To</h3>
            </div>
            <p className="font-medium text-gray-800">{billTo.name}</p>
            <p className="text-gray-600 text-sm">{billTo.address}</p>
            <p className="text-gray-600 text-sm">{billTo.phone}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-teal-400">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 text-sm font-bold">S</span>
              </div>
              <h3 className="font-semibold text-teal-800">Ship To</h3>
            </div>
            <p className="font-medium text-gray-800">{shipTo.name}</p>
            <p className="text-gray-600 text-sm">{shipTo.address}</p>
            <p className="text-gray-600 text-sm">{shipTo.phone}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Order Details
          </h3>
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-50 rounded-lg">
                <th className="py-3 px-4 text-left text-emerald-700 text-sm font-medium rounded-l-lg">Item</th>
                <th className="py-3 px-4 text-center text-emerald-700 text-sm font-medium">Qty</th>
                <th className="py-3 px-4 text-right text-emerald-700 text-sm font-medium">Rate</th>
                <th className="py-3 px-4 text-right text-emerald-700 text-sm font-medium rounded-r-lg">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-emerald-50 last:border-b-0">
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-800">{item.name}</span>
                    {item.description && (
                      <div className="text-sm text-gray-500">{item.description}</div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{formatCurrency(item.amount)}</td>
                  <td className="py-4 px-4 text-right font-semibold text-emerald-700">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 w-80">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              {taxPercentage > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({taxPercentage}%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-emerald-100">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-800">Grand Total</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              Notes
            </h3>
            <p className="text-gray-600 text-sm">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-emerald-600">
          <p>Developed By: Inzeedo (PVT) Ltd. | Your Trusted Partner for Specialized Software Solutions</p>
          <p>Contact us for customized solutions: +94785706441</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template12;
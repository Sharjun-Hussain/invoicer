import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template10 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 max-w-4xl mx-auto min-h-[800px]">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {yourCompany.name || 'Your Company'}
            </h1>
            <p className="text-slate-400 mt-2">{yourCompany.address}</p>
            <p className="text-slate-400">{yourCompany.phone}</p>
          </div>
          <div className="text-right">
            <div className="inline-block px-6 py-2 bg-amber-500 text-slate-900 font-bold text-xl rounded-lg">
              INVOICE
            </div>
            <div className="mt-4 text-slate-300">
              <p><span className="text-slate-500">No:</span> {invoice.number}</p>
              <p><span className="text-slate-500">Date:</span> {invoice.date}</p>
              <p><span className="text-slate-500">Due:</span> {invoice.paymentDate}</p>
            </div>
          </div>
        </div>

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="text-amber-400 font-semibold mb-2 text-sm uppercase tracking-wider">Bill To</h3>
            <p className="font-medium text-lg">{billTo.name}</p>
            <p className="text-slate-400 text-sm">{billTo.address}</p>
            <p className="text-slate-400 text-sm">{billTo.phone}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="text-amber-400 font-semibold mb-2 text-sm uppercase tracking-wider">Ship To</h3>
            <p className="font-medium text-lg">{shipTo.name}</p>
            <p className="text-slate-400 text-sm">{shipTo.address}</p>
            <p className="text-slate-400 text-sm">{shipTo.phone}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-10">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-amber-500/50">
                <th className="py-3 text-left text-amber-400 text-sm uppercase tracking-wider">Item</th>
                <th className="py-3 text-center text-amber-400 text-sm uppercase tracking-wider">Qty</th>
                <th className="py-3 text-right text-amber-400 text-sm uppercase tracking-wider">Price</th>
                <th className="py-3 text-right text-amber-400 text-sm uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-slate-700/50">
                  <td className="py-4">
                    <span className="font-medium">{item.name}</span>
                    {item.description && (
                      <div className="text-sm text-slate-500">{item.description}</div>
                    )}
                  </td>
                  <td className="py-4 text-center text-slate-300">{item.quantity}</td>
                  <td className="py-4 text-right text-slate-300">{formatCurrency(item.amount)}</td>
                  <td className="py-4 text-right font-medium">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-72 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between py-2 text-slate-400">
              <span>Subtotal</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between py-2 text-slate-400">
                <span>Tax ({taxPercentage}%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 border-t border-slate-600 text-xl font-bold">
              <span className="text-amber-400">Total</span>
              <span className="text-amber-400">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <h3 className="text-amber-400 text-sm uppercase tracking-wider mb-2">Notes</h3>
            <p className="text-slate-400 text-sm">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-700 text-center text-sm text-slate-500">
          <p>Developed By: Inzeedo (PVT) Ltd. | Your Trusted Partner for Specialized Software Solutions</p>
          <p>Contact us for customized solutions: +94785706441</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template10;
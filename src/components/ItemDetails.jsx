import React, { useState, useEffect } from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { Trash2, Plus, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ItemDetails = ({ items, handleItemChange, addItem, removeItem }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = () => {
    const itemsData = localStorage.getItem('savedItems');
    if (itemsData) {
      setSavedItems(JSON.parse(itemsData));
    }
  };

  const handleSelectSavedItem = (savedItem) => {
    const emptyIndex = items.findIndex(item => !item.name && !item.amount);
    
    if (emptyIndex !== -1) {
      handleItemChange(emptyIndex, 'name', savedItem.name);
      handleItemChange(emptyIndex, 'description', savedItem.description);
      handleItemChange(emptyIndex, 'quantity', 1);
      handleItemChange(emptyIndex, 'amount', savedItem.amount);
      handleItemChange(emptyIndex, 'unit', savedItem.unit || 'pcs');
    } else {
      addItem();
      setTimeout(() => {
        const lastIndex = items.length;
        handleItemChange(lastIndex, 'name', savedItem.name);
        handleItemChange(lastIndex, 'description', savedItem.description);
        handleItemChange(lastIndex, 'quantity', 1);
        handleItemChange(lastIndex, 'amount', savedItem.amount);
        handleItemChange(lastIndex, 'unit', savedItem.unit || 'pcs');
      }, 100);
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Item Details</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Package className="mr-2 h-4 w-4" /> Select from Saved
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select Saved Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {savedItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No saved items. Go to Items page to add items.
                </p>
              ) : (
                savedItems.map((savedItem) => (
                  <div
                    key={savedItem.id}
                    className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectSavedItem(savedItem)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{savedItem.name}</h3>
                      {savedItem.description && (
                        <p className="text-sm text-gray-600">{savedItem.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">Rs. {savedItem.amount.toFixed(2)}/{savedItem.unit || 'unit'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {items.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded-xl bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 flex-1">
              <FloatingLabelInput
                id={`itemName${index}`}
                label="Name"
                value={item.name || ''}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              />
              <FloatingLabelInput
                id={`itemQuantity${index}`}
                label={`Quantity${item.unit ? ` (${item.unit})` : ''}`}
                type="number"
                value={item.quantity ?? ''}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value === '' ? '' : parseFloat(e.target.value))}
              />
              <FloatingLabelInput
                id={`itemAmount${index}`}
                label="Amount (Rs.)"
                type="number"
                value={item.amount ?? ''}
                onChange={(e) => handleItemChange(index, 'amount', e.target.value === '' ? '' : parseFloat(e.target.value))}
              />
              <FloatingLabelInput
                id={`itemTotal${index}`}
                label="Total (Rs.)"
                type="number"
                value={item.total !== undefined && item.total !== null ? item.total : (parseFloat(item.quantity || 0) * parseFloat(item.amount || 0)).toFixed(2)}
                onChange={(e) => handleItemChange(index, 'total', e.target.value === '' ? '' : parseFloat(e.target.value))}
              />
            </div>

            {items.length > 1 && (
              <Button
                variant="destructive"
                size="icon"
                className="shrink-0 h-10 w-10 mt-1 self-center"
                onClick={() => removeItem(index)}
                title="Delete item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <FloatingLabelInput
            id={`itemDescription${index}`}
            label="Description"
            value={item.description || ''}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
        </div>
      ))}
      <Button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>
    </div>
  );
};

export default ItemDetails;

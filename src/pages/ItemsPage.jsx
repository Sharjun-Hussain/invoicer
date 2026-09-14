import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, Package, Search } from 'lucide-react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdBanner from '../components/AdBanner';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ItemsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    unit: 'pcs'
  });

  useEffect(() => {
    document.title = "Manage Invoice Items & Pricing | Inzeedo";
    loadItems();
  }, []);

  const loadItems = () => {
    const savedItems = localStorage.getItem('savedItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  };

  const saveItems = (updatedItems) => {
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
    setItems(updatedItems);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (!formData.name || !formData.amount) {
      toast.error('Please fill in item name and amount');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      amount: parseFloat(formData.amount),
      unit: formData.unit
    };

    const updatedItems = [...items, newItem];
    saveItems(updatedItems);
    setFormData({ name: '', description: '', amount: '', unit: 'pcs' });
    toast.success('Item added successfully');
  };

  const handleEditItem = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      amount: item.amount.toString(),
      unit: item.unit || 'pcs'
    });
  };

  const handleUpdateItem = () => {
    if (!formData.name || !formData.amount) {
      toast.error('Please fill in item name and amount');
      return;
    }

    const updatedItems = items.map(item =>
      item.id === editingId
        ? {
            ...item,
            name: formData.name,
            description: formData.description,
            amount: parseFloat(formData.amount),
            unit: formData.unit
          }
        : item
    );

    saveItems(updatedItems);
    setEditingId(null);
    setFormData({ name: '', description: '', amount: '', unit: 'pcs' });
    toast.success('Item updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', amount: '', unit: 'pcs' });
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    saveItems(updatedItems);
    toast.success('Item deleted successfully');
  };

  const filteredItems = items.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      (item.description && item.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full px-6 py-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Items Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your reusable items for quick invoicing</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-6 items-start">
          {/* Add/Edit Form */}
          <Card className="border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-700">
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </span>
                {editingId ? 'Edit Item' : 'Add New Item'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                <FloatingLabelInput
                  id="name"
                  label="Item Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FloatingLabelInput
                  id="description"
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="relative">
                      <Select
                        value={formData.unit}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
                      >
                        <SelectTrigger className="h-11 w-full border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-blue-600/20">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 z-50 border-slate-200 dark:border-slate-700">
                          <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                          <SelectItem value="kg">Kilogram (kg)</SelectItem>
                          <SelectItem value="gram">Gram (g)</SelectItem>
                          <SelectItem value="liter">Liter (L)</SelectItem>
                          <SelectItem value="box">Box</SelectItem>
                          <SelectItem value="container">Container</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <FloatingLabelInput
                    id="amount"
                    label="Amount per Unit (Rs.) *"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  {editingId ? (
                    <>
                      <Button onClick={handleUpdateItem} className="flex-1 shadow-lg shadow-blue-600/20 transition-all">
                        <Save className="mr-2 h-4 w-4" /> Update
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" className="flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddItem} className="w-full shadow-lg shadow-blue-600/20 transition-all">
                      <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Items List */}
          <Card className="border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                  Saved Items
                  <span className="ml-2 text-sm font-normal text-slate-400">{items.length}</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              {items.length > 0 && (
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search items..."
                    className="w-full pl-9 pr-3 h-10 text-sm text-slate-900 dark:text-white bg-transparent rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all placeholder:text-slate-400"
                  />
                </div>
              )}

              <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
                {filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-4">
                      <Package className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {searchTerm ? 'No items match your search' : 'No items saved yet'}
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      {searchTerm ? 'Try a different search term' : 'Add your first item to get started!'}
                    </p>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 transition-all",
                        "hover:border-blue-400 hover:shadow-md hover:shadow-blue-600/5"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white truncate">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{item.description}</p>
                        )}
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                          Rs. {item.amount.toFixed(2)} <span className="text-slate-400 font-normal">/ {item.unit || 'unit'}</span>
                        </p>
                      </div>
                      <div className="flex gap-2 ml-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditItem(item)}
                          className="h-9 w-9 p-0 hover:border-blue-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteItem(item.id)}
                          className="h-9 w-9 p-0 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* 3rd Column: Compact Square Ad Banner (300x250) */}
          <Card className="border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40 overflow-hidden flex flex-col items-center shrink-0 w-fit self-start justify-self-center lg:justify-self-end">
            <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-700 w-full px-4 pt-3">
              <CardTitle className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
                Advertisement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 flex items-center justify-center">
              <AdBanner
                zoneKey="98af749660fe6c7cd3cb319af5e5a460"
                width={300}
                height={250}
                slotsCount={1}
              />
            </CardContent>
          </Card>
        </div>

        <AdBanner />
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>Developed By: Inzeedo (PVT) Ltd. | Your Trusted Partner for Specialized Software Solutions</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/privacy')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => navigate('/terms')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;

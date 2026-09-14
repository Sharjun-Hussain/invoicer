import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Save, Building2, Receipt, Scale } from 'lucide-react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdBanner from "../components/AdBanner";
import { toast } from "sonner";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') && ['company', 'invoice', 'tax'].includes(searchParams.get('tab'))
    ? searchParams.get('tab')
    : 'company';
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    logo: '',
    gstNumber: '',
    taxId: ''
  });
  const [invoiceSettings, setInvoiceSettings] = useState({
    currencySymbol: 'Rs.',
    currencyCode: 'LKR',
    locale: 'en-LK',
    invoicePrefix: 'INV',
    taxLabel: 'Tax',
    defaultTaxRate: 0
  });
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setCompanyData(settings);
      if (settings.logo) {
        setLogoPreview(settings.logo);
      }
    }

    const savedInvoiceSettings = localStorage.getItem('invoiceSettings');
    if (savedInvoiceSettings) {
      setInvoiceSettings(JSON.parse(savedInvoiceSettings));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handleInvoiceSettingsChange = (name, value) => {
    setInvoiceSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Logo size should be less than 2MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setLogoPreview(base64String);
        setCompanyData(prev => ({ ...prev, logo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setCompanyData(prev => ({ ...prev, logo: '' }));
  };

  const handleSaveSettings = () => {
    if (!companyData.name) {
      toast.error('Company name is required');
      return;
    }

    localStorage.setItem('companySettings', JSON.stringify(companyData));
    localStorage.setItem('invoiceSettings', JSON.stringify(invoiceSettings));
    toast.success('Settings saved successfully');
  };

  const handleClearSettings = () => {
    if (window.confirm('Are you sure you want to clear all settings?')) {
      localStorage.removeItem('companySettings');
      localStorage.removeItem('invoiceSettings');
      setCompanyData({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        logo: '',
        gstNumber: '',
        taxId: ''
      });
      setInvoiceSettings({
        currencySymbol: 'Rs.',
        currencyCode: 'LKR',
        locale: 'en-LK',
        invoicePrefix: 'INV',
        taxLabel: 'Tax',
        defaultTaxRate: 0
      });
      setLogoPreview(null);
      toast.success('Settings cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full px-6 py-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your company and invoice preferences</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setSearchParams({ tab: value })} className="space-y-6">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-white dark:bg-slate-800 p-1 text-slate-500 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="company" className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900">
              <Building2 className="h-4 w-4" /> Company Info
            </TabsTrigger>
            <TabsTrigger value="invoice" className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900">
              <Receipt className="h-4 w-4" /> Invoice Settings
            </TabsTrigger>
            <TabsTrigger value="tax" className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900">
              <Scale className="h-4 w-4" /> Tax & Legal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-1 border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Company Logo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    {logoPreview ? (
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                        <img
                          src={logoPreview}
                          alt="Company Logo"
                          className="relative h-32 w-32 object-contain border-2 border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 p-2"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-7 w-7 rounded-full p-0 shadow-lg"
                          onClick={handleRemoveLogo}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="h-32 w-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/50">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-xs font-medium">No Logo</span>
                      </div>
                    )}
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('logo').click()}
                      className="w-full border-dashed border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload Logo
                    </Button>
                    <p className="text-xs text-slate-400">Max size: 2MB</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="xl:col-span-2 border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <FloatingLabelInput
                      id="name"
                      label="Company Name *"
                      name="name"
                      value={companyData.name}
                      onChange={handleInputChange}
                    />
                    <FloatingLabelInput
                      id="address"
                      label="Address"
                      name="address"
                      value={companyData.address}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FloatingLabelInput
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={companyData.phone}
                        onChange={handleInputChange}
                      />
                      <FloatingLabelInput
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={companyData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <FloatingLabelInput
                      id="website"
                      label="Website"
                      name="website"
                      value={companyData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invoice">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2 border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Invoice & Currency Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FloatingLabelInput
                        id="currencySymbol"
                        label="Currency Symbol"
                        value={invoiceSettings.currencySymbol}
                        onChange={(e) => handleInvoiceSettingsChange('currencySymbol', e.target.value)}
                      />
                      <div>
                        <Select
                          value={invoiceSettings.currencyCode}
                          onValueChange={(value) => handleInvoiceSettingsChange('currencyCode', value)}
                        >
                          <SelectTrigger className="mt-1.5 h-11 w-full border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-blue-600/20">
                            <SelectValue placeholder="Currency Code" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 z-50 border-slate-200 dark:border-slate-700">
                            <SelectItem value="LKR">LKR - Sri Lankan Rupee</SelectItem>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                            <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Select
                          value={invoiceSettings.locale}
                          onValueChange={(value) => handleInvoiceSettingsChange('locale', value)}
                        >
                          <SelectTrigger className="mt-1.5 h-11 w-full border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-blue-600/20">
                            <SelectValue placeholder="Locale Format" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 z-50 border-slate-200 dark:border-slate-700">
                            <SelectItem value="en-LK">en-LK (Sri Lanka)</SelectItem>
                            <SelectItem value="en-US">en-US (United States)</SelectItem>
                            <SelectItem value="en-GB">en-GB (United Kingdom)</SelectItem>
                            <SelectItem value="en-IN">en-IN (India)</SelectItem>
                            <SelectItem value="en-AU">en-AU (Australia)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FloatingLabelInput
                        id="invoicePrefix"
                        label="Invoice Number Prefix"
                        value={invoiceSettings.invoicePrefix}
                        onChange={(e) => handleInvoiceSettingsChange('invoicePrefix', e.target.value)}
                      />
                      <FloatingLabelInput
                        id="taxLabel"
                        label="Tax Label"
                        value={invoiceSettings.taxLabel}
                        onChange={(e) => handleInvoiceSettingsChange('taxLabel', e.target.value)}
                      />
                      <FloatingLabelInput
                        id="defaultTaxRate"
                        label="Default Tax Rate (%)"
                        type="number"
                        value={invoiceSettings.defaultTaxRate}
                        onChange={(e) => handleInvoiceSettingsChange('defaultTaxRate', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="xl:col-span-1 border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Currency Display</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{invoiceSettings.currencySymbol} 1,234.56</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Invoice Number</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{invoiceSettings.invoicePrefix}-2024-001</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Tax Display</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{invoiceSettings.taxLabel} ({invoiceSettings.defaultTaxRate}%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tax">
            <Card className="border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Tax & Legal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingLabelInput
                      id="gstNumber"
                      label="GST/VAT Number"
                      name="gstNumber"
                      value={companyData.gstNumber}
                      onChange={handleInputChange}
                    />
                    <FloatingLabelInput
                      id="taxId"
                      label="Tax ID / Business Registration Number"
                      name="taxId"
                      value={companyData.taxId}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Tip:</strong> These legal identifiers will appear on your invoices and help ensure compliance with tax regulations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
          <Button onClick={handleClearSettings} variant="outline" className="px-6 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            Clear All
          </Button>
          <Button onClick={handleSaveSettings} variant="default" size="lg" className="px-8 shadow-lg transition-all">
            <Save className="mr-2 h-4 w-4" /> Save All Settings
          </Button>
        </div>

        <AdBanner />
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-400">
          <p>Developed By: Inzeedo (PVT) Ltd. | Your Trusted Partner for Specialized Software Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

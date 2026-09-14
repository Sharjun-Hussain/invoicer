import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Home, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceTemplate from "../components/InvoiceTemplate";
import AdBanner from "../components/AdBanner";
import RewardedAdModal from "../components/RewardedAdModal";
import { generatePDF } from "../utils/pdfGenerator";
import { templates } from "../utils/templateRegistry";
import { cn } from "@/lib/utils";

const TemplatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showRewardedAd, setShowRewardedAd] = useState(false);

  useEffect(() => {
    document.title = "Choose Invoice Templates & Export PDF | Inzeedo";
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      setCurrentTemplate(location.state.selectedTemplate || 1);
    } else {
      // If no form data in location state, try to load from localStorage
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [location.state]);

  const handleTemplateChange = (templateNumber) => {
    setCurrentTemplate(templateNumber);
    // Scroll the preview into view on mobile
    const preview = document.getElementById("preview-section");
    if (preview) {
      preview.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDownloadClick = () => {
    if (formData && !isDownloading) {
      setShowRewardedAd(true);
    }
  };

  const handleDownloadPDF = async () => {
    if (formData && !isDownloading) {
      setIsDownloading(true);

      try {
        // 1. Generate PDF in frontend
        await generatePDF(formData, currentTemplate);

        // 2. SEND invoice data to your serverless backend
        await fetch("https://invoicerapi.inzeedo.lk/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            templateNumber: currentTemplate,
            generatedAt: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-sm font-medium">Loading invoice...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full px-6 py-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Template Preview</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Select a design and download your invoice as PDF
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className="shadow-lg shadow-blue-600/20 transition-all"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
          {/* Template Gallery Sidebar */}
          <div className="lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Choose a Template
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {templates.map((template, index) => {
                const templateNumber = index + 1;
                const isActive = currentTemplate === templateNumber;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTemplateChange(templateNumber)}
                    className={cn(
                      "relative group p-2.5 rounded-xl transition-all duration-200 border-2 text-left",
                      isActive
                        ? "border-blue-600 bg-white dark:bg-slate-800 shadow-lg shadow-blue-600/10"
                        : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
                    )}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-2 aspect-[4/3] bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                      <img
                        src={`/assets/template${templateNumber}-preview.png`}
                        alt={template.name}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-300",
                          !isActive && "group-hover:scale-105"
                        )}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                          <span className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                            <Check className="h-4 w-4" />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between px-0.5">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isActive
                            ? "text-blue-600"
                            : "text-slate-700 dark:text-slate-300"
                        )}
                      >
                        {template.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Preview */}
          <div id="preview-section" className="w-full flex justify-center lg:justify-end lg:overflow-x-auto">
            <div className="w-[210mm] h-[297mm] bg-white dark:bg-slate-800 shadow-2xl shadow-slate-400/30 dark:shadow-black/40 rounded-sm overflow-hidden ring-1 ring-slate-200/60 dark:ring-slate-700 max-w-full">
              <InvoiceTemplate data={formData} templateNumber={currentTemplate} />
            </div>
          </div>
        </div>

        {/* Floating download card */}
        <div className="fixed bottom-6 right-6 z-[100] w-64 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-4 shadow-2xl shadow-slate-900/20 dark:shadow-black/40">
          <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Ready to download?</p>
          <Button
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className="w-full shadow-lg shadow-blue-600/20 transition-all"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </>
            )}
          </Button>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
            Currently using: <span className="font-semibold text-slate-600 dark:text-slate-300">{templates[currentTemplate - 1]?.name}</span>
          </p>
        </div>

        {/* Rewarded Video / Interstitial Ad Modal */}
        <RewardedAdModal
          isOpen={showRewardedAd}
          onClose={() => setShowRewardedAd(false)}
          onComplete={handleDownloadPDF}
        />

        <AdBanner />
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm">
          <p className="text-slate-400">
            Developed By: Inzeedo (PVT) Ltd. | Your Trusted Partner for Specialized Software Solutions
          </p>
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;

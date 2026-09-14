import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AdBanner from '../components/AdBanner';

const PrivacyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Privacy Policy | Inzeedo Invoice Generator";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Effective Date: September 14, 2026</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="shadow-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Home
          </Button>
        </div>

        {/* Policy Content */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 space-y-8 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              1. Information We Collect & Local Data Storage
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              At <strong>Inzeedo (PVT) Ltd.</strong> ("Inzeedo", "we", "us"), we prioritize your privacy. 
              Inzeedo Invoice Generator is built with privacy-first architecture. All invoice data, client bill-to details, line items, and template configurations entered into our platform are processed and stored <strong>locally inside your web browser’s local storage (LocalStorage)</strong>. We do not store or track your private client billing data on persistent central database servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              2. PDF Generation & Data Transmission
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              When you generate or download an invoice PDF, the rendering occurs directly inside your client browser. In certain operational instances (such as serverless analytics or automated delivery), non-sensitive metadata (such as invoice timestamps and template selections) may be logged to verify service performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              3. Advertising & Third-Party Cookies
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              To keep our core invoice and receipt tools 100% free for users worldwide, our website incorporates third-party advertising services (including Adsterra network partners). These third-party vendors may use cookies, web beacons, or browser identifiers to deliver relevant advertisements and measure ad performance.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              You may manage or block cookies through your browser settings or ad-blocking extensions. Note that disabling ad scripts may trigger our anti-adblock notification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              4. External Links & Security
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Our website may contain links to external sites or sponsor platforms. We are not responsible for the privacy practices, content, or policies of external websites. We encourage you to review the privacy policies of any third-party websites you visit.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300">
              If you have any questions or feedback regarding this Privacy Policy, please contact us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white">Inzeedo (PVT) Ltd.</p>
              <p className="text-slate-500 dark:text-slate-400">Specialized Software Solutions & Platform Services</p>
              <p className="text-blue-600 dark:text-blue-400">Website: https://inzeedo.lk</p>
            </div>
          </section>
        </div>

        <AdBanner />

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Inzeedo (PVT) Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/privacy')} className="hover:underline font-medium text-blue-600 dark:text-blue-400">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:underline">Terms of Service</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

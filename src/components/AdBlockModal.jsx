import React, { useEffect, useState } from 'react';
import { ShieldAlert, RefreshCw, ShieldOff, AlertTriangle } from 'lucide-react';

const AdBlockModal = () => {
  const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const checkAdBlocker = async () => {
    setIsChecking(true);

    // 1. Script Tag Insertion Test (Brave Shield & AdBlockers trigger script.onerror when blocking)
    const scriptBlocked = await new Promise((resolve) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.highrevenueformat.com/b4b3e9b74484b109eeffa7eaa703707f/invoke.js?r=${Math.random()}`;

      const cleanup = () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };

      script.onload = () => {
        cleanup();
        resolve(false); // Ad script loaded successfully -> Shield is DOWN / AdBlock OFF
      };

      script.onerror = () => {
        cleanup();
        resolve(true); // Ad script was blocked -> Shield is UP / AdBlock ON
      };

      // Set timeout in case onerror/onload isn't called quickly
      setTimeout(() => {
        cleanup();
        // If script hasn't loaded after 1.5s, check if element or fetch is blocked
        resolve(false);
      }, 1500);

      document.head.appendChild(script);
    });

    // 2. Bait Element Test (Cosmetic CSS / element hiding rules)
    const baitBlocked = await new Promise((resolve) => {
      const bait = document.createElement('div');
      bait.className = 'pub_300x250 pub_300x250m ad-placement ad-banner adsbox doubleclick adsterra-ad';
      bait.id = 'ad-tester-element';
      bait.style.cssText =
        'position: absolute !important; top: -9999px !important; left: -9999px !important; width: 300px !important; height: 250px !important; display: block !important;';
      document.body.appendChild(bait);

      setTimeout(() => {
        const isHidden =
          !document.body.contains(bait) ||
          bait.offsetParent === null ||
          bait.offsetHeight === 0 ||
          bait.clientHeight === 0 ||
          window.getComputedStyle(bait).getPropertyValue('display') === 'none' ||
          window.getComputedStyle(bait).getPropertyValue('visibility') === 'hidden';

        if (document.body.contains(bait)) {
          document.body.removeChild(bait);
        }
        resolve(isHidden);
      }, 150);
    });

    const isDetected = scriptBlocked || baitBlocked;

    setIsAdBlockerActive(isDetected);
    setIsChecking(false);
  };

  useEffect(() => {
    checkAdBlocker();
  }, []);

  if (!isAdBlockerActive) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-lg animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-rose-200 dark:border-rose-900/50 overflow-hidden">
        {/* Header decoration */}
        <div className="h-2 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />

        <div className="p-6 text-center">
          {/* Animated Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 ring-8 ring-rose-50 dark:ring-rose-900/20">
            <ShieldAlert className="h-8 w-8 animate-bounce" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Ad Blocker / Brave Shield Detected
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We noticed you are using an <strong className="text-rose-600 dark:text-rose-400">Ad Blocker</strong> or <strong className="text-rose-600 dark:text-rose-400">Brave Shields</strong>. 
            Please disable your ad blocker to continue using our free invoice platform.
          </p>

          {/* Instructions Card */}
          <div className="mt-5 text-left p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldOff className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  For Brave Browser Users:
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Click the <strong className="text-amber-600 dark:text-amber-400">Lion Icon</strong> in your address bar and toggle <strong>Shields DOWN</strong> for this site.
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                  For AdBlock / uBlock Extensions:
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Click your AdBlock extension icon and select <strong>"Pause on this site"</strong> or <strong>"Don't run on pages on this domain"</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={checkAdBlocker}
              disabled={isChecking}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium shadow-lg shadow-rose-600/30 transition-all duration-200 disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Re-checking...' : "I've Disabled AdBlock - Recheck"}
            </button>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Thank you for supporting our free invoice platform!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBlockModal;

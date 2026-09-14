import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, Download, CheckCircle2, Sparkles, ExternalLink, X, Clock } from 'lucide-react';

const SingleAdFrame = ({ zoneKey = 'b4b3e9b74484b109eeffa7eaa703707f', width = 320, height = 50 }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key': '${zoneKey}',
                'format': 'iframe',
                'height': ${height},
                'width': ${width},
                'params': {}
              };
            </script>
            <script type="text/javascript" src="https://www.highrevenueformat.com/${zoneKey}/invoke.js"></script>
          </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    } catch (err) {
      console.error('Error rendering Adsterra iframe:', err);
    }
  }, [zoneKey, width, height]);

  return (
    <iframe
      ref={iframeRef}
      title="Sponsor Ad"
      width={width}
      height={height}
      style={{ border: 0, overflow: 'hidden', minWidth: `${width}px`, minHeight: `${height}px` }}
      scrolling="no"
    />
  );
};

const RewardedAdModal = ({
  isOpen,
  onClose,
  onComplete,
  adDirectLink = 'https://www.profitableratecpmnetwork.com/e6/88/7a/e6887acc7924d0673aeaa8d9ec28756e.js',
  countdownSeconds = 10,
}) => {
  const [hasClickedAd, setHasClickedAd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setHasClickedAd(false);
      setTimeLeft(countdownSeconds);
      setIsReady(false);
      return;
    }
  }, [isOpen, countdownSeconds]);

  useEffect(() => {
    if (!hasClickedAd || isReady) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasClickedAd, isReady]);

  const handleAdClick = () => {
    setHasClickedAd(true);
    if (adDirectLink) {
      window.open(adDirectLink, '_blank');
    }
  };

  const handleDownload = () => {
    if (onComplete) {
      onComplete();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white text-center relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-15">
            <Sparkles className="w-28 h-28" />
          </div>
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            <PlayCircle className="w-6 h-6 text-yellow-300" />
            Preparing Your Invoice Download
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            Click the sponsor ad below to start the 10-second download timer.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 w-full flex flex-col items-center gap-4">
          {/* Ad Container */}
          <div className="w-full rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center justify-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
              Sponsor Advertisement
            </span>

            {/* Clean Ad Frame */}
            <div className="w-full flex items-center justify-center py-1 overflow-hidden min-h-[55px]">
              <SingleAdFrame width={320} height={50} />
            </div>

            {/* Click Ad Button */}
            <button
              onClick={handleAdClick}
              className={`w-full py-3 px-4 text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                hasClickedAd
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20 cursor-default'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-[0.99] text-white shadow-orange-500/20'
              }`}
            >
              {hasClickedAd ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Sponsor Ad Verified - Timer Started!
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  Click Sponsor Ad to Start 10s Countdown
                </>
              )}
            </button>
          </div>

          {/* Status Box */}
          <div className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!hasClickedAd ? (
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <ExternalLink className="w-5 h-5" />
                </div>
              ) : isReady ? (
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                  {timeLeft}s
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {!hasClickedAd
                    ? 'Step 1: Click Ad Above'
                    : isReady
                    ? 'Step 2: Download Ready!'
                    : `Step 2: Countdown Active (${timeLeft}s)`}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {!hasClickedAd
                    ? 'You must click the sponsor ad to start the 10s timer.'
                    : isReady
                    ? 'Your invoice PDF is ready to download.'
                    : `Please wait ${timeLeft} seconds...`}
                </p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={!isReady}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all duration-200 ${
              isReady
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/30 scale-[1.01] cursor-pointer'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <Download className="w-5 h-5" />
            {!hasClickedAd
              ? 'Click Ad Above First'
              : isReady
              ? 'Download PDF Invoice Now'
              : `Please Wait (${timeLeft}s)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardedAdModal;

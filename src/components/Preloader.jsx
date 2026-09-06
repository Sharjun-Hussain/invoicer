import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 1600;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => setHidden(true), 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hidden) {
      const timer = setTimeout(() => setRemoved(true), 600);
      return () => clearTimeout(timer);
    }
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-opacity duration-500",
        hidden && "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-2xl animate-pulse" />
          <img
            src="/inzeedo.png"
            alt="Inzeedo Logo"
            className="relative h-32 w-auto object-contain drop-shadow-2xl"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Inzeedo <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Invoicer</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Prepare your invoice experience...</p>

        <div className="mt-8 w-64">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>Loading</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
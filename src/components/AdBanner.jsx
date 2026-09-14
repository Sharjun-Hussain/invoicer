import React, { useEffect, useRef } from 'react';

const SingleAdIframe = ({ zoneKey, width, height, format }) => {
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
                'format': '${format}',
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
      console.error('Error rendering Adsterra banner:', err);
    }
  }, [zoneKey, width, height, format]);

  return (
    <iframe
      ref={iframeRef}
      title="Advertisement"
      width={width}
      height={height}
      style={{ border: 0, overflow: 'hidden', minWidth: `${width}px`, minHeight: `${height}px` }}
      scrolling="no"
    />
  );
};

const AdBanner = ({ 
  zoneKey = 'b4b3e9b74484b109eeffa7eaa703707f', 
  width = 320, 
  height = 50, 
  format = 'iframe',
  slotsCount = 8
}) => {
  // Render array of slots (defaults to 8 so both rows fill completely on desktop)
  const slots = Array.from({ length: slotsCount });

  return (
    <div className="w-full my-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full px-3 py-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-medium">
          Advertisement
        </span>

        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 w-full">
          {slots.map((_, index) => (
            <div key={index} className="flex items-center justify-center shrink-0">
              <SingleAdIframe zoneKey={zoneKey} width={width} height={height} format={format} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
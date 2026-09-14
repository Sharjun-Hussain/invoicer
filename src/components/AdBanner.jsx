import React, { useEffect, useRef } from 'react';

const AdBanner = ({ 
  zoneKey = 'b4b3e9b74484b109eeffa7eaa703707f', 
  width = 320, 
  height = 50, 
  format = 'iframe' 
}) => {
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
    <div className="flex flex-col items-center justify-center my-3 w-full overflow-hidden">
      <iframe
        ref={iframeRef}
        title="Advertisement"
        width={width}
        height={height}
        style={{ border: 0, overflow: 'hidden', minWidth: `${width}px`, minHeight: `${height}px` }}
        scrolling="no"
      />
    </div>
  );
};

export default AdBanner;
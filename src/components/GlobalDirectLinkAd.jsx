import { useEffect } from 'react';
import { triggerRandomDirectLink } from '../utils/adsterraDirectLink';

const GlobalDirectLinkAd = () => {
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // Find if clicked element or parent is a button or interactive element
      const target = event.target;
      const buttonOrAction = target.closest('button, [role="button"], a.btn, input[type="submit"]');

      if (buttonOrAction) {
        // Trigger random direct link on button click
        triggerRandomDirectLink();
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
};

export default GlobalDirectLinkAd;

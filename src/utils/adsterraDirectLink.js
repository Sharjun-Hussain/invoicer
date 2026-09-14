// List of 5 Adsterra Direct Link / SmartLink URLs
export const ADSTERRA_DIRECT_LINKS = [
  'https://www.profitableratecpmnetwork.com/wkhjkbxbjk?key=891189332f7aa7cc926b16ca42abd084',
  'https://www.profitableratecpmnetwork.com/m4f1qrgs0?key=2d9dfa30ff075363ccc824295e95d998',
  'https://www.profitableratecpmnetwork.com/etbts6sfh?key=e02ed799aac3e985b94537b8a3c758b2',
  'https://www.profitableratecpmnetwork.com/t40c369rxk?key=ae3029e060035fa09b6a694b9118a494',
  'https://www.profitableratecpmnetwork.com/qtc26hca0x?key=0f7e47e17a4c865c33a24612cbb71606',
];

/**
 * Returns a random direct link from the 5 configured URLs
 */
export const getRandomDirectLink = () => {
  const index = Math.floor(Math.random() * ADSTERRA_DIRECT_LINKS.length);
  return ADSTERRA_DIRECT_LINKS[index];
};

// Random trigger probability percentage (35% chance per button click)
const TRIGGER_CHANCE_PERCENT = 35;

// Cooldown between triggers in milliseconds (8 seconds)
const COOLDOWN_MS = 8000;

let lastTriggerTime = 0;

/**
 * Triggers a random Adsterra Direct Link on button clicks
 */
export const triggerRandomDirectLink = (force = false) => {
  const now = Date.now();

  // Enforce cooldown so user is not spammed on every single fast click
  if (!force && now - lastTriggerTime < COOLDOWN_MS) {
    return;
  }

  // Random percentage check
  const randomVal = Math.floor(Math.random() * 100) + 1;

  if (force || randomVal <= TRIGGER_CHANCE_PERCENT) {
    lastTriggerTime = now;
    const targetUrl = getRandomDirectLink();
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Direct link open blocked:', e);
    }
  }
};

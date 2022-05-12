export const AppName = 'AtsSys';

export const envs = {
  version: process.env.NEXT_PUBLIC_APP_VERSION || 'v0.1.0',
  direction: process.env.NEXT_PUBLIC_APP_DIRECTION || 'rtl',
  isDevMode: process.env.NODE_ENV === 'development' || false,
  siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE || 'ATS System',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000',
  recaptchaSiteKey:
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Le_uJUeAAAAAKU72S33MnBo1xPJsoXYydL1kwXX`,
};

export const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

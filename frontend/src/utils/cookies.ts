import Cookies, { CookieAttributes } from 'js-cookie';

export type CookieOptionType = CookieAttributes;
export const cookiesPrefix = '__app__';

export type CookiesKeyProps = 'acs_tkn' | 'acs_tkn_exp_in' | 'rfh_tkn' | 'rfh_tkn_exp_in';

export const setCookie = (
  keyName: CookiesKeyProps,
  value: unknown,
  options: CookieAttributes | undefined = undefined
) => {
  let data: string;
  if (typeof value === 'string') {
    data = value;
  } else {
    data = JSON.stringify(value);
  }

  Cookies.set(`${cookiesPrefix}${keyName}`, data, options);
};

export const getCookie = (keyName: CookiesKeyProps, type: 'as-string' | 'as-json' = 'as-string') => {
  const value = Cookies.get(`${cookiesPrefix}${keyName}`);
  if (value && type === 'as-json') {
    return JSON.parse(value);
  }

  return value;
};

export const getCookieFrom = (
  serverSideCookies: { [key: string]: string },
  keyName: CookiesKeyProps,
  type: 'as-string' | 'as-json' = 'as-string'
) => {
  if (!serverSideCookies) return null;

  const value = serverSideCookies[`${cookiesPrefix}${keyName}`];

  if (value && type === 'as-json') {
    return JSON.parse(value);
  }

  return value;
};

export const removeCookie = (keyName: CookiesKeyProps) => {
  return Cookies.remove(`${cookiesPrefix}${keyName}`);
};

export const removeAllCookies = () => {
  return Object.keys(Cookies.get()).forEach((cookieName) => {
    const neededAttributes = {
      // Here you pass the same attributes that were used when the cookie was created
      // and are required when removing the cookie
    };
    Cookies.remove(cookieName, neededAttributes);
  });
};

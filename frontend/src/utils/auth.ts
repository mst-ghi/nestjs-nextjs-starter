import axios from '@utils/axios';
import { envs } from '@utils/constants';
import { CookieOptionType, getCookie, removeCookie, setCookie } from '@utils/cookies';
import { getStorage, removeStorage, setStorage } from '@utils/storage';

export declare type AuthTokensResType = { access_token: string; refresh_token?: string };
export declare type AuthInitType = { user?: IUser; tokens?: AuthTokensResType } | null;

const authCookieDataOptions = {
  expires: 30,
  secure: !envs.isDevMode,
  path: '/',
  domain: '',
};

export const authFetchUser = async (): Promise<IUser | undefined> => {
  try {
    const { data } = await axios.get('/v1/auth/init');
    return data.user;
  } catch (error) {
    return undefined;
  }
};

export const authRefreshToken = async (
  cookieOptions?: CookieOptionType
): Promise<AuthTokensResType | undefined> => {
  const accessToken: string | undefined = getCookie('acs_tkn');
  const refreshToken: string | undefined = getCookie('rfh_tkn');

  if (Boolean(refreshToken) && Boolean(accessToken)) {
    try {
      const { data } = await axios.post('/v1/auth/refresh-token', {
        refresh_token: refreshToken,
        old_access_token: accessToken,
      });
      const tokens: AuthTokensResType = data.tokens as AuthTokensResType;
      authSetTokens(tokens, cookieOptions);
      return tokens;
    } catch (error) {
      authReset();
      return undefined;
    }
  }

  return undefined;
};

export const authInitialize = async (): Promise<AuthInitType> => {
  let result: AuthInitType = null;
  const accessToken: string | undefined = getCookie('acs_tkn');
  const refreshToken: string | undefined = getCookie('rfh_tkn');

  if (accessToken) {
    const user = await authFetchUser();

    result = {
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };

    if (user) {
      result.user = user;
      authSetUser(user);
    } else {
      const tokens = await authRefreshToken();
      if (tokens) {
        result.tokens = tokens;
        authSetTokens(tokens);
      } else {
        authReset();
      }
    }
  } else {
    authReset();
  }

  return result;
};

export const authGetUser = () => {
  return getStorage('user');
};
export const authSetUser = (user: IUser) => {
  setStorage('user', user);
};

export const authGetTokens = (): AuthTokensResType => {
  return {
    access_token: getCookie('acs_tkn'),
    refresh_token: getCookie('rfh_tkn'),
  };
};
export const authSetTokens = (tokens: AuthTokensResType, cookieOptions?: CookieOptionType) => {
  setCookie('acs_tkn', tokens.access_token, cookieOptions || authCookieDataOptions);
  setCookie('rfh_tkn', tokens.refresh_token, cookieOptions || authCookieDataOptions);
};

export const authReset = () => {
  removeStorage('user');
  removeCookie('acs_tkn');
  removeCookie('rfh_tkn');
};

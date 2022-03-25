import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  AuthTokensResType,
  authFetchUser,
  authInitialize,
  authRefreshToken,
  authReset,
  authSetTokens,
  authSetUser,
} from '@utils/auth';
import { PostRequest } from '@utils/axios';
import { authSelector, mutateAuthReset, mutateTokens, mutateUser } from '@store/slices/AuthSlice';
import useAlert from './useAlert';
import useApp from './useApp';

declare type UseAuthPropsType = {
  redirectUser?: boolean;
  justGuest?: boolean;
  redirectUrl?: string;
};

const useAuth = (args: UseAuthPropsType = { redirectUser: false }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const appState = useSelector(authSelector);
  const { catchToast, showToast } = useAlert();
  const { setGlobalLoading } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const isGuest = !appState.isLoggedIn;

  useEffect(() => {
    if (!appState.isLoggedIn && args.redirectUser) {
      if (args.redirectUrl) {
        routerPush(args.redirectUrl);
      } else {
        router.push('/403');
      }
    } else if (appState.isLoggedIn && args.justGuest) {
      router.push('/');
    }
  }, [args]);

  const setUser = (payload: IUser) => {
    dispatch(mutateUser(payload));
    authSetUser(payload);
  };

  const setTokens = (tokens: AuthTokensResType) => {
    dispatch(
      mutateTokens({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      })
    );
    authSetTokens(tokens);
  };

  const fetchUserReq = async (): Promise<IUser | undefined> => {
    const user = await authFetchUser();
    setUser((user as IUser) || {});
    return user;
  };

  const refreshTokenReq = async (): Promise<AuthTokensResType | undefined> => {
    setIsLoading(true);
    const tokens = await authRefreshToken();
    setIsLoading(false);
    if (tokens) {
      setTokens(tokens);
    }
    return tokens;
  };

  const initializeAuthData = async () => {
    setGlobalLoading(true);
    const authData = await authInitialize();
    if (authData) {
      const { user, tokens } = authData;
      if (tokens) {
        setTokens(tokens);
      }
      if (user) {
        setUser(user);
      }
    }
    await setGlobalLoading(false);
  };

  const resetAll = () => {
    dispatch(mutateAuthReset());
    authReset();
  };

  const routerPush = (url: string) => {
    if (url) {
      router.push(url);
    }
  };

  const forceReload = (_toUrl = '/') => {
    if (process.browser) {
      location.href = _toUrl;
    }
  };

  const logout = (_toUrl = '/') => {
    resetAll();
    forceReload(_toUrl);
  };

  const signIn = async (email: string, password: string, recaptcha?: string) => {
    setIsLoading(true);
    await PostRequest({
      url: '/v1/auth/login',
      body: { email, password, recaptcha },
    })
      .then(({ data }) => {
        setUser(data.user);
        setTokens(data.tokens);
        showToast('success', 'Sign in successfully');
        forceReload('/profile');
      })
      .catch((error) => {
        catchToast({ error });
      });
    setIsLoading(false);
  };

  const signUp = async (full_name: string, email: string, password: string, recaptcha?: string) => {
    setIsLoading(true);
    await PostRequest({
      url: '/v1/auth/register',
      body: { full_name, email, password, recaptcha },
    })
      .then(() => {
        showToast('success', 'Sign up successfully');
        router.push('/signin');
      })
      .catch((error) => {
        catchToast({ error });
      });
    setIsLoading(false);
  };

  return {
    ...appState,
    isLoading,
    isGuest,
    setUser,
    fetchUserReq,
    refreshTokenReq,
    initializeAuthData,
    forceReload,
    routerPush,
    resetAll,
    logout,
    signIn,
    signUp,
  };
};

export default useAuth;

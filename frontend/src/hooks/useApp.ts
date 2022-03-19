import { useDispatch, useSelector } from 'react-redux';
import { sleep } from '@utils/helpers';
import { ThemeNames, ThemeNamesType } from '@utils/theme';
import {
  appSelector,
  mutateDirection,
  mutateIsGlobalLoading,
  mutateIsShowSettingDialog,
  mutateTheme,
  mutateVersion,
} from '@store/slices';

const useApp = () => {
  const dispatch = useDispatch();
  const appState = useSelector(appSelector);
  const themes = ThemeNames;

  const setGlobalLoading = async (payload = false, waitingTime = 500) => {
    if (!payload) {
      await sleep(waitingTime);
    }
    dispatch(mutateIsGlobalLoading(payload));
  };

  const setVersion = (payload: string) => {
    dispatch(mutateVersion(payload));
  };

  const setDirection = (payload: 'ltr' | 'rtl') => {
    dispatch(mutateDirection(payload));
  };

  const setTheme = (payload: ThemeNamesType) => {
    dispatch(mutateTheme(payload));
  };

  const setIsShowSettingDialog = (payload: boolean) => {
    dispatch(mutateIsShowSettingDialog(payload));
  };

  return {
    ...appState,
    themes,
    setGlobalLoading,
    setVersion,
    setDirection,
    setTheme,
    setIsShowSettingDialog,
  };
};

export default useApp;

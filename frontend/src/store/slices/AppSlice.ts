import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { envs } from '@utils/constants';
import { ThemeNamesType } from '@utils/theme';

interface AppStateProps {
  version: string;
  direction: 'rtl' | 'ltr';
  theme: ThemeNamesType;
  isShowSettingDialog: boolean;
  isGlobalLoading: boolean;
}

const initialState = {
  version: envs.version,
  direction: envs.direction,
  theme: 'light',
  isShowSettingDialog: false,
  isGlobalLoading: true,
} as AppStateProps;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    mutateVersion(state, action: PayloadAction<string>) {
      state.version = action.payload;
    },
    mutateDirection(state, action: PayloadAction<'rtl' | 'ltr'>) {
      state.direction = action.payload;
    },
    mutateTheme(state, action: PayloadAction<ThemeNamesType>) {
      state.theme = action.payload;
    },
    mutateIsShowSettingDialog(state, action: PayloadAction<boolean>) {
      state.isShowSettingDialog = action.payload;
    },
    mutateIsGlobalLoading(state, action: PayloadAction<boolean>) {
      state.isGlobalLoading = action.payload;
    },
  },
});

export const appSelector = (state: StoreProps) => state.app;
export const {
  mutateVersion,
  mutateDirection,
  mutateTheme,
  mutateIsShowSettingDialog,
  mutateIsGlobalLoading,
} = appSlice.actions;
export default appSlice.reducer;

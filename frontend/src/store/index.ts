import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import AppSlice from './slices/AppSlice';
import AuthSlice from './slices/AuthSlice';
import ConfirmSlice from './slices/ConfirmSlice';

const Store = configureStore({
  reducer: {
    app: AppSlice,
    auth: AuthSlice,
    confirm: ConfirmSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

type RootState = ReturnType<typeof Store.getState>;

declare global {
  export type StoreProps = RootState;
}

export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default Store;

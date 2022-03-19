/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ConfirmStateProps {
  isConfirmModalOpen: boolean;
  title: string;
  message?: string;
  acceptText?: string;
  rejectText?: string;
  isCancelable?: boolean;
}

export const initialState = {
  isConfirmModalOpen: false,
  message: 'You are sure to do this?',
  title: 'Confirm',
  acceptText: "Yes, I'm Sure",
  rejectText: 'No',
  isCancelable: false,
} as ConfirmStateProps;

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    mutateConfirmData(
      state,
      action: PayloadAction<{
        title?: string;
        message?: string;
        acceptText?: string;
        rejectText?: string;
        isOpen: boolean;
        isCancelable?: boolean;
      }>
    ) {
      const { title, message, acceptText, rejectText, isOpen, isCancelable } = action.payload;

      title ? (state.title = title) : null;
      message ? (state.message = message) : null;
      acceptText ? (state.acceptText = acceptText) : null;
      rejectText ? (state.rejectText = rejectText) : null;

      state.isConfirmModalOpen = isOpen;
      state.isCancelable = isCancelable;
    },

    mutateIsConfirmModalOpen(state, action: PayloadAction<boolean>) {
      state.isConfirmModalOpen = action.payload;
    },
  },
});

export const selector = (state: StoreProps) => state.confirm;
export const { mutateConfirmData, mutateIsConfirmModalOpen } = confirmSlice.actions;
export default confirmSlice.reducer;

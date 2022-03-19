/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { mutateConfirmData, mutateIsConfirmModalOpen, selector } from '@store/slices/ConfirmSlice';

type GetConfirm = {
  title?: string;
  message?: string;
  acceptText?: string;
  rejectText?: string;
  isCancelable?: boolean;
  hasRejectHandler?: boolean;
};

const defaultMessages = {
  default: 'Your request has been successfully submitted',
  success: 'Your request has been successfully submitted',
  error: 'Something went wrong!',
  warn: 'Something went wrong!',
};

type ToastTypes = 'default' | 'success' | 'error' | 'warn';

let onAcceptedConfirmCallback: (val: unknown) => void;
let onRejectedConfirmCallback: (val: unknown) => void;

const messageTypes = {
  success: toast.TYPE.SUCCESS,
  error: toast.TYPE.ERROR,
  warn: toast.TYPE.WARNING,
  default: toast.TYPE.INFO,
};

const useAlert = () => {
  const dispatch = useDispatch();
  const confirmState = useSelector(selector);

  const showToast = (
    type: ToastTypes = 'success',
    message: string | undefined = undefined,
    duration = 5000
  ) => {
    const options = {
      type: messageTypes[type],
      duration,
    };

    toast(message || defaultMessages[type], options);
  };

  const catchToast = ({
    error,
    message,
    showToastMessage = true,
  }: {
    error?: Error | unknown;
    message?: string;
    showToastMessage?: boolean;
  }) => {
    let body;
    let code;
    let errors: ErrorResField[] = [];
    let resultMessage;

    if (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          switch (status) {
            case 400:
              resultMessage = message || data[0].message;
              break;
            case 404:
              resultMessage = message || data.error || data[0].message || error.message;
              break;
            case 422:
              errors = data.errors as ErrorResField[];
              resultMessage = message || data.message || error.message;
              break;
            case 500:
              resultMessage = message || data.message;
              break;
            // another status code here ...
            default:
              break;
          }
          body = data;
          code = status;
        }
      } else {
        resultMessage = message || (error as Error).message;
      }
    } else if (message) {
      resultMessage = message;
    }

    if (showToastMessage && resultMessage) {
      showToast('error', resultMessage);
    }

    return { body, code, errors, resultMessage };
  };

  const getConfirm = ({
    title,
    message,
    acceptText,
    rejectText,
    isCancelable,
    hasRejectHandler,
  }: GetConfirm = {}) => {
    dispatch(
      mutateConfirmData({
        isOpen: true,
        title,
        message,
        acceptText,
        rejectText,
        isCancelable,
      })
    );
    return new Promise((res, rej) => {
      onAcceptedConfirmCallback = res;
      if (hasRejectHandler) {
        onRejectedConfirmCallback = rej;
      }
    });
  };

  const closeConfirm = () => {
    dispatch(mutateIsConfirmModalOpen(false));
  };

  const onAccepted = () => {
    closeConfirm();
    onAcceptedConfirmCallback(true);
  };

  const onRejected = () => {
    closeConfirm();
    if (onRejectedConfirmCallback) {
      onRejectedConfirmCallback(false);
    }
  };

  return {
    getConfirm,
    showToast,
    closeConfirm,
    onAccepted,
    onRejected,
    confirmState,
    catchToast,
  };
};

export type UseAlertReturnType = ReturnType<typeof useAlert>;
export default useAlert;

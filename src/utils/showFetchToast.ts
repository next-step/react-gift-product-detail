import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import axios from "axios";
import { toast, type ToastOptions } from "react-toastify";

const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    whiteSpace: "pre-line",
  },
};

export const showFetchErrorToast = (error: Error, onClose?: () => void) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const statusCode = error.response?.data.data.statusCode as number;
    const message = error.response?.data.data.message as string;
    if (statusCode >= 400 && statusCode < 500) {
      toast.error(message, {
        ...defaultToastOptions,
        onClose: onClose,
      });
    } else if (statusCode >= 500) {
      toast.error(`잠시 후 다시 시도해주세요.\n${message}`, {
        ...defaultToastOptions,
      });
    }
  }
};

export const showFetchSuccessToast = (message: string, onClose?: () => void) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    onClose: onClose,
  });
};

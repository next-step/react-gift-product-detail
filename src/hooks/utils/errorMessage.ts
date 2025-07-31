import {
  ERROR_MSG_ID_EMPTY,
  ERROR_MSG_ID_FORM,
  ERROR_MSG_PASSWORD_EMPTY,
  ERROR_MSG_PASSWORD_FORM,
} from "@/constants/errorMessage";

export const getIdError = (id: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errorMsg: string | null = null;
  if (id.length === 0) errorMsg = ERROR_MSG_ID_EMPTY;
  else if (!emailRegex.test(id)) errorMsg = ERROR_MSG_ID_FORM;
  return errorMsg;
};
export const getPasswordError = (password: string) => {
  let errorMsg: string | null = null;
  if (password.length === 0) errorMsg = ERROR_MSG_PASSWORD_EMPTY;
  else if (password.length < 8) errorMsg = ERROR_MSG_PASSWORD_FORM;
  return errorMsg;
};

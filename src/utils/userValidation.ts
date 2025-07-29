import type { UserInfo } from "../types/auth";

export const isValidUserInfo = (data: unknown): data is UserInfo => {
  return (
    typeof data === "object" &&
    data !== null &&
    "authToken" in data &&
    "email" in data &&
    "name" in data &&
    typeof (data as Record<string, unknown>).authToken === "string" &&
    typeof (data as Record<string, unknown>).email === "string" &&
    typeof (data as Record<string, unknown>).name === "string"
  );
}; 
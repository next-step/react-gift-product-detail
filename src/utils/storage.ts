const USER_KEY = 'user';

export interface UserInfo {
  authToken: string;
  email: string;
  name: string;
}

export const setUserInfo = (user: UserInfo) => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserInfo = (): UserInfo | null => {
  const data = sessionStorage.getItem(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const clearUserInfo = () => {
  sessionStorage.removeItem(USER_KEY);
};

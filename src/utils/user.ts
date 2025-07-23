export const getUserName = (email: string): string => {
  return email.split('@')[0];
};

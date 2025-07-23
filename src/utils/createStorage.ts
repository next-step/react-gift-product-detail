export const createStorage = <T>(key: string) => {
  const get = () => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const set = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const remove = () => {
    sessionStorage.removeItem(key);
  };

  return { get, set, remove };
};

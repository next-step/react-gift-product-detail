import { instance } from './baseUrl';

export const getBasicFetch = async <T>(endpoint: string): Promise<T> => {
  const res = await instance.get(endpoint);
  const data = res.data;
  return data;
};

import { instance } from './baseUrl';

export const getFetch = async <T>(endpoint: string, params = {}): Promise<T> => {
  const res = await instance.get(endpoint, { params });
  const data = res.data;
  return data;
};

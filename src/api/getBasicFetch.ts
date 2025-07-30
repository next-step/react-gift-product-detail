import { instance } from './baseUrl';

export const getBasicFetch = async <T>(endpoint: string, params = {}): Promise<T> => {
  const res = await instance.get(endpoint, { params });
  const data = res.data;
  //TODO
  console.log(data);
  return data;
};

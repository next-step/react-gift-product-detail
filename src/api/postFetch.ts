import { instance } from './baseUrl';

export const PostFetch = async <T, K>(endpoint: string, body: K): Promise<T> => {
  const res = await instance.post(endpoint, body);
  const data = res.data;
  return data;
};

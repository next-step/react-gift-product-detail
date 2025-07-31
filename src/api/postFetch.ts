import { instance } from './baseUrl';

export const PostFetch = async <T, K>(
  endpoint: string,
  body: K,
  head?: {
    headers: {
      Authorization: string;
    };
  }
): Promise<T> => {
  const res = await instance.post(endpoint, body, head);
  const data = res.data;
  return data;
};

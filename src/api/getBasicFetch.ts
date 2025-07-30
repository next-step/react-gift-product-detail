import axios from 'axios';
axios.defaults.baseURL = 'https://api.example.com';

export const getBasicFetch = async (): Promise<T> => {
  const res = await axios.get(BASE_URL + BASIC_ENDPOINT.theme);
  const data = res.data;
  return data;
};

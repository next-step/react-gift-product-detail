import api from '@/lib/axiosInstance';
type Props = {
  email: string;
  password: string;
};
export const FetchLogin = (body: Props) => {

  return api.post('/login', body).then((res) => res.data);
};

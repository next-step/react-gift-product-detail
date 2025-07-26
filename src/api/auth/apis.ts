import apiClient from '../index';

export async function loginApi(email: string, password: string) {
  const response = await apiClient.post('/api/login', {
    email,
    password,
  });
  return response.data.data;
}

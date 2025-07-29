import { apiClient } from '@src/api/FetchData';
import { BASIC_ENDPOINT } from '@src/assets/endpoints';
import type { HttpTypes } from '@src/api/HttpType';

type LoginBody = {
  email: string;
  password: string;
};

export const loginApi = async ({ email, password }: LoginBody) => {
  const apiRequestData = {
    methods: 'POST' as HttpTypes,
    requestName: BASIC_ENDPOINT.login,
    body: { email, password },
    params: '',
    headers: null,
  };

  const response = await apiClient(apiRequestData);
  return response;
};

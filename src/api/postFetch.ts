export type LoginBody = {
  email: string;
  password: string;
};

const PostFetch = async (body: LoginBody) => {
  const response = await axios.post(BASE_URL + BASIC_ENDPOINT.login, body);
  return response.data;
};

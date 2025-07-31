export type HttpsSuccessResponseType = {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
};
export type HttpsFailedResponseTypes = {
  data: {
    message: string;
    status: string;
    statusCode: number;
  };
};
export type LoginBody = {
  email: string;
  password: string;
};

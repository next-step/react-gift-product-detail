import { BE } from "@src/apis/BackEnd/apiEndPoints";
import { http, HttpResponse } from "msw";

export const LOGIN_INVALID_EMAIL_MESSAGE =
  "@kakao.com 이메일 주소만 가능합니다.";

// Ignore password
type LoginBody = {
  email: string;
};

const login = http.post(BE.API.LOGIN.BASE, async ({ request }) => {
  const body = await request.json();
  const { email } = body as LoginBody;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@kakao\.com$/;
  emailRegex.test(email);
  if (!emailRegex.test(email)) {
    return HttpResponse.json(
      {
        data: {
          status: "BAD_REQUEST",
          statusCode: 400,
          message: LOGIN_INVALID_EMAIL_MESSAGE
        }
      },
      { status: 400 }
    );
  }

  return HttpResponse.json({
    data: { email, name: email.split("@")[0], authToken: "dummy-token" }
  });
});

export default login;

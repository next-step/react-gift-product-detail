import { apiBaseUrl } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import type { PostLoginParams } from "@/apis/login/postLogin";
import { http, HttpResponse } from "msw";
import { getIdError, getPasswordError } from "@/hooks/utils/errorMessage";

export const postLoginHandler = [
  http.post(apiBaseUrl + API_ENDPOINTS.LOGIN, async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as PostLoginParams;
    const emailError = getIdError(email);
    const passwordError = getPasswordError(password);

    if (emailError) {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 400,
            message: "올바른 이메일 형식이 아닙니다.",
          },
        },
        { status: 400 },
      );
    }
    if (!emailError && email.split("@")[1] !== "kakao.com") {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 400,
            message: "@kakao.com 이메일 주소만 가능합니다.",
          },
        },
        { status: 400 },
      );
    }
    if (passwordError) {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 400,
            message: "비밀번호는 최소 8자 이상이어야 합니다.",
          },
        },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      data: {
        email: email,
        name: email.split("@")[0],
        authToken: "dummy-token",
      },
    });
  }),
];

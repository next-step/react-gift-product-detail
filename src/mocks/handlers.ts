import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";

export const handlers = [
  http.post(API_ENDPOINTS.LOGIN, async ({ request }) => {
    const { email } = (await request.json()) as { email: string };

    if (email === "test@kakao.com") {
      return HttpResponse.json({
        email: "test@kakao.com",
        name: "테스트유저",
        authToken: "fake-auth-token",
      });
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Bad Request",
      });
    }
  }),
];

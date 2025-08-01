import { apiBaseUrl } from "@/apis/instance";
import API_ENDPOINTS from "@/constants/apiEndpoints";
import { http, HttpResponse } from "msw";
import type { PostOrderParams } from "./postOrder";

export const postOrderHandler = [
  http.post(apiBaseUrl + API_ENDPOINTS.ORDER, async ({ request }) => {
    const body = await request.json();
    const { productId, message, messageCardId, ordererName, receivers } = body as PostOrderParams;

    const authorization = request.headers.get("Authorization");

    const isValidReceivers = Boolean(
      receivers && receivers.every((receiver) => receiver.name && receiver.phoneNumber && receiver.quantity > 0),
    );
    const isValidOrder = Boolean(productId > 0 && message && messageCardId && ordererName && isValidReceivers);

    if (authorization !== "dummy-token") {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 401,
            message: "로그인이 필요합니다.",
          },
        },
        { status: 401 },
      );
    }

    if (receivers.length === 0) {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 400,
            message: "받는 사람이 없습니다",
          },
        },
        { status: 400 },
      );
    }

    if (!isValidOrder || !isValidReceivers) {
      return HttpResponse.json(
        {
          data: {
            status: "BAD_REQUEST",
            statusCode: 400,
            message: "유효성 검사 실패",
          },
        },
        { status: 400 },
      );
    }
    return HttpResponse.json({
      data: {
        success: true,
      },
    });
  }),
];

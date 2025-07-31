import { category } from "@/__mock__/category";
import { mockRankingProduct } from "@/__mock__/mock-ranking-product";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/api/products/ranking", ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get("targetType") || "ALL";
    const rankType = url.searchParams.get("rankType") || "MANY_WISH";

    if (targetType === "TEEN" && rankType === "MANY_WISH_RECEIVE") {
      return HttpResponse.json({
        data: [],
      });
    }

    let startIndex = 0;

    switch (targetType) {
      case "FEMALE":
        startIndex = 0;
        break;
      case "MALE":
        startIndex = 5;
        break;
      case "TEEN":
        startIndex = 10;
        break;
      default:
        startIndex = 15;
    }

    switch (rankType) {
      case "MANY_RECEIVE":
        startIndex += 1;
        break;
      case "MANY_WISH_RECEIVE":
        startIndex += 2;
        break;
      default:
    }

    const data = mockRankingProduct.slice(startIndex, startIndex + 5);

    return HttpResponse.json({
      data: data.length > 0 ? data : mockRankingProduct.slice(0, 5),
    });
  }),
  http.get("http://localhost:3000/api/themes", () => {
    return HttpResponse.json({
      data: category,
    });
  }),
];

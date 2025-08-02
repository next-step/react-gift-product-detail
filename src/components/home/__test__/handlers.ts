import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products/ranking", ({ request }) => {
    const url = new URL(request.url);
    const targetType = url.searchParams.get("targetType");
    const rankType = url.searchParams.get("rankType");

    console.log("📦 MSW intercepted:", request.url);
    console.log("🔍 Parsed params:", { targetType, rankType });

    if (targetType === "ALL" && rankType === "MANY_WISH") {
      return HttpResponse.json({data: [
        {
          id: 11712379,
          name: "부드러운 고구마 라떼 케이크",
          price: {
            basicPrice: 31000,
            sellingPrice: 26350,
            discountRate: 15,
          },
          imageURL:
            "https://st.kakaocdn.net/product/gift/product/20250218142602_030fce0196af42189694554c03a54fbb.jpg",
          brandInfo: {
            id: 27,
            name: "뚜레쥬르",
            imageURL:
              "https://st.kakaocdn.net/product/gift/gift_brand/20250331162129_e8de4166853848729c5abad9834405b0.jpg",
          },
        },
      ]});
    }

    return HttpResponse.json([]);
  }),
];

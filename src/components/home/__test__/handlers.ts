import { http } from "msw";

export const handlers = [
  http.get("/api/products/ranking", () => {
    return new Response(
      JSON.stringify([
        {
          id: 1,
          name: "노트북",
          imageURL: "https://example.com/image.jpg",
          brandInfo: { name: "카카오프렌즈" },
          price: { sellingPrice: 5000 },
        },
      ]),
      { status: 200 }
    );
  }),
];

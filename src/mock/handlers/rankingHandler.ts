import { rest } from "msw";

export const rankingItems = [
  {
    id: 11526198,
    name: "스트로베리 초콜릿 생크림",
    price: {
      basicPrice: 39000,
      sellingPrice: 39000,
      discountRate: 0,
    },
    imageURL: "https://example.com/image.jpg",
    brandInfo: {
      id: 33,
      name: "투썸플레이스",
      imageURL: "https://example.com/brand.jpg",
    },
  },
];

export const getRankingHandler = rest.get(
  new RegExp("/api/products/ranking.*"),
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: rankingItems }));
  }
);

export const getRankingErrorHandler = rest.get(
  new RegExp("/api/products/ranking.*"),
  (_req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "server error" }));
  }
);

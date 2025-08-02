import type { UserInfo } from "@/api/auth";
import type { Product } from "@/api/products";
import { http, HttpResponse } from "msw";

const mockUser: UserInfo = {
  authToken: "mocked-jwt-token",
  name: "홍길동",
  email: "test@kakao.com",
};

const mockProduct: Product = {
  id: 1,
  name: "테스트 상품",
  imageURL: "https://via.placeholder.com/150",
  price: {
    basicPrice: 10000,
    sellingPrice: 8000,
    discountRate: 20,
  },
  brandInfo: {
    id: 1,
    name: "테스트 브랜드",
    imageURL: "https://via.placeholder.com/150",
  },
};

export const handlers = [
  http.get("/api/products/ranking", () => {
    return HttpResponse.json({
      data: [mockProduct],
    });
  }),
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email === "test@kakao.com" && body.password === "password123") {
      return HttpResponse.json({ data: mockUser }, { status: 200 });
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),
];

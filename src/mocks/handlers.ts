import { http, HttpResponse } from "msw"
import ProductsResponseSingle from "@/interfaces/ProductResponseSingle"
const productMock = {
  id: 11526198,
  name: "스트로베리 초콜릿 생크림",
  price: 39_000,
  imageURL:
    "https://st.kakaocdn.net/product/gift/product/20250415092419_5f7f5c5c78644f27afe3525fb512ec46.jpg",
  brandName: "투썸플레이스",
} satisfies ProductsResponseSingle["data"]

export const handlers = [
  http.get("/api/products/:id/summary", ({ params }) =>
    HttpResponse.json({ data: { ...productMock, id: Number(params.id) } })
  ),
]

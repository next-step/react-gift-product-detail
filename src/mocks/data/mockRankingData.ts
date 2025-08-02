export const RankingMockData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `상품 ${i + 1}`,
  imageURL: `https://example.com/item${i + 1}.jpg`,
  brandInfo: { name: `브랜드 ${i + 1}` },
  price: { sellingPrice: 10000 + i * 1000, discountRate: 0 },
}));
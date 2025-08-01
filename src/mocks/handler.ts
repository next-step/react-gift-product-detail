import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products/ranking', ({ request }) => {
    const url = new URL(request.url);
    const rankType = url.searchParams.get('rankType');
    const targetType = url.searchParams.get('targetType');

    if (rankType === 'BIRTHDAY' && targetType === 'FEMALE') {

      const mockData = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `상품 ${i + 1}`,
        imageURL: `https://example.com/item${i + 1}.jpg`,
        brandInfo: { name: `브랜드 ${i + 1}` },
        price: { sellingPrice: 10000 + i * 1000, discountRate: 0 },
      }));

      return HttpResponse.json({ data: mockData });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];

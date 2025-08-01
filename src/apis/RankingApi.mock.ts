import { http } from 'msw';

export const fetchRankingHandlers = [
  http.get('/api/products/ranking', (req, res, ctx) => {
    try {
      console.log('🟡 핸들러 진입');

      // req.url은 string이므로 그대로 사용
      const url = new URL(req.url, 'http://localhost');
      const targetType = url.searchParams.get('targetType');
      const rankType = url.searchParams.get('rankType');

      console.log('➡️ 요청 URL:', url.href);
      console.log('➡️ targetType:', targetType);
      console.log('➡️ rankType:', rankType);

      const isValidTarget = targetType === 'ALL' || targetType === null || targetType === undefined;
      const isValidRank =
        rankType === 'MANY_RECEIVE' || rankType === null || rankType === undefined;

      if (isValidTarget && isValidRank) {
        console.log('✅ 파라미터 오케이 — 응답 반환');

        return res(
          ctx.status(200),
          ctx.json({
            data: [
              {
                id: 11526198,
                name: '스트로베리 초콜릿 생크림',
                price: {
                  basicPrice: 39000,
                  sellingPrice: 39000,
                  discountRate: 0,
                },
                imageURL:
                  'https://st.kakaocdn.net/product/gift/product/20250415092419_5f7f5c5c78644f27afe3525fb512ec46.jpg',
                brandInfo: {
                  id: 33,
                  name: '투썸플레이스',
                  imageURL:
                    'https://st.kakaocdn.net/product/gift/gift_brand/20240318104050_6ad6dbbadf2b4acd860e549d5c0fcc5e.png',
                },
              },
            ],
          })
        );
      }

      console.log('❌ 파라미터 불일치 — 빈 응답');
      return res(ctx.status(200), ctx.json({ data: [] }));
    } catch (err) {
      console.error('🔥 핸들러 오류 발생:', err);
      return res(ctx.status(500), ctx.json({ message: 'internal mock error' }));
    }
  }),
];

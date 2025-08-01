// src/hooks/useProductRanking.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

import { useProductRanking } from './useProductRanking';
import type {
  ProductData,
  ProductRankingFilterOption,
} from '@/types/products';

// 1) axios 전체를 mock
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// 2) 테스트 전용 컴포넌트
function HookTester({
  filter,
  onChange,
}: {
  filter: ProductRankingFilterOption;
  onChange: (value: any) => void;
}) {
  const result = useProductRanking(filter);
  React.useEffect(() => {
    onChange(result);
  }, [result, onChange]);
  return null;
}

describe('useProductRanking 훅', () => {
  it('axios 응답 데이터를 그대로 반환하고 isSuccess가 true가 된다', async () => {
    // --- 더미 필터 (타입에 맞춰 선언) ---
    const dummyFilter: ProductRankingFilterOption = {
      targetType: 'ALL',
      rankType: 'MANY_WISH',
    };

    const dummyData: ProductData[] = [
      {
        id: 1,
        name: '상품1',
        imageURL: 'https://example.com/1.png',
        price: { basicPrice: 1000, discountRate: 10, sellingPrice: 900 },
        brandInfo: { id: 10, name: '브랜드A', imageURL: 'https://example.com/brandA.png' },
      },
      {
        id: 2,
        name: '상품2',
        imageURL: 'https://example.com/2.png',
        price: { basicPrice: 2000, discountRate: 20, sellingPrice: 1600 },
        brandInfo: { id: 20, name: '브랜드B', imageURL: 'https://example.com/brandB.png' },
      },
    ];

    // --- axios.get mock 설정 ---
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: dummyData },
    });

    // --- react-query 클라이언트 준비 ---
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    let current: any;
    render(
      <QueryClientProvider client={queryClient}>
        <HookTester filter={dummyFilter} onChange={(res) => (current = res)} />
      </QueryClientProvider>
    );

    // isSuccess가 true가 될 때까지 기다린다
    await waitFor(() => expect(current.isSuccess).toBe(true));

    // 반환된 데이터가 mock된 dummyData와 동일한지 검증
    expect(current.data).toEqual(dummyData);
  });
});

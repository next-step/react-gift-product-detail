import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

import GiftRankingList from './GiftRankingList';
import { RankType, TargetType } from '@/type/giftRanking';

const queryClient = new QueryClient();

describe('GiftRankingList', () => {
  test('mock 데이터를 잘 렌더링하는지 확인', async () => {
    render(
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>Loading</div>}>
            <GiftRankingList
              rankType={RankType.MANY_WISH}
              targetType={TargetType.ALL}
            />
          </Suspense>
        </QueryClientProvider>
    );

    const loading = screen.getByText('Loading');
    expect(loading).toBeInTheDocument();

    //await screen.findByText(/bbq/i);

  });
});

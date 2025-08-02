import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { GiftList } from '../GiftList';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme';
import { MemoryRouter } from 'react-router-dom';
import { UserInfoProvider } from '@/providers/UserInfoProvider';
import * as filterHook from '@/hooks/useSelectedFilter';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        throwOnError: true,
      },
    },
  });

const renderGiftList = () => {
  return render(
    <QueryClientProvider client={createTestQueryClient()}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <UserInfoProvider>
            <GiftList />
          </UserInfoProvider>
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const targetButtons = {
  ALL: /전체/i,
  FEMALE: /여성이/i,
  MALE: /남성이/i,
  TEEN: /청소년/i,
};

const rankButtons = {
  MANY_WISH: /받고 싶어한/i,
  MANY_RECEIVE: /많이 선물한/i,
  MANY_WISH_RECEIVE: /위시로 받은/i,
};

const targetLabels: Record<keyof typeof targetButtons, string> = {
  ALL: '전체',
  FEMALE: '여성',
  MALE: '남성',
  TEEN: '청소년',
};

const rankLabels: Record<keyof typeof rankButtons, string> = {
  MANY_WISH: '받고 싶어한',
  MANY_RECEIVE: '많이 선물한',
  MANY_WISH_RECEIVE: '위시로 받은',
};

const expectedTexts: Record<string, RegExp> = {
  'ALL-MANY_WISH': /부드러운 고구마 라떼 케이크/i,
  'ALL-MANY_RECEIVE': /시그니처 생딸기 우유생크림케이크/i,
  'ALL-MANY_WISH_RECEIVE': /피치 생크림 케이크/i,
  'FEMALE-MANY_WISH': /맛초킹\+치즈볼\+콜라1\.25L/i,
  'FEMALE-MANY_RECEIVE': /황올반\+BBQ양념반\+콜라1\.25L/i,
  'FEMALE-MANY_WISH_RECEIVE': /허니콤보웨지감자세트/i,
  'MALE-MANY_WISH': /카라멜마끼아또 ICE/i,
  'MALE-MANY_RECEIVE': /나눠먹는 와츄원/i,
  'MALE-MANY_WISH_RECEIVE': /파인트 아이스크림/i,
  'TEEN-MANY_WISH': /상품이 없습니다./i,
  'TEEN-MANY_RECEIVE': /상품이 없습니다./i,
  'TEEN-MANY_WISH_RECEIVE': /상품이 없습니다./i,
};

const combinations: [keyof typeof targetButtons, keyof typeof rankButtons][] = [
  ['ALL', 'MANY_WISH'],
  ['ALL', 'MANY_RECEIVE'],
  ['ALL', 'MANY_WISH_RECEIVE'],
  ['FEMALE', 'MANY_WISH'],
  ['FEMALE', 'MANY_RECEIVE'],
  ['FEMALE', 'MANY_WISH_RECEIVE'],
  ['MALE', 'MANY_WISH'],
  ['MALE', 'MANY_RECEIVE'],
  ['MALE', 'MANY_WISH_RECEIVE'],
  ['TEEN', 'MANY_WISH'],
  ['TEEN', 'MANY_RECEIVE'],
  ['TEEN', 'MANY_WISH_RECEIVE'],
];

describe('GiftList 전체 카테고리 조합 테스트', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const selectFilters = async (
    target: keyof typeof targetButtons,
    rank: keyof typeof rankButtons
  ) => {
    if (!(target === 'ALL' && rank === 'MANY_WISH')) {
      const targetBtn = await screen.findByRole('button', { name: targetButtons[target] });
      fireEvent.click(targetBtn);

      const rankBtn = await screen.findByRole('button', { name: rankButtons[rank] });
      fireEvent.click(rankBtn);
    }
  };

  combinations.forEach(([target, rank]) => {
    const title = `${targetLabels[target]} + ${rankLabels[rank]}`;

    it(title, async () => {
      vi.spyOn(filterHook, 'useSelectedFilter').mockReturnValue({
        targetType: target,
        setTargetType: vi.fn(),
        rankType: rank,
        setRankType: vi.fn(),
      });

      renderGiftList();

      await selectFilters(target, rank);

      await waitFor(() => {
        const key = `${target}-${rank}`;
        expect(screen.getByText(expectedTexts[key])).toBeInTheDocument();
      });
    });
  });
});

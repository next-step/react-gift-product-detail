import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, beforeEach, expect } from 'vitest';
import { GiftList } from '../GiftList';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme';
import { MemoryRouter } from 'react-router-dom';
import { UserInfoProvider } from '@/providers/UserInfoProvider';

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

describe('GiftList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('ALL_MANY_WISH 데이터 로드 후 첫 번째 아이템이 표시', async () => {
    renderGiftList();
    await waitFor(() => {
      expect(screen.getByText(/부드러운 고구마 라떼 케이크/i)).toBeInTheDocument();
    });
  });

  it('FEMALE_MANY_WISH 데이터로 변경', async () => {
    renderGiftList();

    const femaleBtn = await screen.findByRole('button', { name: /여성이/i });
    fireEvent.click(femaleBtn);

    await waitFor(() => {
      expect(screen.getByText(/맛초킹\+치즈볼\+콜라1\.25L/i)).toBeInTheDocument();
    });
  });

  it('MALE_MANY_WISH 데이터로 변경', async () => {
    renderGiftList();

    const maleBtn = await screen.findByRole('button', { name: /남성이/i });
    fireEvent.click(maleBtn);

    await waitFor(() => {
      expect(screen.getByText(/카라멜마끼아또 ICE/i)).toBeInTheDocument();
    });
  });

  it('TEEN 선택 시, "상품이 없습니다." 문구 출력', async () => {
    renderGiftList();

    const teenBtn = await screen.findByRole('button', { name: /청소년/i });
    fireEvent.click(teenBtn);

    await waitFor(() => {
      expect(screen.getByText(/상품이 없습니다./i)).toBeInTheDocument();
    });
  });

  it('MANY_RECEIVE로 변경 시, FEMALE_MANY_RECEIVE 데이터 출력', async () => {
    localStorage.setItem('currentTarget', 'FEMALE');
    renderGiftList();

    const receiveBtn = await screen.findByRole('button', { name: /많이 선물한/i });
    fireEvent.click(receiveBtn);

    await waitFor(() => {
      expect(screen.getByText(/황올반\+BBQ양념반\+콜라1\.25L/i)).toBeInTheDocument();
    });
  });

  it('MANY_WISH_RECEIVE로 변경 시, MALE_MANY_WISH_RECEIVE 데이터가 출력', async () => {
    localStorage.setItem('currentTarget', 'MALE');
    renderGiftList();

    const wishReceiveBtn = await screen.findByRole('button', { name: /위시로 받은/i });
    fireEvent.click(wishReceiveBtn);

    await waitFor(() => {
      expect(screen.getByText(/파인트 아이스크림/i)).toBeInTheDocument();
    });
  });
});

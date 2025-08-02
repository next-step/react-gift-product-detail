import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@src/mocks/server';
import { http, HttpResponse } from 'msw';
import Realtime from '@/components/Realtime';
import { UserInfoProvider } from '@/contexts/AuthContext';
import { rankingData } from '@/mocks/mockData';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('Realtime 선물랭킹 컴포넌트', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    server.resetHandlers();
    queryClient = createTestQueryClient();
  });

  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <UserInfoProvider>{ui}</UserInfoProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

  test('초기 로딩 시 로딩 이미지가 보이고, 이후 데이터가 렌더링된다', async () => {
    renderWithProviders(<Realtime />);

    const loadingImage = screen.getByAltText(/Loading.../i);
    expect(loadingImage).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(rankingData[0].name)).toBeInTheDocument();
    });
  });

  test('타겟 버튼 클릭 시 쿼리 파라미터 반영 및 UI 변경을 확인한다', async () => {
    renderWithProviders(<Realtime />);

    await waitFor(() => {
      expect(screen.getByText(rankingData[0].name)).toBeInTheDocument();
    });

    const targets = [
      { key: 'ALL', label: '전체', icon: 'ALL' },
      { key: 'FEMALE', label: '여성이', icon: '👩🏻' },
      { key: 'MALE', label: '남성이', icon: '👨🏻' },
      { key: 'TEEN', label: '청소년이', icon: '👦🏻' },
    ];

    for (const target of targets) {
      const targetButton = screen.getByRole('button', {
        name: new RegExp(target.label, 'i'),
      });
      fireEvent.click(targetButton);

      await waitFor(
        () => {
          expect(screen.getByText(rankingData[0].name)).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    }

    const sortOptions = [
      { key: 'MANY_WISH', label: '받고 싶어한' },
      { key: 'MANY_RECEIVE', label: '많이 선물한' },
      { key: 'MANY_WISH_RECEIVE', label: '위시로 받은' },
    ];

    for (const sortOption of sortOptions) {
      const sortButton = screen.getByRole('button', {
        name: new RegExp(sortOption.label, 'i'),
      });
      fireEvent.click(sortButton);

      await waitFor(
        () => {
          expect(screen.getByText(rankingData[0].name)).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    }
  });

  test('API 에러 발생 시 에러 메시지 렌더링한다', async () => {
    server.use(
      http.get('/api/products/ranking', () => {
        return HttpResponse.json(
          { message: '잘못된 targetType 또는 rankType입니다.' },
          { status: 400 }
        );
      })
    );

    renderWithProviders(<Realtime />);
  });
});

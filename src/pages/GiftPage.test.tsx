import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GiftPage } from './GiftPage';

const queryClient = new QueryClient();

describe('GiftPage', () => {
  test('MSW를 사용하여 랭킹 데이터를 불러와 표시한다.', async () => {
    // Given: GiftPage를 렌더링하면
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider>
            <GiftPage />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // When: API 통신이 완료되면
    // Then: MSW 핸들러에서 정의한 가짜 상품 이름이 화면에 나타나야 한다.
    const product1 = await screen.findByText('테스트 상품 1');
    const product2 = await screen.findByText('테스트 상품 2');

    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });
});

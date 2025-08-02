import { renderWithProviders } from '@test/utils/renderWithProviders';
import RankingSection from '../RankingSection';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '@mock/server';
import { rankingErrorHandler } from '@mock/handlers';

describe('RankingSection', () => {
  it('API에서 데이터 받아와 렌더링', async () => {
    renderWithProviders(<RankingSection />);
    await waitFor(() => {
      //첫 상품의 이름이 있는지 확인
      expect(screen.getByText('케이크')).toBeInTheDocument();
      //첫 상품의 랭킹 뱃지가 있는지 확인
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    //초기 6개 상품과 더보기 버튼이 있는지 확인
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByRole('button', { name: '더보기' })).toBeInTheDocument();
  });

  it('더보기 클릭시 상품 목록 확장, 접기 클릭시 다시 축소', async () => {
    renderWithProviders(<RankingSection />);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: '더보기' })
      ).toBeInTheDocument();
    });

    const expandButton = screen.getByRole('button', { name: '더보기' });
    await userEvent.click(expandButton);

    await waitFor(() => {
      //전체 상품 7개가 보이는지 확인
      expect(screen.getAllByRole('article')).toHaveLength(7);
      expect(screen.getByRole('button', { name: '접기' }));
    });
  });

  it('API 요청 실패시 에러 메시지 보여주기', async () => {
    server.use(rankingErrorHandler);
    renderWithProviders(<RankingSection />);

    await waitFor(() => {
      const errorMessage = screen.getByText('오류가 발생했습니다.');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { customRender } from './utils';
import GiftRankingFilter from '../components/home/GiftRankingFilter';

const renderComponent = () => {
  customRender(
    <BrowserRouter>
      <GiftRankingFilter />
    </BrowserRouter>
  );
};

describe('GiftRankingFilter (실시간 선물랭킹)', () => {
  beforeEach(() => {
    renderComponent();
  });

  it('초기 렌더링 시 기본 필터/탭에 해당하는 랭킹이 표시된다', async () => {
    expect(
      await screen.findByText('기본 선물 1')
    ).toBeInTheDocument();
    expect(screen.getByText('기본 선물 2')).toBeInTheDocument();
  });

  it('남성 필터 클릭 시 남성 랭킹으로 바뀐다', async () => {
    fireEvent.click(screen.getByText('남성'));

    await waitFor(() => {
      expect(screen.getByText('남성 선물 1')).toBeInTheDocument();
      expect(screen.getByText('남성 선물 2')).toBeInTheDocument();
    });
  });

  it('탭 변경 시 API가 다시 호출되어 데이터가 변경된다', async () => {
    fireEvent.click(screen.getByText('남성'));

    fireEvent.click(screen.getByText('많이 선물한'));

    await waitFor(() => {
      expect(screen.getByText('남성 선물 1')).toBeInTheDocument();
    });
  });
});

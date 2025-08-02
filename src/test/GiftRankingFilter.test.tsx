import { screen, fireEvent } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  beforeEach,
  afterAll,
  afterEach,
  beforeAll,
} from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { customRender } from './utils';
import GiftRankingFilter from '../components/home/GiftRankingFilter';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const mockApi = setupServer(
  http.get('/api/gift-ranking', ({ request }) => {
    const url = new URL(request.url);
    const gender = url.searchParams.get('gender');
    const sort = url.searchParams.get('sort');

    if (gender === 'male' && sort === 'popular') {
      return HttpResponse.json([
        { id: 1, name: '남성 인기 선물 A' },
        { id: 2, name: '남성 인기 선물 B' },
      ]);
    }

    if (gender === 'male') {
      return HttpResponse.json([
        { id: 1, name: '남성 선물 1' },
        { id: 2, name: '남성 선물 2' },
      ]);
    }

    return HttpResponse.json([
      { id: 1, name: '기본 선물 1' },
      { id: 2, name: '기본 선물 2' },
    ]);
  })
);

beforeAll(() => mockApi.listen());
afterEach(() => mockApi.resetHandlers());
afterAll(() => mockApi.close());

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

  it('초기 렌더링 시 기본 랭킹 목록이 표시된다', async () => {
    expect(
      await screen.findByText('기본 선물 1')
    ).toBeInTheDocument();
    expect(screen.getByText('기본 선물 2')).toBeInTheDocument();
  });

  it('남성 필터 클릭 시 남성 랭킹 목록이 표시된다', async () => {
    fireEvent.click(screen.getByText('남성'));

    expect(
      await screen.findByText('남성 선물 1')
    ).toBeInTheDocument();
    expect(screen.getByText('남성 선물 2')).toBeInTheDocument();
  });

  it('남성 필터 상태에서 "많이 선물한" 탭 클릭 시 정렬된 랭킹이 표시된다', async () => {
    fireEvent.click(screen.getByText('남성'));
    fireEvent.click(screen.getByText('많이 선물한'));

    expect(
      await screen.findByText('남성 인기 선물 A')
    ).toBeInTheDocument();
    expect(screen.getByText('남성 인기 선물 B')).toBeInTheDocument();
  });
});

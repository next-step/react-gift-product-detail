import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductList from '../ProductList';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock API data
const mockProducts = [
  {
    id: 1,
    name: '트렌딩 선물 1',
    price: {
      basicPrice: 60000,
      sellingPrice: 50000,
      discountRate: 17,
    },
    imageURL: '/images/gift1.jpg',
    brandInfo: {
      id: 1,
      name: '브랜드1',
      imageURL: '/images/brand1.jpg',
    },
    themeIds: [1, 2],
  },
  {
    id: 2,
    name: '트렌딩 선물 2',
    price: {
      basicPrice: 40000,
      sellingPrice: 30000,
      discountRate: 25,
    },
    imageURL: '/images/gift2.jpg',
    brandInfo: {
      id: 2,
      name: '브랜드2',
      imageURL: '/images/brand2.jpg',
    },
    themeIds: [2, 3],
  },
  {
    id: 3,
    name: '트렌딩 선물 3',
    price: {
      basicPrice: 80000,
      sellingPrice: 70000,
      discountRate: 13,
    },
    imageURL: '/images/gift3.jpg',
    brandInfo: {
      id: 3,
      name: '브랜드3',
      imageURL: '/images/brand3.jpg',
    },
    themeIds: [1, 3],
  },
  {
    id: 4,
    name: '트렌딩 선물 4',
    price: {
      basicPrice: 90000,
      sellingPrice: 80000,
      discountRate: 11,
    },
    imageURL: '/images/gift4.jpg',
    brandInfo: {
      id: 4,
      name: '브랜드4',
      imageURL: '/images/brand4.jpg',
    },
    themeIds: [1, 4],
  },
  {
    id: 5,
    name: '트렌딩 선물 5',
    price: {
      basicPrice: 100000,
      sellingPrice: 90000,
      discountRate: 10,
    },
    imageURL: '/images/gift5.jpg',
    brandInfo: {
      id: 5,
      name: '브랜드5',
      imageURL: '/images/brand5.jpg',
    },
    themeIds: [2, 5],
  },
  {
    id: 6,
    name: '트렌딩 선물 6',
    price: {
      basicPrice: 110000,
      sellingPrice: 100000,
      discountRate: 9,
    },
    imageURL: '/images/gift6.jpg',
    brandInfo: {
      id: 6,
      name: '브랜드6',
      imageURL: '/images/brand6.jpg',
    },
    themeIds: [3, 6],
  },
  {
    id: 7,
    name: '트렌딩 선물 7',
    price: {
      basicPrice: 120000,
      sellingPrice: 110000,
      discountRate: 8,
    },
    imageURL: '/images/gift7.jpg',
    brandInfo: {
      id: 7,
      name: '브랜드7',
      imageURL: '/images/brand7.jpg',
    },
    themeIds: [4, 7],
  },
];

describe('ProductList 컴포넌트 (MSW 테스트)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('트렌딩 선물 랭킹 데이터가 올바르게 렌더링되어야 한다', () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText('트렌딩 선물 1')).toBeInTheDocument();
    expect(screen.getByText('트렌딩 선물 2')).toBeInTheDocument();
    expect(screen.getByText('트렌딩 선물 3')).toBeInTheDocument();
  });

  it('랭킹 배지가 올바르게 표시되어야 한다', () => {
    render(<ProductList products={mockProducts} />);

    // 1등, 2등, 3등 배지 확인
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('상품 가격이 올바르게 표시되어야 한다', () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText('50,000 원')).toBeInTheDocument();
    expect(screen.getByText('30,000 원')).toBeInTheDocument();
    expect(screen.getByText('70,000 원')).toBeInTheDocument();
  });

  it('상품 클릭 시 상품 상세 페이지로 이동해야 한다', () => {
    render(<ProductList products={mockProducts} />);

    const firstProduct = screen.getByText('트렌딩 선물 1');
    fireEvent.click(firstProduct.closest('li')!);

    expect(mockNavigate).toHaveBeenCalledWith('/products/1');
  });

  it('더보기 버튼이 올바르게 작동해야 한다', () => {
    render(<ProductList products={mockProducts} />);

    const moreButton = screen.getByText('더보기');
    expect(moreButton).toBeInTheDocument();

    fireEvent.click(moreButton);

    // 접기 버튼으로 변경되어야 함
    expect(screen.getByText('접기')).toBeInTheDocument();
  });

  it('접기 버튼이 올바르게 작동해야 한다', () => {
    render(<ProductList products={mockProducts} />);

    const moreButton = screen.getByText('더보기');
    fireEvent.click(moreButton);

    const foldButton = screen.getByText('접기');
    fireEvent.click(foldButton);

    // 더보기 버튼으로 다시 변경되어야 함
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  it('상품 이미지가 올바르게 표시되어야 한다', () => {
    render(<ProductList products={mockProducts} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6); // DEFAULT_VISIBLE = 6이므로 6개가 표시됨

    // 각 이미지의 alt 텍스트 확인 (처음 3개만)
    expect(images[0]).toHaveAttribute('alt', '트렌딩 선물 1');
    expect(images[1]).toHaveAttribute('alt', '트렌딩 선물 2');
    expect(images[2]).toHaveAttribute('alt', '트렌딩 선물 3');
  });

  it('showRank가 false일 때 랭킹 배지가 표시되지 않아야 한다', () => {
    render(<ProductList products={mockProducts} showRank={false} />);

    expect(screen.queryByText('1')).toBeNull();
    expect(screen.queryByText('2')).toBeNull();
    expect(screen.queryByText('3')).toBeNull();
  });
});

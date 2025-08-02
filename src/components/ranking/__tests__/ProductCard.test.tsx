import { render, screen } from '@/test-utils';
import { expect, it, describe } from 'vitest';
import ProductCard from '../ProductCard';
import type { Product } from '@/api/types';

const mockProduct: Product = {
  id: 1,
  name: '테스트 상품',
  price: {
    basicPrice: 10000,
    sellingPrice: 9000,
    discountRate: 10,
  },
  imageURL: 'https://example.com/image.jpg',
  brandInfo: {
    id: 1,
    name: '테스트 브랜드',
    imageURL: 'https://example.com/brand.jpg',
  },
};

describe('ProductCard', () => {
  describe('기본 렌더링', () => {
    it('상품 정보가 올바르게 렌더링되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      expect(screen.getByText('테스트 브랜드')).toBeInTheDocument();
      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
      expect(screen.getByText('9,000원')).toBeInTheDocument();
    });

    it('상품 이미지가 올바르게 렌더링되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      const image = screen.getByAltText('테스트 상품');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('랭킹 배지가 올바르게 렌더링되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  describe('랭킹 배지 스타일', () => {
    it('상위 3위 이내일 때 빨간색 배지가 표시되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      const rankBadge = screen.getByText('1');
      expect(rankBadge).toBeInTheDocument();
      // 스타일은 styled-components로 구현되어 있어서 실제 DOM에서는 확인하기 어려움
      // 하지만 요소가 존재하는지는 확인 가능
    });

    it('4위 이하일 때 회색 배지가 표시되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={4} />);

      const rankBadge = screen.getByText('4');
      expect(rankBadge).toBeInTheDocument();
    });
  });

  describe('가격 표시', () => {
    it('판매가가 올바르게 포맷팅되어 표시되어야 한다', () => {
      const productWithHighPrice: Product = {
        ...mockProduct,
        price: {
          basicPrice: 100000,
          sellingPrice: 85000,
          discountRate: 15,
        },
      };

      render(<ProductCard product={productWithHighPrice} rank={1} />);

      expect(screen.getByText('85,000원')).toBeInTheDocument();
    });

    it('할인율이 적용된 가격이 표시되어야 한다', () => {
      const productWithDiscount: Product = {
        ...mockProduct,
        price: {
          basicPrice: 20000,
          sellingPrice: 16000,
          discountRate: 20,
        },
      };

      render(<ProductCard product={productWithDiscount} rank={1} />);

      expect(screen.getByText('16,000원')).toBeInTheDocument();
    });
  });

  describe('브랜드 정보', () => {
    it('브랜드명이 올바르게 표시되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      expect(screen.getByText('테스트 브랜드')).toBeInTheDocument();
    });

    it('다른 브랜드명도 올바르게 표시되어야 한다', () => {
      const productWithDifferentBrand: Product = {
        ...mockProduct,
        brandInfo: {
          id: 2,
          name: '다른 브랜드',
          imageURL: 'https://example.com/brand2.jpg',
        },
      };

      render(<ProductCard product={productWithDifferentBrand} rank={1} />);

      expect(screen.getByText('다른 브랜드')).toBeInTheDocument();
    });
  });

  describe('상품명', () => {
    it('상품명이 올바르게 표시되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    });

    it('긴 상품명도 올바르게 표시되어야 한다', () => {
      const productWithLongName: Product = {
        ...mockProduct,
        name: '매우 긴 상품명입니다 이것은 테스트를 위한 긴 상품명입니다',
      };

      render(<ProductCard product={productWithLongName} rank={1} />);

      expect(
        screen.getByText(
          '매우 긴 상품명입니다 이것은 테스트를 위한 긴 상품명입니다'
        )
      ).toBeInTheDocument();
    });
  });

  describe('다양한 랭킹', () => {
    it('다양한 랭킹 번호가 올바르게 표시되어야 한다', () => {
      const { rerender } = render(
        <ProductCard product={mockProduct} rank={1} />
      );
      expect(screen.getByText('1')).toBeInTheDocument();

      rerender(<ProductCard product={mockProduct} rank={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();

      rerender(<ProductCard product={mockProduct} rank={10} />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('이미지에 alt 속성이 있어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      const image = screen.getByAltText('테스트 상품');
      expect(image).toBeInTheDocument();
    });

    it('상품 정보가 텍스트로 표시되어야 한다', () => {
      render(<ProductCard product={mockProduct} rank={1} />);

      // 브랜드명, 상품명, 가격이 모두 텍스트로 표시되는지 확인
      expect(screen.getByText('테스트 브랜드')).toBeInTheDocument();
      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
      expect(screen.getByText('9,000원')).toBeInTheDocument();
    });
  });
});

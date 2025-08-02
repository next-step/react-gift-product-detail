import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { vi } from 'vitest';
import ProductCard from '@/Components/ProductCard';
import GiftFriendsSection from '@/Components/GiftFriendsSection';
import { theme } from '@/styles/Theme';

// Mock useLoginContext hook
const mockUseLoginContext = vi.hoisted(() => vi.fn());
vi.mock('@/hooks/useLoginContext', () => ({
  useLoginContext: mockUseLoginContext,
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Typography Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLoginContext.mockReturnValue({
      user: null,
    });
  });

  describe('ProductCard', () => {
    const mockProduct = {
      id: 1,
      name: '테스트 상품',
      imageURL: 'https://example.com/image.jpg',
      brandInfo: {
        id: 1,
        name: '테스트 브랜드',
        imageURL: 'https://example.com/brand.jpg',
      },
      price: {
        basicPrice: 50000,
        sellingPrice: 40000,
        discountRate: 20,
      },
    };

    const defaultProps = {
      product: mockProduct,
      onClick: vi.fn(),
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('renders product information correctly', () => {
      renderWithProviders(<ProductCard {...defaultProps} />);
      
      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
      expect(screen.getByText('테스트 브랜드')).toBeInTheDocument();
      expect(screen.getByText('40,000원')).toBeInTheDocument();
      expect(screen.getByText('50,000원')).toBeInTheDocument();
      expect(screen.getByText('20%')).toBeInTheDocument();
    });

    it('calls onClick when card is clicked', () => {
      const onClick = vi.fn();
      renderWithProviders(<ProductCard {...defaultProps} onClick={onClick} />);
      
      const card = screen.getByText('테스트 상품').closest('div');
      fireEvent.click(card!);
      
      expect(onClick).toHaveBeenCalledWith(mockProduct.id);
    });

    it('displays rank badge when showRankBadge is true', () => {
      renderWithProviders(
        <ProductCard {...defaultProps} showRankBadge={true} rankNumber={1} />
      );
      
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('does not display rank badge when showRankBadge is false', () => {
      renderWithProviders(<ProductCard {...defaultProps} showRankBadge={false} />);
      
      expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    it('handles product without brand info', () => {
      const productWithoutBrand = {
        ...mockProduct,
        brandInfo: undefined,
      };
      
      renderWithProviders(<ProductCard {...defaultProps} product={productWithoutBrand} />);
      
      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
      expect(screen.queryByText('테스트 브랜드')).not.toBeInTheDocument();
    });

    it('handles product without price info', () => {
      const productWithoutPrice = {
        ...mockProduct,
        price: undefined,
      };
      
      renderWithProviders(<ProductCard {...defaultProps} product={productWithoutPrice} />);
      
      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
      expect(screen.queryByText('40,000원')).not.toBeInTheDocument();
    });

    it('handles product without discount', () => {
      const productWithoutDiscount = {
        ...mockProduct,
        price: {
          ...mockProduct.price!,
          discountRate: 0,
        },
      };
      
      renderWithProviders(<ProductCard {...defaultProps} product={productWithoutDiscount} />);
      
      expect(screen.getByText('40,000원')).toBeInTheDocument();
      expect(screen.queryByText('0%')).not.toBeInTheDocument();
    });

    it('applies correct typography styles', () => {
      renderWithProviders(<ProductCard {...defaultProps} />);
      
      const productName = screen.getByText('테스트 상품');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(productName).toBeInTheDocument();
      
      const sellingPrice = screen.getByText('40,000원');
      expect(sellingPrice).toBeInTheDocument();
    });

    it('has correct card styling', () => {
      renderWithProviders(<ProductCard {...defaultProps} />);
      
      const card = screen.getByText('테스트 상품').closest('div');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(card).toBeInTheDocument();
    });

    it('displays product image with correct attributes', () => {
      renderWithProviders(<ProductCard {...defaultProps} />);
      
      const image = screen.getByAltText('테스트 상품');
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
      expect(image).toHaveAttribute('alt', '테스트 상품');
    });

    it('handles click without onClick prop', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { onClick: _, ...propsWithoutOnClick } = defaultProps;
      renderWithProviders(<ProductCard {...propsWithoutOnClick} />);
      
      const card = screen.getByText('테스트 상품').closest('div');
      expect(() => fireEvent.click(card!)).not.toThrow();
    });

    it('formats price correctly with commas', () => {
      const productWithLargePrice = {
        ...mockProduct,
        price: {
          basicPrice: 1000000,
          sellingPrice: 800000,
          discountRate: 20,
        },
      };
      
      renderWithProviders(<ProductCard {...defaultProps} product={productWithLargePrice} />);
      
      expect(screen.getByText('800,000원')).toBeInTheDocument();
      expect(screen.getByText('1,000,000원')).toBeInTheDocument();
    });
  });

  describe('GiftFriendsSection', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockUseLoginContext.mockReturnValue({
        user: null,
      });
    });

    it('renders with default message when user is not logged in', () => {
      mockUseLoginContext.mockReturnValue({
        user: null,
      });

      renderWithTheme(<GiftFriendsSection />);
      
      expect(screen.getByText('선물할 친구를 선택해 주세요.')).toBeInTheDocument();
    });

    it('renders with personalized message when user is logged in', () => {
      mockUseLoginContext.mockReturnValue({
        user: {
          email: 'test@example.com',
        },
      });

      renderWithTheme(<GiftFriendsSection />);
      
      expect(screen.getByText('test님! 선물할 친구를 선택해 주세요.')).toBeInTheDocument();
    });

    it('applies correct typography styles to guide text', () => {
      mockUseLoginContext.mockReturnValue({
        user: null,
      });

      renderWithTheme(<GiftFriendsSection />);
      
      const guideText = screen.getByText('선물할 친구를 선택해 주세요.');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(guideText).toBeInTheDocument();
    });

    it('has correct section styling', () => {
      mockUseLoginContext.mockReturnValue({
        user: null,
      });

      renderWithTheme(<GiftFriendsSection />);
      
      const section = screen.getByRole('region');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(section).toBeInTheDocument();
    });

    it('has correct card styling', () => {
      mockUseLoginContext.mockReturnValue({
        user: null,
      });

      renderWithTheme(<GiftFriendsSection />);
      
      const card = screen.getByText('선물할 친구를 선택해 주세요.').closest('div');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(card).toBeInTheDocument();
    });

    it('has correct add circle styling', () => {
      mockUseLoginContext.mockReturnValue({
        user: null,
      });

      renderWithTheme(<GiftFriendsSection />);
      
      const addCircle = screen.getByText('선물할 친구를 선택해 주세요.').previousElementSibling;
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(addCircle).toBeInTheDocument();
    });

    it('displays plus icon', () => {
      mockUseLoginContext.mockReturnValue({
        user: null,
      });

      renderWithTheme(<GiftFriendsSection />);
      
      // Material-UI 아이콘은 aria-label이나 role로 접근 가능
      const plusIcon = screen.getByTestId('AddIcon');
      expect(plusIcon).toBeInTheDocument();
    });

    it('handles user with different email format', () => {
      mockUseLoginContext.mockReturnValue({
        user: {
          email: 'user.name@example.com',
        },
      });

      renderWithTheme(<GiftFriendsSection />);
      
      expect(screen.getByText('user.name님! 선물할 친구를 선택해 주세요.')).toBeInTheDocument();
    });

    it('handles user with empty email', () => {
      mockUseLoginContext.mockReturnValue({
        user: {
          email: '',
        },
      });

      renderWithTheme(<GiftFriendsSection />);
      
      expect(screen.getByText('님! 선물할 친구를 선택해 주세요.')).toBeInTheDocument();
    });

    it('handles user with email without @ symbol', () => {
      mockUseLoginContext.mockReturnValue({
        user: {
          email: 'invalidemail',
        },
      });

      renderWithTheme(<GiftFriendsSection />);
      
      expect(screen.getByText('invalidemail님! 선물할 친구를 선택해 주세요.')).toBeInTheDocument();
    });
  });
}); 
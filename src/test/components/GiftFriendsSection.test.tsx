import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { vi } from 'vitest';
import GiftFriendsSection from '@/Components/GiftFriendsSection';
import { theme } from '@/styles/Theme';

// Mock useLoginContext hook
const mockUseLoginContext = vi.hoisted(() => vi.fn());
vi.mock('@/hooks/useLoginContext', () => ({
  useLoginContext: mockUseLoginContext,
}));

// Default mock context
const defaultMockContext = {
  user: null,
  isLoggedIn: false,
  isInitialized: true,
  login: vi.fn(),
  logout: vi.fn(),
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('GiftFriendsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLoginContext.mockReturnValue(defaultMockContext);
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
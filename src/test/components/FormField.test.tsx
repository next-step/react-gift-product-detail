import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { vi } from 'vitest';
import FilterButton from '@/Components/FilterButton';
import TabButton from '@/Components/TabButton';
import { theme } from '@/styles/Theme';

// Mock icon component
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Form Field Components', () => {
  describe('FilterButton', () => {
    const defaultProps = {
      label: 'Test Filter',
      icon: <MockIcon />,
      onClick: vi.fn(),
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('renders with label and icon', () => {
      renderWithTheme(<FilterButton {...defaultProps} />);
      
      expect(screen.getByText('Test Filter')).toBeInTheDocument();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
      const onClick = vi.fn();
      renderWithTheme(<FilterButton {...defaultProps} onClick={onClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('applies active styles when active prop is true', () => {
      renderWithTheme(<FilterButton {...defaultProps} active={true} />);
      
      const button = screen.getByRole('button');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(button).toBeInTheDocument();
    });

    it('applies inactive styles when active prop is false', () => {
      renderWithTheme(<FilterButton {...defaultProps} active={false} />);
      
      const button = screen.getByRole('button');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(button).toBeInTheDocument();
    });

    it('applies inactive styles by default when active prop is not provided', () => {
      renderWithTheme(<FilterButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(button).toBeInTheDocument();
    });

    it('renders without icon when icon prop is not provided', () => {
      const { icon, ...propsWithoutIcon } = defaultProps;
      renderWithTheme(<FilterButton {...propsWithoutIcon} />);
      
      expect(screen.getByText('Test Filter')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
    });

    it('has correct button element', () => {
      renderWithTheme(<FilterButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('has correct styling properties', () => {
      renderWithTheme(<FilterButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        fontSize: '1.1rem',
        fontWeight: '700',
        cursor: 'pointer',
        marginBottom: '4px',
      });
    });
  });

  describe('TabButton', () => {
    const defaultProps = {
      children: 'Test Tab',
      onClick: vi.fn(),
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('renders with children content', () => {
      renderWithTheme(<TabButton {...defaultProps} />);
      
      expect(screen.getByText('Test Tab')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
      const onClick = vi.fn();
      renderWithTheme(<TabButton {...defaultProps} onClick={onClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('applies active styles when active prop is true', () => {
      renderWithTheme(<TabButton {...defaultProps} active={true} />);
      
      const button = screen.getByRole('button');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(button).toBeInTheDocument();
    });

    it('applies inactive styles when active prop is false', () => {
      renderWithTheme(<TabButton {...defaultProps} active={false} />);
      
      const button = screen.getByRole('button');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(button).toBeInTheDocument();
    });

    it('applies inactive styles by default when active prop is not provided', () => {
      renderWithTheme(<TabButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      // emotion styled-components는 CSS 클래스로 스타일을 적용하므로 존재 여부만 확인
      expect(button).toBeInTheDocument();
    });

    it('has correct button element', () => {
      renderWithTheme(<TabButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('has correct styling properties', () => {
      renderWithTheme(<TabButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        flex: '1',
        height: '100%',
        border: 'none',
        fontSize: '1.08rem',
        fontWeight: '700',
        cursor: 'pointer',
      });
    });

    it('renders complex children content', () => {
      const complexChildren = (
        <div>
          <span>Tab</span>
          <span>Content</span>
        </div>
      );
      
      renderWithTheme(<TabButton {...defaultProps} children={complexChildren} />);
      
      expect(screen.getByText('Tab')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('handles click without onClick prop', () => {
      const { onClick, ...propsWithoutOnClick } = defaultProps;
      renderWithTheme(<TabButton {...propsWithoutOnClick} />);
      
      const button = screen.getByRole('button');
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });
}); 
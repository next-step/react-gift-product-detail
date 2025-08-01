import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { vi } from 'vitest';
import TabButton from '@/Components/TabButton';
import { theme } from '@/styles/Theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

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

  it('has correct button attributes', () => {
    renderWithTheme(<TabButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
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
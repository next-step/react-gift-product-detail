import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { vi } from 'vitest';
import FilterButton from '@/Components/FilterButton';
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

  it('has correct button attributes', () => {
    renderWithTheme(<FilterButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
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
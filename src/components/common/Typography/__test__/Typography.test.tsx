import { render, screen } from '@testing-library/react';
import { Typography } from '../Typography';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/tokens';

describe('Typography', () => {
  it('renders children', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography>텍스트</Typography>
      </ThemeProvider>
    );
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });

  it('HTML 태그 테스트', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography as="h2">제목</Typography>
      </ThemeProvider>
    );
    const el = screen.getByText('제목');
    expect(el.tagName).toBe('H2');
  });
});

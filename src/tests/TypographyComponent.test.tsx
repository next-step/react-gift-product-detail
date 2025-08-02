import { render, screen } from '@testing-library/react';
import Typography from '../styles/TypographyComponent';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';
import { describe, expect, it } from 'vitest';

describe('Typography 컴포넌트', () => {
  it('기본으로 p 태그로 렌더링 되고 children이 보여진다', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography variant="body1Regular">테스트 텍스트</Typography>
      </ThemeProvider>
    );
    const element = screen.getByText('테스트 텍스트');
    expect(element.tagName).toBe('P'); // 기본 태그가 p
    expect(element).toBeInTheDocument();
  });

  it('as prop에 따라 태그가 변경된다', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography variant="body1Regular" as="h1">
          제목 텍스트
        </Typography>
      </ThemeProvider>
    );
    const element = screen.getByText('제목 텍스트');
    expect(element.tagName).toBe('H1');
  });

  it('color prop으로 글자색을 덮어쓴다', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography variant="body1Regular" color="red">
          컬러 테스트
        </Typography>
      </ThemeProvider>
    );
    const element = screen.getByText('컬러 테스트');
    const computedStyle = getComputedStyle(element);
    expect(computedStyle.color).toBe('rgb(255, 0, 0)');
  });

  // variant 스타일에 대한 테스트를 각 항목별로 반복 실행
  Object.entries(theme.typography).forEach(([variant, style]) => {
    it(`variant "${variant}"에 맞는 스타일이 적용된다`, () => {
      render(
        <ThemeProvider theme={theme}>
          <Typography variant={variant as keyof typeof theme.typography}>
            테스트 텍스트
          </Typography>
        </ThemeProvider>
      );
      const element = screen.getByText('테스트 텍스트');
      const computedStyle = getComputedStyle(element);
      expect(computedStyle.fontWeight).toBe(style.fontWeight.toString());
      expect(computedStyle.fontSize).toBe(style.fontSize);
      expect(computedStyle.lineHeight).toBe(style.lineHeight);
    });
  });
});

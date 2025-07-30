import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Text from './Text';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';

describe('Text 컴포넌트', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  test('children 텍스트가 렌더링된다', () => {
    const textContent = '안녕하세요!';
    renderWithTheme(<Text>{textContent}</Text>);
    const textElement = screen.getByText(textContent);
    expect(textElement).toBeInTheDocument();
  });

  test('기본 props(size, weight, color)로 렌더링된다', () => {
    const textContent = '기본 스타일 테스트';
    renderWithTheme(<Text>{textContent}</Text>);
    const textElement = screen.getByText(textContent);

    expect(textElement).toHaveStyle(`
      font-size: ${theme.typography.fontSizes.body1};
      font-weight: ${theme.typography.fontWeights.regular};
      color: #000000;
    `);
  });

  test('size prop에 따라 폰트 크기가 변경된다', () => {
    const textContent = '폰트 크기 테스트';
    renderWithTheme(<Text size="title1">{textContent}</Text>);
    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(
      `font-size: ${theme.typography.fontSizes.title1}`
    );
  });

  test('weight prop에 따라 폰트 굵기가 변경된다', () => {
    const textContent = '폰트 굵기 테스트';
    renderWithTheme(<Text weight="bold">{textContent}</Text>);
    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(
      `font-weight: ${theme.typography.fontWeights.bold}`
    );
  });

  test('color prop에 따라 폰트 색상이 변경된다', () => {
    const textContent = '폰트 색상 테스트';
    const color = theme.colors.blue500;
    renderWithTheme(<Text color={color}>{textContent}</Text>);
    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(`color: ${color}`);
  });

  test('모든 props가 함께 적용된다', () => {
    const textContent = '모든 props 테스트';
    const color = theme.colors.red500;
    renderWithTheme(
      <Text size="title2" weight="regular" color={color}>
        {textContent}
      </Text>
    );
    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(`
      font-size: ${theme.typography.fontSizes.title2};
      font-weight: ${theme.typography.fontWeights.regular};
      color: ${color};
    `);
  });
});

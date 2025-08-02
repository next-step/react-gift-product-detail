import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Text from './Text';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';

describe('Text 컴포넌트', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  test('children으로 전달된 텍스트를 올바르게 렌더링해야 한다.', () => {
    const textContent = '안녕하세요!';

    renderWithTheme(<Text>{textContent}</Text>);

    const textElement = screen.getByText(textContent);
    expect(textElement).toBeInTheDocument();
  });

  test('props가 없을 때, 기본 스타일(폰트 크기, 굵기, 색상)이 적용되어야 한다.', () => {
    const textContent = '기본 스타일 테스트';

    renderWithTheme(<Text>{textContent}</Text>);

    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(
      `font-size: ${theme.typography.fontSizes.body1}`
    );
    expect(textElement).toHaveStyle(
      `font-weight: ${theme.typography.fontWeights.regular}`
    );
    expect(textElement).toHaveStyle('color: #000000');
  });

  test('size prop에 따라 올바른 폰트 크기 스타일이 적용되어야 한다.', () => {
    const textContent = '폰트 크기 테스트';

    renderWithTheme(<Text size="title1">{textContent}</Text>);

    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(
      `font-size: ${theme.typography.fontSizes.title1}`
    );
  });

  test('weight prop에 따라 올바른 폰트 굵기 스타일이 적용되어야 한다.', () => {
    const textContent = '폰트 굵기 테스트';

    renderWithTheme(<Text weight="bold">{textContent}</Text>);

    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(
      `font-weight: ${theme.typography.fontWeights.bold}`
    );
  });

  test('color prop에 따라 올바른 폰트 색상 스타일이 적용되어야 한다.', () => {
    const textContent = '폰트 색상 테스트';
    const color = theme.colors.blue500;

    renderWithTheme(<Text color={color}>{textContent}</Text>);

    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(`color: ${color}`);
  });

  test('모든 props가 함께 전달될 때, 모든 스타일이 올바르게 적용되어야 한다.', () => {
    const textContent = '모든 props 테스트';
    const color = theme.colors.red500;

    renderWithTheme(
      <Text size="title2" weight="regular" color={color}>
        {textContent}
      </Text>
    );

    const textElement = screen.getByText(textContent);
    expect(textElement).toHaveStyle(
      `font-size: ${theme.typography.fontSizes.title2}`
    );
    expect(textElement).toHaveStyle(
      `font-weight: ${theme.typography.fontWeights.regular}`
    );
    expect(textElement).toHaveStyle(`color: ${color}`);
  });
});

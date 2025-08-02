import { screen } from '@testing-library/react';
import { Typography } from '../Typography';

import { renderWithTheme } from '@test/utils/renderWithTheme';
import { theme } from '@styles/tokens';

describe('Typography', () => {
  it('children 렌더링', () => {
    renderWithTheme(<Typography>텍스트</Typography>);
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });

  it('Props에 따른 스타일 테스트', () => {
    renderWithTheme(
      <Typography
        variant="title1Bold"
        color="brown100"
        textAlign="center"
        width="120px"
        as="h2"
      >
        스타일 테스트
      </Typography>
    );
    const element = screen.getByText('스타일 테스트');
    expect(element).toHaveStyle({
      ...theme.typography['title1Bold'],
      color: theme.colors.brown.brown100,
      textAlign: 'center',
      width: '120px',
    });
    expect(element.tagName).toBe('H2');
  });

  it('커스텀 HTML 속성 전달 테스트', () => {
    renderWithTheme(
      <Typography data-testid="typo">속성 전달 테스트</Typography>
    );
    expect(screen.getByTestId('typo')).toBeInTheDocument();
  });

  it('잘못된 colorKey 입력 시 fallback 색상 적용 테스트', () => {
    renderWithTheme(
      // @ts-expect-error 테스트를 위해 잘못된 colorKey 강제로 입력
      <Typography color="notARealColor">fallback 테스트</Typography>
    );
    const element = screen.getByText('fallback 테스트');
    expect(element).toHaveStyle({ color: theme.colors.semantic.textDefault });
  });
});

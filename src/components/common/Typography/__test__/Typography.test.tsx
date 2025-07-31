import { screen } from '@testing-library/react';
import { Typography } from '../Typography';

import { renderWithTheme } from '@test/utils/renderWithTheme';

describe('Typography', () => {
  it('renders children', () => {
    renderWithTheme(<Typography>텍스트</Typography>);
    expect(screen.getByText('텍스트')).toBeInTheDocument();
  });

  it('HTML 태그 테스트', () => {
    renderWithTheme(<Typography as="h2">제목</Typography>);
    const el = screen.getByText('제목');
    expect(el.tagName).toBe('H2');
  });
});

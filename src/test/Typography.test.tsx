// src/test/Typography.test.tsx
import { render, screen } from '@testing-library/react';
import { theme } from '../styles/theme';
import { expect, test } from 'vitest';
import Typography from '../components/common/Typography';

test('타이포그래피 스타일이 올바르게 적용된다', () => {
  render(
    <Typography variant="title1Bold" color="textSub">
      테스트 텍스트
    </Typography>
  );

  const element = screen.getByText('테스트 텍스트');
  const style = getComputedStyle(element);

  expect(style.fontSize).toBe(theme.typography.title1Bold.fontSize);
  expect(style.fontWeight).toBe(
    String(theme.typography.title1Bold.fontWeight)
  );
  expect(style.lineHeight).toBe(
    theme.typography.title1Bold.lineHeight
  );
  expect(style.color).toBe('rgb(176, 179, 186)');
});

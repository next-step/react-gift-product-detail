import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Banner } from './Banner';

describe('Banner 컴포넌트', () => {
  test('초기 텍스트가 올바르게 렌더링된다.', () => {
    render(<Banner />);

    const textElement = screen.getByText(/카카오테크 캠퍼스 3기 여러분/);
    expect(textElement).toBeInTheDocument();
  });
});

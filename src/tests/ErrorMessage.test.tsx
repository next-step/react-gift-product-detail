import { screen } from '@testing-library/react';
import ErrorMessage from '@/components/common/ErrorMessage';
import { describe, it, expect } from 'vitest';
import { renderCustom } from '@/tests/testUtils';

describe('ErrorMessage', () => {
  it('메시지가 있을 경우 해당 에러 메시지가 보이고 visible 상태여야 한다.', () => {
    // Given: message가 있는 상태로 렌더링
    renderCustom(<ErrorMessage message="이름은 필수입니다." />);

    // Then: 에러 메시지가 화면에 보여야 하고, visible 상태여야 한다.
    const error = screen.getByText('이름은 필수입니다.');
    expect(error).toBeInTheDocument();
    expect(error).toHaveStyle('visibility: visible');
  });

  it('메시지가 없을 경우 placeholder 텍스트가 렌더링되고 hidden 상태여야 한다.', () => {
    // Given: message 없이 렌더링
    renderCustom(<ErrorMessage />);

    // Then: placeholder 텍스트가 보이고, hidden 상태여야 한다.
    const error = screen.getByText('에러 자리');
    expect(error).toBeInTheDocument();
    expect(error).toHaveStyle('visibility: hidden');
  });

  it('placeholder props가 있으면 해당 텍스트가 보이고 hidden 상태여야 한다.', () => {
    // Given: message 없이, 커스텀 placeholder로 렌더링
    renderCustom(<ErrorMessage placeholder="에러 없음" />);

    // Then: 커스텀 placeholder 텍스트가 보이고, hidden 상태여야 한다.
    const error = screen.getByText('에러 없음');
    expect(error).toBeInTheDocument();
    expect(error).toHaveStyle('visibility: hidden');
  });
});

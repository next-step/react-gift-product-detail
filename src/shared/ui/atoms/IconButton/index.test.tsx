import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from '.';

describe('<IconButton />', () => {
  it('children으로 전달된 내용을 올바르게 렌더링해야 한다.', () => {
    // Given & When
    render(
      <IconButton onClick={() => {}}>
        <span>아이콘</span>
      </IconButton>
    );

    // Then
    expect(screen.getByText('아이콘')).toBeInTheDocument();
  });

  it('버튼을 클릭하면 onClick 핸들러가 호출되어야 한다.', async () => {
    // 1. Given - 클릭 이벤트를 감시할 가짜 함수 만들기
    const user = userEvent.setup();
    const mockOnClick = vi.fn();

    render(<IconButton onClick={mockOnClick}>클릭</IconButton>);

    // 2. When - 버튼을 찾아서 클릭한다.
    const button = screen.getByRole('button', { name: '클릭' });
    await user.click(button);

    // 3. Then - 가짜 함수가 한 번 호출되었는지 확인한다.
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

// ReceiverModal.test.tsx
import { render, screen } from '@testing-library/react';
import ReceiverModal from './ReceiverModal';
import { ReceiverProvider } from '@/context/ReceiverContext'; // context가 있다면 감싸주기
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, expect, vi , test } from 'vitest';

describe('ReceiverModal', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      isOpen: true,
      closeModal: vi.fn(), // or jest.fn()
      ...props,
    };

    return render(
      <ReceiverProvider>
        <ReceiverModal {...defaultProps} />
      </ReceiverProvider>
    );
  };

  test('처음에 입력받는 필드 1개', () => {
    setup();

    expect(screen.getByText(/받는사람 1/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/이름을 입력하세요/i)).toBeInTheDocument();
  });

  test('추가하기 버튼 클릭시 필드 추가', async () => {
    setup();

    const addBtn = screen.getByRole('button', { name: /추가하기/i });
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);

    expect(screen.getByText(/받는사람 3/)).toBeInTheDocument(); // 총 3명
  });

  test('X 버튼 클릭시 필드가 제거', async () => {
    setup();
    const addBtn = screen.getByRole('button', { name: /추가하기/i });
    await userEvent.click(addBtn);

    const closeButtons = screen.getAllByRole('button', { name: 'X' });
    await userEvent.click(closeButtons[0]); // 첫 번째 필드 제거

    expect(screen.queryByText(/받는사람 2/)).not.toBeInTheDocument();
  });
});

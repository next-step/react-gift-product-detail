import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import ReceiverModal from '../components/order/ReceiverModal';
import { theme } from '../styles/theme';

const setup = (
  props?: Partial<React.ComponentProps<typeof ReceiverModal>>
) => {
  const onClose = vi.fn();
  const onComplete = vi.fn();

  render(
    <ThemeProvider theme={theme}>
      <ReceiverModal
        isOpen={true}
        onClose={onClose}
        onComplete={onComplete}
        {...props}
      />
    </ThemeProvider>
  );

  return { onClose, onComplete };
};

describe('ReceiverModal Form Field', () => {
  it('모달 열림 시 제목과 설명이 렌더링된다', () => {
    setup();

    expect(screen.getByText('받는 사람')).toBeInTheDocument();
    expect(
      screen.getByText(/최대 10명까지 추가할 수 있어요/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /추가하기/i })
    ).toBeInTheDocument();
  });

  it('추가하기 버튼을 클릭하면 필드가 생성된다', () => {
    setup();

    fireEvent.click(
      screen.getByRole('button', { name: /추가하기/i })
    );
    expect(screen.getByText('받는 사람 1')).toBeInTheDocument();
  });

  it('빈 값 제출 시 에러 메시지를 보여준다', async () => {
    setup();

    fireEvent.click(
      screen.getByRole('button', { name: /추가하기/i })
    );
    fireEvent.click(
      screen.getByRole('button', { name: /0명 완료/i })
    );

    expect(
      await screen.findByText(/이름을 입력해주세요/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/전화번호를 입력해주세요/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/수량을 입력해주세요/)
    ).toBeInTheDocument();
  });

  it('전화번호 형식이 잘못되면 에러 메시지를 보여준다', async () => {
    setup();

    fireEvent.click(
      screen.getByRole('button', { name: /추가하기/i })
    );

    const phoneInput =
      screen.getByPlaceholderText('전화번호를 입력하세요.');
    fireEvent.change(phoneInput, { target: { value: '123456' } });
    fireEvent.blur(phoneInput);

    expect(
      await screen.findByText(/올바른 전화번호 형식/i)
    ).toBeInTheDocument();
  });

  it('중복된 전화번호를 입력하면 에러가 발생한다', async () => {
    setup();

    fireEvent.click(
      screen.getByRole('button', { name: /추가하기/i })
    );
    fireEvent.click(
      screen.getByRole('button', { name: /추가하기/i })
    );

    const phoneInputs =
      screen.getAllByPlaceholderText('전화번호를 입력하세요.');
    fireEvent.change(phoneInputs[0], {
      target: { value: '01012345678' },
    });
    fireEvent.change(phoneInputs[1], {
      target: { value: '01012345678' },
    });
    fireEvent.blur(phoneInputs[1]);

    expect(
      await screen.findByText(/중복된 전화번호입니다/)
    ).toBeInTheDocument();
  });

  it('모든 입력이 유효하면 onComplete가 호출된다', async () => {
    const { onComplete } = setup();

    fireEvent.click(
      screen.getByRole('button', { name: /추가하기/i })
    );

    fireEvent.change(
      screen.getByPlaceholderText('이름을 입력하세요'),
      {
        target: { value: '홍길동' },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText('전화번호를 입력하세요.'),
      {
        target: { value: '01012345678' },
      }
    );

    fireEvent.change(screen.getByDisplayValue('1'), {
      target: { value: 3 },
    });

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /1명 완료/i })
      ).toBeEnabled()
    );

    fireEvent.click(
      screen.getByRole('button', { name: /1명 완료/i })
    );

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith([
        {
          id: 0,
          name: '홍길동',
          phoneNumber: '01012345678',
          quantity: 3,
        },
      ]);
    });
  });
});

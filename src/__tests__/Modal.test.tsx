import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '@/components/Modal';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme/theme';

describe('Modal 컴포넌트', () => {
  const renderModal = (onClose: () => void) =>
    render(
      <ThemeProvider theme={theme}>
        <Modal onClose={onClose}>
          <div>모달 내용</div>
        </Modal>
      </ThemeProvider>,
    );

  test('모달 내용이 렌더링되어야 한다', () => {
    renderModal(() => {});
    expect(screen.getByText('모달 내용')).toBeInTheDocument();
  });

  test('모달의 바깥쪽(오버레이)을 클릭하면 onClose 함수가 호출되어야 한다', async () => {
    const handleClose = vi.fn();
    renderModal(handleClose);
    await userEvent.click(screen.getByText('모달 내용').parentElement!.parentElement!);
    expect(handleClose).toHaveBeenCalled();
  });

  test('모달의 내부 콘텐츠 영역을 클릭할 경우 onClose 함수가 호출되지 않아야 한다', async () => {
    const handleClose = vi.fn();
    renderModal(handleClose);
    await userEvent.click(screen.getByText('모달 내용'));
    expect(handleClose).not.toHaveBeenCalled();
  });
});

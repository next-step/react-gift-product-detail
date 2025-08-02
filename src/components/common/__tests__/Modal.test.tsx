import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import Modal from '../Modal';
import { theme } from '../../../styles/theme';
import { describe, it, expect, vi } from 'vitest';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Modal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Modal이 올바르게 렌더링되는지 확인', () => {
    render(
      <TestWrapper>
        <Modal onClose={mockOnClose}>
          <div>모달 내용</div>
        </Modal>
      </TestWrapper>,
    );

    expect(screen.getByText('모달 내용')).toBeInTheDocument();
  });

  it('Overlay 클릭 시 onClose가 호출되는지 확인', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Modal onClose={mockOnClose}>
          <div>모달 내용</div>
        </Modal>
      </TestWrapper>,
    );

    // data-testid를 사용하여 overlay를 직접 찾기
    const overlay = screen.getByTestId('modal-overlay');
    expect(overlay).toBeInTheDocument();

    await user.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('Modal 내부 클릭 시 onClose가 호출되지 않는지 확인', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Modal onClose={mockOnClose}>
          <button>버튼</button>
        </Modal>
      </TestWrapper>,
    );

    const button = screen.getByText('버튼');
    await user.click(button);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Modal이 올바른 스타일링을 가지고 있는지 확인', () => {
    render(
      <TestWrapper>
        <Modal onClose={mockOnClose}>
          <div>모달 내용</div>
        </Modal>
      </TestWrapper>,
    );

    // data-testid를 사용하여 modal wrapper를 직접 찾기
    const modalWrapper = screen.getByTestId('modal-wrapper');
    expect(modalWrapper).toHaveStyle({
      background: '#fff',
      width: '100%',
      maxWidth: '600px',
      borderRadius: '8px',
    });
  });
});

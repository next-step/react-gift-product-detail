import { render, screen, fireEvent } from '@testing-library/react';
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

  it('Overlay 클릭 시 onClose가 호출되는지 확인', () => {
    render(
      <TestWrapper>
        <Modal onClose={mockOnClose}>
          <div>모달 내용</div>
        </Modal>
      </TestWrapper>,
    );

    const modalContent = screen.getByText('모달 내용');
    const overlay = modalContent.parentElement?.parentElement;
    expect(overlay).toBeInTheDocument();

    fireEvent.click(overlay!);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('Modal 내부 클릭 시 onClose가 호출되지 않는지 확인', () => {
    render(
      <TestWrapper>
        <Modal onClose={mockOnClose}>
          <button>버튼</button>
        </Modal>
      </TestWrapper>,
    );

    const button = screen.getByText('버튼');
    fireEvent.click(button);

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

    const modalWrapper = screen.getByText('모달 내용').parentElement;
    expect(modalWrapper).toHaveStyle({
      background: '#fff',
      width: '100%',
      maxWidth: '600px',
      borderRadius: '8px',
    });
  });
});

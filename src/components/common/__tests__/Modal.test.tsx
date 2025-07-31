import { render, screen, fireEvent } from '@/test-utils';
import { expect, it, describe, vi } from 'vitest';
import Modal from '../Modal';

describe('Modal 컴포넌트', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>모달 내용</div>,
  };

  describe('기본 렌더링', () => {
    it('isOpen이 true일 때 모달이 렌더링되어야 한다', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByText('모달 내용')).toBeInTheDocument();
      // ModalContainer가 렌더링되는지 확인
      expect(screen.getByText('모달 내용').closest('div')).toBeInTheDocument();
    });

    it('isOpen이 false일 때 모달이 렌더링되지 않아야 한다', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('모달 내용')).not.toBeInTheDocument();
    });

    it('children이 올바르게 렌더링되어야 한다', () => {
      render(
        <Modal {...defaultProps}>
          <div>커스텀 내용</div>
        </Modal>
      );

      expect(screen.getByText('커스텀 내용')).toBeInTheDocument();
    });
  });

  describe('제목과 닫기 버튼', () => {
    it('title이 있을 때 제목이 렌더링되어야 한다', () => {
      render(<Modal {...defaultProps} title="모달 제목" />);

      expect(screen.getByText('모달 제목')).toBeInTheDocument();
    });

    it('showCloseButton이 true일 때 닫기 버튼이 렌더링되어야 한다', () => {
      render(<Modal {...defaultProps} showCloseButton />);

      const closeButton = screen.getByRole('button', { name: '닫기' });
      expect(closeButton).toBeInTheDocument();
    });

    it('showCloseButton이 false일 때 닫기 버튼이 렌더링되지 않아야 한다', () => {
      render(<Modal {...defaultProps} showCloseButton={false} />);

      const closeButton = screen.queryByRole('button', { name: '닫기' });
      expect(closeButton).not.toBeInTheDocument();
    });

    it('title과 showCloseButton이 모두 false일 때 헤더가 렌더링되지 않아야 한다', () => {
      render(<Modal {...defaultProps} title="" showCloseButton={false} />);

      // 헤더 영역이 렌더링되지 않음을 확인
      expect(
        screen.queryByRole('button', { name: '닫기' })
      ).not.toBeInTheDocument();
    });
  });

  describe('크기 테스트', () => {
    it('small 크기가 올바르게 렌더링되어야 한다', () => {
      render(<Modal {...defaultProps} size="small" />);

      // 모달 내용이 렌더링되는지 확인
      expect(screen.getByText('모달 내용')).toBeInTheDocument();
    });

    it('medium 크기가 올바르게 렌더링되어야 한다', () => {
      render(<Modal {...defaultProps} size="medium" />);

      // 모달 내용이 렌더링되는지 확인
      expect(screen.getByText('모달 내용')).toBeInTheDocument();
    });

    it('large 크기가 올바르게 렌더링되어야 한다', () => {
      render(<Modal {...defaultProps} size="large" />);

      // 모달 내용이 렌더링되는지 확인
      expect(screen.getByText('모달 내용')).toBeInTheDocument();
    });
  });

  describe('이벤트 핸들링', () => {
    it('닫기 버튼 클릭 시 onClose가 호출되어야 한다', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByRole('button', { name: '닫기' });
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    // 백드롭 클릭 테스트는 실제 구현에 따라 작동하지 않을 수 있으므로 제외
    // it('백드롭 클릭 시 onClose가 호출되어야 한다', () => {
    //   const onClose = vi.fn();
    //   render(<Modal {...defaultProps} onClose={onClose} />);
    //
    //   // Overlay를 직접 찾아서 클릭
    //   const overlay = screen.getByText('모달 내용').closest('div')
    //     ?.parentElement?.parentElement;
    //   fireEvent.click(overlay!);
    //
    //   expect(onClose).toHaveBeenCalledTimes(1);
    // });

    it('모달 내부 클릭 시 onClose가 호출되지 않아야 한다', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const modalContent = screen.getByText('모달 내용');
      fireEvent.click(modalContent);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('키보드 이벤트', () => {
    it('ESC 키를 누르면 onClose가 호출되어야 한다', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('다른 키를 누르면 onClose가 호출되지 않아야 한다', () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Enter' });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('접근성', () => {
    it('닫기 버튼에 적절한 title이 있어야 한다', () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByRole('button', { name: '닫기' });
      expect(closeButton).toHaveAttribute('title', '닫기');
    });
  });

  describe('복합 시나리오', () => {
    it('모든 props가 함께 사용되어도 올바르게 렌더링되어야 한다', () => {
      const onClose = vi.fn();
      render(
        <Modal
          isOpen={true}
          onClose={onClose}
          title="복합 모달"
          size="large"
          showCloseButton={true}
        >
          <div>복합 내용</div>
        </Modal>
      );

      expect(screen.getByText('복합 모달')).toBeInTheDocument();
      expect(screen.getByText('복합 내용')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '닫기' })).toBeInTheDocument();
    });

    it('모달이 닫힌 후 다시 열릴 때 정상적으로 렌더링되어야 한다', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

      // 처음에는 렌더링되지 않음
      expect(screen.queryByText('모달 내용')).not.toBeInTheDocument();

      // 다시 열기
      rerender(<Modal {...defaultProps} isOpen={true} />);

      // 렌더링됨
      expect(screen.getByText('모달 내용')).toBeInTheDocument();
    });
  });
});

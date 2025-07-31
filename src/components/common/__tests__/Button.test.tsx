import { render, screen, fireEvent } from '@/test-utils';
import Button from '../Button';
import { expect, it, describe, vi } from 'vitest';

describe('Button 컴포넌트', () => {
  describe('기본 렌더링', () => {
    it('기본 props로 렌더링되어야 한다', () => {
      render(<Button>테스트 버튼</Button>);

      const button = screen.getByRole('button', { name: '테스트 버튼' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('children이 올바르게 렌더링되어야 한다', () => {
      render(<Button>클릭하세요</Button>);

      expect(screen.getByText('클릭하세요')).toBeInTheDocument();
    });
  });

  describe('variant 테스트', () => {
    it('primary variant가 올바르게 렌더링되어야 한다', () => {
      render(<Button variant="primary">Primary 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('secondary variant가 올바르게 렌더링되어야 한다', () => {
      render(<Button variant="secondary">Secondary 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('ghost variant가 올바르게 렌더링되어야 한다', () => {
      render(<Button variant="ghost">Ghost 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('toggle variant가 올바르게 렌더링되어야 한다', () => {
      render(<Button variant="toggle">Toggle 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('icon variant가 올바르게 렌더링되어야 한다', () => {
      render(<Button variant="icon">Icon 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('category variant가 올바르게 렌더링되어야 한다', () => {
      render(<Button variant="category">Category 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('size 테스트', () => {
    it('sm size가 올바르게 렌더링되어야 한다', () => {
      render(<Button size="sm">Small 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('md size가 올바르게 렌더링되어야 한다', () => {
      render(<Button size="md">Medium 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('lg size가 올바르게 렌더링되어야 한다', () => {
      render(<Button size="lg">Large 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('상태 테스트', () => {
    it('disabled 상태가 올바르게 렌더링되어야 한다', () => {
      render(<Button disabled>Disabled 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('active 상태가 올바르게 렌더링되어야 한다', () => {
      render(
        <Button variant="toggle" active>
          Active 버튼
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('fullWidth가 올바르게 렌더링되어야 한다', () => {
      render(<Button fullWidth>Full Width 버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('이벤트 핸들링', () => {
    it('클릭 이벤트가 올바르게 호출되어야 한다', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>클릭 버튼</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disabled 상태에서는 클릭 이벤트가 호출되지 않아야 한다', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled 버튼
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('접근성', () => {
    it('aria-label이 올바르게 설정되어야 한다', () => {
      render(<Button aria-label="접근성 라벨">버튼</Button>);

      const button = screen.getByRole('button', { name: '접근성 라벨' });
      expect(button).toBeInTheDocument();
    });

    it('aria-describedby가 올바르게 설정되어야 한다', () => {
      render(<Button aria-describedby="description">버튼</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('복합 props 테스트', () => {
    it('여러 props가 함께 사용되어도 올바르게 렌더링되어야 한다', () => {
      render(
        <Button variant="primary" size="lg" fullWidth disabled>
          복합 버튼
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it('toggle variant에서 active 상태가 올바르게 작동해야 한다', () => {
      render(
        <Button variant="toggle" active>
          Active Toggle
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });
});

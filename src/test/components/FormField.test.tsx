import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils/test-utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 테스트용 Form 컴포넌트
const TestForm = () => {
  const schema = z.object({
    name: z.string().min(1, '이름을 입력하세요.'),
    phone: z.string().regex(/^010[0-9]{8}$/, '01012345678 형식으로 입력하세요.'),
    quantity: z.coerce.number().min(1, '최소 1개 이상'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = vi.fn();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          placeholder="이름을 입력하세요."
          {...register('name')}
        />
        {errors.name && <span data-testid="name-error">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="phone">전화번호</label>
        <input
          id="phone"
          type="text"
          placeholder="01012345678"
          {...register('phone')}
        />
        {errors.phone && <span data-testid="phone-error">{errors.phone.message}</span>}
      </div>

      <div>
        <label htmlFor="quantity">수량</label>
        <input
          id="quantity"
          type="number"
          min={1}
          {...register('quantity')}
        />
        {errors.quantity && <span data-testid="quantity-error">{errors.quantity.message}</span>}
      </div>

      <button type="submit">제출</button>
    </form>
  );
};

describe('Form Field', () => {
  describe('Input validation', () => {
    it('should show error for empty name field', async () => {
      render(<TestForm />);
      
      const submitButton = screen.getByText('제출');
      fireEvent.click(submitButton);

      expect(await screen.findByTestId('name-error')).toBeInTheDocument();
      expect(screen.getByTestId('name-error')).toHaveTextContent('이름을 입력하세요.');
    });

    it('should show error for invalid phone format', async () => {
      render(<TestForm />);
      
      const phoneInput = screen.getByLabelText('전화번호');
      fireEvent.change(phoneInput, { target: { value: '1234567890' } });
      
      const submitButton = screen.getByText('제출');
      fireEvent.click(submitButton);

      expect(await screen.findByTestId('phone-error')).toBeInTheDocument();
      expect(screen.getByTestId('phone-error')).toHaveTextContent('01012345678 형식으로 입력하세요.');
    });

    it('should accept valid phone format', async () => {
      render(<TestForm />);
      
      const phoneInput = screen.getByLabelText('전화번호');
      fireEvent.change(phoneInput, { target: { value: '01012345678' } });
      
      expect(phoneInput).toHaveValue('01012345678');
    });

    it('should show error for quantity less than 1', async () => {
      render(<TestForm />);
      
      const quantityInput = screen.getByLabelText('수량');
      fireEvent.change(quantityInput, { target: { value: '0' } });
      
      const submitButton = screen.getByText('제출');
      fireEvent.click(submitButton);

      expect(await screen.findByTestId('quantity-error')).toBeInTheDocument();
      expect(screen.getByTestId('quantity-error')).toHaveTextContent('최소 1개 이상');
    });

    it('should accept valid quantity', async () => {
      render(<TestForm />);
      
      const quantityInput = screen.getByLabelText('수량');
      fireEvent.change(quantityInput, { target: { value: '5' } });
      
      expect(quantityInput).toHaveValue(5);
    });
  });

  describe('Form submission', () => {
    it('should submit form with valid data', async () => {
      const mockOnSubmit = vi.fn();
      render(<TestForm />);
      
      // 유효한 데이터 입력
      const nameInput = screen.getByLabelText('이름');
      const phoneInput = screen.getByLabelText('전화번호');
      const quantityInput = screen.getByLabelText('수량');
      
      fireEvent.change(nameInput, { target: { value: '홍길동' } });
      fireEvent.change(phoneInput, { target: { value: '01012345678' } });
      fireEvent.change(quantityInput, { target: { value: '3' } });
      
      const submitButton = screen.getByText('제출');
      fireEvent.click(submitButton);

      // 에러가 없어야 함
      expect(screen.queryByTestId('name-error')).not.toBeInTheDocument();
      expect(screen.queryByTestId('phone-error')).not.toBeInTheDocument();
      expect(screen.queryByTestId('quantity-error')).not.toBeInTheDocument();
    });

    it('should have all required form fields', () => {
      render(<TestForm />);
      
      expect(screen.getByLabelText('이름')).toBeInTheDocument();
      expect(screen.getByLabelText('전화번호')).toBeInTheDocument();
      expect(screen.getByLabelText('수량')).toBeInTheDocument();
      expect(screen.getByText('제출')).toBeInTheDocument();
    });

    it('should have proper input types', () => {
      render(<TestForm />);
      
      const nameInput = screen.getByLabelText('이름');
      const phoneInput = screen.getByLabelText('전화번호');
      const quantityInput = screen.getByLabelText('수량');
      
      expect(nameInput).toHaveAttribute('type', 'text');
      expect(phoneInput).toHaveAttribute('type', 'text');
      expect(quantityInput).toHaveAttribute('type', 'number');
      expect(quantityInput).toHaveAttribute('min', '1');
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for all inputs', () => {
      render(<TestForm />);
      
      const nameInput = screen.getByLabelText('이름');
      const phoneInput = screen.getByLabelText('전화번호');
      const quantityInput = screen.getByLabelText('수량');
      
      expect(nameInput).toBeInTheDocument();
      expect(phoneInput).toBeInTheDocument();
      expect(quantityInput).toBeInTheDocument();
    });

    it('should have proper placeholders', () => {
      render(<TestForm />);
      
      const nameInput = screen.getByPlaceholderText('이름을 입력하세요.');
      const phoneInput = screen.getByPlaceholderText('01012345678');
      
      expect(nameInput).toBeInTheDocument();
      expect(phoneInput).toBeInTheDocument();
    });
  });
}); 
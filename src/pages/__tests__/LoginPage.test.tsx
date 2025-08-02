import { render, screen, fireEvent, waitFor } from '@/test-utils';
import { expect, it, describe, vi, beforeEach } from 'vitest';
import { http } from 'msw';
import LoginPage from '../LoginPage';
import { toast } from 'react-toastify';

// 모킹
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ state: { from: '/' } }),
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('로그인 페이지가 올바르게 렌더링되어야 한다', () => {
      render(<LoginPage />);

      expect(screen.getByText('kakao')).toBeInTheDocument();
      expect(screen.getByLabelText('이메일')).toBeInTheDocument();
      expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '로그인' })
      ).toBeInTheDocument();
    });

    it('입력 필드가 올바르게 렌더링되어야 한다', () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', '이메일을 입력하세요');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute(
        'placeholder',
        '비밀번호를 입력하세요'
      );
    });
  });

  describe('폼 검증', () => {
    it('이메일이 비어있을 때 에러 메시지가 표시되어야 한다', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');

      // 포커스 후 블러
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText('ID를 입력해주세요.')).toBeInTheDocument();
      });
    });

    it('잘못된 이메일 형식일 때 에러 메시지가 표시되어야 한다', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(
          screen.getByText('ID는 이메일 형식으로 입력해주세요.')
        ).toBeInTheDocument();
      });
    });

    it('비밀번호가 비어있을 때 에러 메시지가 표시되어야 한다', async () => {
      render(<LoginPage />);

      const passwordInput = screen.getByLabelText('비밀번호');

      fireEvent.focus(passwordInput);
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText('PW를 입력해주세요.')).toBeInTheDocument();
      });
    });

    it('비밀번호가 8자 미만일 때 에러 메시지가 표시되어야 한다', async () => {
      render(<LoginPage />);

      const passwordInput = screen.getByLabelText('비밀번호');

      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(
          screen.getByText('PW는 최소 8글자 이상이어야 합니다.')
        ).toBeInTheDocument();
      });
    });

    it('올바른 이메일과 비밀번호일 때 에러 메시지가 없어야 한다', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');

      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(
          screen.queryByText('ID를 입력해주세요.')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('PW를 입력해주세요.')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('사용자 인터랙션', () => {
    it('입력 필드에 값을 입력할 수 있어야 한다', () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');

      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      expect(emailInput).toHaveValue('test@kakao.com');
      expect(passwordInput).toHaveValue('password123');
    });

    it('폼이 유효하지 않을 때 로그인 버튼이 비활성화되어야 한다', () => {
      render(<LoginPage />);

      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeDisabled();
    });

    it('폼이 유효할 때 로그인 버튼이 활성화되어야 한다', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
      });
    });
  });

  describe('API 통합', () => {
    it('올바른 정보로 로그인 시도 시 성공해야 한다', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      // 유효한 정보 입력
      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
      });

      // 로그인 버튼 클릭
      fireEvent.click(loginButton);

      // 로딩 상태 확인
      await waitFor(() => {
        expect(screen.getByText('로그인 중...')).toBeInTheDocument();
      });
    });

    it('잘못된 정보로 로그인 시도 시 실패해야 한다', async () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      // 잘못된 정보 입력 (비밀번호가 8자 미만)
      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.blur(passwordInput);

      // 로그인 버튼이 비활성화되어야 함
      expect(loginButton).toBeDisabled();
    });
  });

  describe('에러 처리', () => {
    it('API 에러 시 토스트 메시지가 표시되어야 한다', async () => {
      // MSW 핸들러를 임시로 실패하도록 설정
      const { server } = await import('@/mocks/server');
      server.use(
        http.post('http://localhost:3000/api/login', () => {
          return Response.json(
            {
              data: {
                status: 'BAD_REQUEST',
                statusCode: 400,
                message: '로그인에 실패했습니다.',
              },
            },
            { status: 400 }
          );
        })
      );

      render(<LoginPage />);

      const emailInput = screen.getByLabelText('이메일');
      const passwordInput = screen.getByLabelText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
      });

      fireEvent.click(loginButton);

      // 토스트 에러 메시지 확인
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('로그인에 실패했습니다.');
      });
    });
  });
});

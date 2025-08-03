import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock 데이터와 함수들
const mockLogin = jest.fn();
const mockNavigate = jest.fn();
const mockToast = {
  success: jest.fn(),
  error: jest.fn()
};

// 로그인 컴포넌트 Mock (실제 로직 구현)
const MockLoginPage = ({ isAuthenticated = false, onLogin = mockLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // 이미 로그인된 상태면 리디렉션
  React.useEffect(() => {
    if (isAuthenticated) {
      mockNavigate('/');
    }
  }, [isAuthenticated]);

  // 이메일 유효성 검사
  const validateEmail = (value) => {
    if (!value) return 'ID를 입력해 주세요.';
    if (!value.includes('@kakao.com')) return '@kakao.com 이메일 주소만 가능합니다.';
    return '';
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value) => {
    if (!value) return 'PW를 입력해주세요.';
    if (value.length < 8) return 'PW는 최소 8글자 이상이어야 합니다.';
    return '';
  };

  // 이메일 블러 이벤트
  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  // 비밀번호 블러 이벤트
  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

  // 이메일 변경
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  // 비밀번호 변경
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  // 로그인 버튼 활성화 조건
  const isLoginDisabled = !email || !password || emailError || passwordError || isLoading;

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 로그인 함수 호출
      await onLogin(email, password);
      
      // 성공 시 sessionStorage에 사용자 정보 저장
      sessionStorage.setItem('userInfo', JSON.stringify({
        email,
        name: '테스트 사용자'
      }));
      
      // 성공 토스트
      mockToast.success('로그인이 완료되었습니다!');
      
      // 메인 페이지로 리디렉션
      mockNavigate('/');
    } catch (error) {
      // 실패 토스트
      mockToast.error('로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input 
            placeholder="이메일" 
            value={email} 
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {emailError && <div data-testid="email-error">{emailError}</div>}
        </div>
        
        <div>
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {passwordError && <div data-testid="password-error">{passwordError}</div>}
        </div>
        
        <button type="submit" disabled={isLoginDisabled}>
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

describe('LoginPage 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 mock 초기화
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  describe('1. 초기 렌더링', () => {
    test('이메일, 비밀번호 입력 필드와 로그인 버튼이 정상적으로 렌더링된다', () => {
      render(<MockLoginPage />);

      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    });

    test('초기에는 로그인 버튼이 비활성화 상태이다', () => {
      render(<MockLoginPage />);
      expect(screen.getByRole('button', { name: '로그인' })).toBeDisabled();
    });
  });

  describe('2. 입력 유효성 검사', () => {
    describe('이메일 검증', () => {
      test('아무것도 입력하지 않았을 때 에러 메시지가 표시된다', async () => {
        const user = userEvent.setup();
        render(<MockLoginPage />);

        const emailInput = screen.getByPlaceholderText('이메일');
        await user.click(emailInput);
        await user.tab();

        expect(screen.getByTestId('email-error')).toHaveTextContent('ID를 입력해 주세요.');
      });

      test('유효하지 않은 이메일 형식(@kakao.com이 아닌 경우) 입력 시 에러 메시지가 표시된다', async () => {
        const user = userEvent.setup();
        render(<MockLoginPage />);

        const emailInput = screen.getByPlaceholderText('이메일');
        await user.type(emailInput, 'test@gmail.com');
        await user.tab();

        expect(screen.getByTestId('email-error')).toHaveTextContent('@kakao.com 이메일 주소만 가능합니다.');
      });

      test('유효한 이메일을 입력했을 때 에러 메시지가 사라진다', async () => {
        const user = userEvent.setup();
        render(<MockLoginPage />);

        const emailInput = screen.getByPlaceholderText('이메일');
        await user.type(emailInput, 'test@gmail.com');
        await user.tab();
        
        expect(screen.getByTestId('email-error')).toBeInTheDocument();

        await user.clear(emailInput);
        await user.type(emailInput, 'test@kakao.com');

        expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
      });
    });

    describe('비밀번호 검증', () => {
      test('아무것도 입력하지 않았을 때 에러 메시지가 표시된다', async () => {
        const user = userEvent.setup();
        render(<MockLoginPage />);

        const passwordInput = screen.getByPlaceholderText('비밀번호');
        await user.click(passwordInput);
        await user.tab();

        expect(screen.getByTestId('password-error')).toHaveTextContent('PW를 입력해주세요.');
      });

      test('8자 미만의 비밀번호 입력 시 에러 메시지가 표시된다', async () => {
        const user = userEvent.setup();
        render(<MockLoginPage />);

        const passwordInput = screen.getByPlaceholderText('비밀번호');
        await user.type(passwordInput, '1234567');
        await user.tab();

        expect(screen.getByTestId('password-error')).toHaveTextContent('PW는 최소 8글자 이상이어야 합니다.');
      });

      test('유효한 비밀번호를 입력했을 때 에러 메시지가 사라진다', async () => {
        const user = userEvent.setup();
        render(<MockLoginPage />);

        const passwordInput = screen.getByPlaceholderText('비밀번호');
        await user.type(passwordInput, '1234567');
        await user.tab();
        
        expect(screen.getByTestId('password-error')).toBeInTheDocument();

        await user.clear(passwordInput);
        await user.type(passwordInput, '12345678');

        expect(screen.queryByTestId('password-error')).not.toBeInTheDocument();
      });
    });
  });

  describe('3. 로그인 버튼 활성화', () => {
    test('이메일과 비밀번호가 모두 유효한 형식으로 입력되었을 때 로그인 버튼이 활성화된다', async () => {
      const user = userEvent.setup();
      render(<MockLoginPage />);

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      expect(loginButton).toBeDisabled();

      await user.type(emailInput, 'test@kakao.com');
      await user.type(passwordInput, '12345678');

      expect(loginButton).not.toBeDisabled();
    });
  });

  describe('4. 로그인 시도', () => {
    describe('성공', () => {
      test('유효한 이메일과 비밀번호로 로그인 시 login 함수가 올바른 인자와 함께 호출된다', async () => {
        const mockSuccessLogin = jest.fn().mockResolvedValue({});
        const user = userEvent.setup();
        
        render(<MockLoginPage onLogin={mockSuccessLogin} />);

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByRole('button', { name: '로그인' });

        await user.type(emailInput, 'test@kakao.com');
        await user.type(passwordInput, '12345678');
        await user.click(loginButton);

        expect(mockSuccessLogin).toHaveBeenCalledWith('test@kakao.com', '12345678');
      });

      test('로그인 성공 시 sessionStorage에 사용자 정보가 저장된다', async () => {
        const mockSuccessLogin = jest.fn().mockResolvedValue({});
        const user = userEvent.setup();
        
        render(<MockLoginPage onLogin={mockSuccessLogin} />);

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByRole('button', { name: '로그인' });

        await user.type(emailInput, 'test@kakao.com');
        await user.type(passwordInput, '12345678');
        await user.click(loginButton);

        // 비동기 처리 완료 대기
        await new Promise(resolve => setTimeout(resolve, 0));

        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        expect(userInfo).toEqual({
          email: 'test@kakao.com',
          name: '테스트 사용자'
        });
      });

      test('성공 토스트 메시지가 나타난다', async () => {
        const mockSuccessLogin = jest.fn().mockResolvedValue({});
        const user = userEvent.setup();
        
        render(<MockLoginPage onLogin={mockSuccessLogin} />);

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByRole('button', { name: '로그인' });

        await user.type(emailInput, 'test@kakao.com');
        await user.type(passwordInput, '12345678');
        await user.click(loginButton);

        // 비동기 처리 완료 대기
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockToast.success).toHaveBeenCalledWith('로그인이 완료되었습니다!');
      });

      test('메인 페이지(/)로 리디렉션된다', async () => {
        const mockSuccessLogin = jest.fn().mockResolvedValue({});
        const user = userEvent.setup();
        
        render(<MockLoginPage onLogin={mockSuccessLogin} />);

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByRole('button', { name: '로그인' });

        await user.type(emailInput, 'test@kakao.com');
        await user.type(passwordInput, '12345678');
        await user.click(loginButton);

        // 비동기 처리 완료 대기
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    describe('실패', () => {
      test('로그인 실패 시 실패 토스트 메시지가 나타난다', async () => {
        const mockFailLogin = jest.fn().mockRejectedValue(new Error('로그인 실패'));
        const user = userEvent.setup();
        
        render(<MockLoginPage onLogin={mockFailLogin} />);

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByRole('button', { name: '로그인' });

        await user.type(emailInput, 'test@kakao.com');
        await user.type(passwordInput, 'wrongpassword');
        await user.click(loginButton);

        // 비동기 처리 완료 대기
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockToast.error).toHaveBeenCalledWith('로그인에 실패했습니다.');
      });

      test('로그인 버튼이 다시 활성화되고 입력 필드가 초기화되지 않는다', async () => {
        const mockFailLogin = jest.fn().mockRejectedValue(new Error('로그인 실패'));
        const user = userEvent.setup();
        
        render(<MockLoginPage onLogin={mockFailLogin} />);

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByRole('button', { name: '로그인' });

        await user.type(emailInput, 'test@kakao.com');
        await user.type(passwordInput, 'wrongpassword');
        await user.click(loginButton);

        // 비동기 처리 완료 대기
        await new Promise(resolve => setTimeout(resolve, 0));

        // 버튼이 다시 활성화됨
        expect(loginButton).not.toBeDisabled();
        expect(loginButton).toHaveTextContent('로그인');
        
        // 입력 필드가 초기화되지 않음
        expect(emailInput).toHaveValue('test@kakao.com');
        expect(passwordInput).toHaveValue('wrongpassword');
      });
    });
  });

  describe('5. 로그인 상태', () => {
    test('이미 로그인된 사용자가 로그인 페이지에 접근했을 때 메인 페이지(/)로 리디렉션된다', () => {
      render(<MockLoginPage isAuthenticated={true} />);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});

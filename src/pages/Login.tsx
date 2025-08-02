import Navbar from './../components/navbar/Navbar';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { emailValidator, passwordValidator } from '@/utils/validators';
import { useAuth } from '@/contexts/AuthContext';
import { PaddingMd, PaddingSm } from '@/components/common/Padding';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import FormField from '@/components/formField/formField';
import { FetchLogin } from '@/services/authApi';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: calc(-2.75rem + 100vh);
`;
const Loginform = styled.section`
  width: 100%;
  max-width: 26.25rem;
  padding: 16px;
`;
const Logo = styled.img`
  width: 5.5rem;
`;
const InputWrapper = styled.div`
  width: 100%;
`;

const Input = styled.input<{ hasError: boolean }>`
  outline: none;

  width: 100%;
  color: ${({ theme }) => theme.colors.text.default};
  border-width: 0px 0px 1px;
  padding: 8px 0px;
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.red.red700 : theme.colors.gray.gray400};
  ${({ theme }) => theme.typography.body1Regular}
  &:focus {
    border-color: ${({ theme }) => theme.colors.gray.gray900};
  }
  &:blur {
    border-color: ${({ theme }) => theme.colors.red.red700};
  }
`;

const LoginBtn = styled.button<{ activated: boolean }>`
  background-color: ${({ theme }) => theme.colors.yellow.yellow600};
  ${({ theme }) => theme.typography.body2Regular}
  width: 100%;
  height: 2.75rem;
  opacity: ${({ activated }) => (activated ? 1 : 0.5)};
  cursor: ${({ activated }) => (activated ? 'pointer' : 'not-allowed')};
`;

const ValidationMsg = styled.p`
  color: ${({ theme }) => theme.colors.red.red700};
  ${({ theme }) => theme.typography.label2Regular}
`;

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const isActivatedBtn = isValid;
  const loginMutation = useMutation({
    mutationFn: FetchLogin,
    onSuccess: (loginData) => {
      const { authToken, email: useremail, name } = loginData.data;
      const userInfo = {
        token: authToken,
        email: useremail,
        name,
        isLoggedIn: true,
      };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      toast.success('로그인이 완료되었습니다.');
      navigate('/');
    },
    onError: (e: any) => {
      const msg = e.response?.data?.message || '알 수 없는 오류입니다';
      toast.error(msg);
    },
  });

  const handleLoginClick = handleSubmit((data) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  });
  return (
    <div>
      <Navbar />
      <LoginWrapper>
        <Logo src="src/assets/images/카카오로고.svg" alt="" />
        <Loginform>
          <PaddingSm />
          <InputWrapper>
            <FormField
              name="email"
              label="이메일"
              placeholder="이메일을 입력하세요"
              register={register}
              error={errors.email?.message}
              validator={emailValidator}
            />
            <FormField
              name="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              register={register}
              error={errors.password?.message}
              validator={passwordValidator}
            />
          </InputWrapper>
          <PaddingMd />
          <LoginBtn
            activated={isActivatedBtn}
            disabled={!isActivatedBtn}
            onClick={handleLoginClick}
          >
            로그인
          </LoginBtn>
        </Loginform>
      </LoginWrapper>
    </div>
  );
};

export default Login;

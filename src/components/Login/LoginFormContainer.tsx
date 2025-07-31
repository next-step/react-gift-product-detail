import {
  StyeldLoginInput,
  StyledLoginButton,
  StyledLoginComponentDiv,
  StyledLoginKakoLogo,
} from '@src/components/Login/StyledLoginFormContainer';
import { useLoginForm } from './useLoginForm';
import { useLoginQuery } from './useLoginQuery';

const LoginForm = () => {
  const {
    id,
    idError,
    handleIdBlur,
    handleIdChange,
    pw,
    pwError,
    handlePwBlur,
    handlePwChange,
    isLoginButtonEnabled,
  } = useLoginForm();
  const loginMutation = useLoginQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = id;
    const password = pw;

    loginMutation.mutate({ email, password });
  };

  return (
    <StyledLoginComponentDiv>
      <StyledLoginKakoLogo>kakao</StyledLoginKakoLogo>
      <StyeldLoginInput
        type='text'
        value={id}
        onChange={handleIdChange}
        onBlur={handleIdBlur}
        id='loginid'
        isError={idError}
        placeholder='이메일'
      />
      {idError && <p>{idError}</p>}
      <StyeldLoginInput
        type='password'
        value={pw}
        onChange={handlePwChange}
        onBlur={handlePwBlur}
        id='passwd'
        isError={pwError}
        placeholder='비밀번호'
      />
      {pwError && <p>{pwError}</p>}
      <StyledLoginButton onClick={handleSubmit} disabled={!isLoginButtonEnabled}>
        로그인
      </StyledLoginButton>
    </StyledLoginComponentDiv>
  );
};

export default LoginForm;

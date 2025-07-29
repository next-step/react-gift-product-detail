import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import logo from '@/resources/images/kakao_logo.svg';
import { LoginForm } from '@/pages/Login/components/LoginFormSection'; // ← 절대 경로로 변경
const LoginPage = () => {
    return (_jsxs(Wrapper, { children: [_jsx(Logo, { src: logo, alt: "\uCE74\uCE74\uC624 \uACF5\uC2DD \uB85C\uACE0" }), _jsx(LoginForm, {})] }));
};
export default LoginPage;
const Wrapper = styled.main `
  width: 100%;
  height: calc(100vh - 2.75rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img(({ theme }) => ({
    width: '5.5rem',
    // img 태그엔 color가 적용되지 않으니, 필요하다면 filter나 background-color 등을 사용하세요.
}));

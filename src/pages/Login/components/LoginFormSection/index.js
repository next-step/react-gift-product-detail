import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { UnderlineInputField } from '@/components/Form/InputField/UnderlineInputField';
export const LoginFormSection = ({ email, password, onChangeEmail, onChangePassword, onSubmit, emailError, passwordError, loginError, isFormValid, }) => (_jsxs(Wrapper, { children: [_jsx(UnderlineInputField, { placeholder: "\uC774\uBA54\uC77C", value: email, onChange: onChangeEmail }), emailError && _jsx(ErrorMessage, { children: emailError }), _jsx(HorizontalSpacing, { size: "spacing4" }), _jsx(UnderlineInputField, { placeholder: "\uBE44\uBC00\uBC88\uD638", type: "password", value: password, onChange: onChangePassword }), passwordError && _jsx(ErrorMessage, { children: passwordError }), loginError && _jsx(GlobalError, { children: loginError }), _jsx(HorizontalSpacing, { size: "spacing12" }), _jsx(Button, { disabled: !isFormValid, onClick: onSubmit, children: "\uB85C\uADF8\uC778" })] }));
const Wrapper = styled.section(({ theme }) => ({
    width: '100%',
    maxWidth: '26.25rem',
    padding: theme.spacing.spacing4,
}));
const ErrorMessage = styled.div(({ theme }) => ({
    color: theme.colors.semantic.critical.default,
    ...theme.typography.label2Regular,
    marginTop: theme.spacing.spacing1,
}));
const GlobalError = styled.div(({ theme }) => ({
    color: theme.colors.semantic.critical.default,
    ...theme.typography.body2Regular,
    marginTop: theme.spacing.spacing2,
}));
const Button = styled.button(({ theme }) => ({
    width: '100%',
    height: '2.75rem',
    ...theme.typography.body2Regular,
    color: theme.colors.scale.gray900,
    backgroundColor: theme.colors.semantic.brand.kakaoYellow,
    borderRadius: theme.spacing.spacing1,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 200ms',
    '&:hover': {
        backgroundColor: theme.colors.semantic.brand.kakaoYellowHover,
    },
    '&:active': {
        backgroundColor: theme.colors.semantic.brand.kakaoYellowActive,
    },
    '&:disabled': {
        backgroundColor: theme.colors.scale.gray300,
        cursor: 'not-allowed',
    },
}));
export { default as LoginForm } from './LoginForm';

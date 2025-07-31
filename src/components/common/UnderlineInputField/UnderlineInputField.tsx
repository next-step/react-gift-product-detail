import styled from '@emotion/styled';
import type { HTMLInputTypeAttribute } from 'react';
import ErrorText from '../ErrorText';

interface UnderlineInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  message?: string;
  type?: HTMLInputTypeAttribute;
}

export const UnderlineInputField = ({
  error = false,
  message,
  ...props
}: UnderlineInputFieldProps) => {
  return (
    <Container>
      <Input {...props} error={error} />
      {message && <ErrorText>{message}</ErrorText>}
    </Container>
  );
};

const Container = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: '320px',
  marginBottom: theme.spacing.spacing2,
}));

const Input = styled.input<{ error: boolean }>(({ theme, error }) => ({
  width: '100%',
  padding: `${theme.spacing.spacing3} 0`,
  border: 'none',
  borderBottom: `1px solid ${
    error ? theme.colors.semantic.critical : theme.colors.semantic.borderDefault
  }`,
  fontSize: theme.typography.body1Regular.fontSize,
  fontWeight: theme.typography.body1Regular.fontWeight,
  color: theme.colors.semantic.textDefault,
  backgroundColor: 'transparent',
  outline: 'none',

  '::placeholder': {
    color: theme.colors.semantic.textPlaceholder,
  },
}));

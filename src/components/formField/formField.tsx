// src/components/FormField/FormField.tsx
import styled from '@emotion/styled';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
  validator?: (value: string) => true | string; 
  register: UseFormRegister<FieldValues>;
};

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
`;

const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ hasError, theme }) => hasError ? theme.colors.red.red500 : '#ccc'};
  border-radius: 4px;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.red.red500};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export default function FormField({ label, name, type = 'text', error, register, placeholder, validator }: Props) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validator ? { validate: validator } : {})}
        hasError={!!error}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}
